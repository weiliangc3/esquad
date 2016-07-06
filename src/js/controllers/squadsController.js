angular
.module('eSquad')
.controller('SquadsController', SquadsController);

SquadsController.$inject = ['User', 'Squad', '$state', '$stateParams', '$scope', 'Upload', 'API', 'AWS_URL'];
function SquadsController(User, Squad, $state, $stateParams, $scope, Upload, API, AWS_URL){
  var self = this;

  self.createSquad        = createSquad;
  self.deleteSquad        = deleteSquad;
  self.applyToSquad       = applyToSquad;
  self.retractApplication = retractApplication;
  self.acceptApplication  = acceptApplication;
  self.toggleAvailability = toggleAvailability;

  // self.currentUserId      = $scope.$parent.Users.currentUser._id;
  // self.currentUser        = $scope.$parent.Users.currentUser;

  self.squads        = [];
  self.squad         = null;

  // Populate squad list
  getSquads();
  function getSquads(){
    Squad.query(function(data){
      self.squads = data;
    });
  }

  // get Squad to show
  if ($stateParams.squadId){
    getSquad();
  }
  function getSquad(){
    Squad.get({ id: $stateParams.squadId }, function(res){
      self.squad = res.squad;
      self.isLeader   = false;
      self.isMember   = false;
      self.isInvited  = false;
      self.isApplied  = false;
      // Check user's relationship to squad
      for (i=0; i < self.squad.appliedMembers.length; i++){
        if (self.squad.appliedMembers[i]._id === $scope.$parent.Users.currentUser._id) {
          self.isApplied      = true;
        }
      }
      for (i=0; i < self.squad.invitedMembers.length; i++){
        if (self.squad.invitedMembers[i]._id === $scope.$parent.Users.currentUser._id) {
          self.isInvited      = true;
        }
      }
      for (i=0; i < self.squad.members.length; i++){
        if (self.squad.members[i]._id === $scope.$parent.Users.currentUser._id) {
          self.isMember      = true;
        }
      }
      for (i=0; i < self.squad.leaders.length; i++){
        if (self.squad.leaders[i]._id === $scope.$parent.Users.currentUser._id) {
          self.isLeader      = true;
          self.isMember      = true;
        }
      }
    });
  }

  // Functions
  function createSquad(){
    self.squad.specialties  = [];
    if (!!self.newSquad){
      if (!!self.newSquad.specialty1) self.squad.specialties.push(self.newSquad.specialty1);
      if (!!self.newSquad.specialty2) self.squad.specialties.push(self.newSquad.specialty2);
      if (!!self.newSquad.specialty3) self.squad.specialties.push(self.newSquad.specialty3);
    }
    self.squad.leaders      = [];
    self.squad.leaders.push($scope.$parent.Users.currentUser);
    self.squad.members      = [];
    self.squad.members.push($scope.$parent.Users.currentUser);
    var currentUserId = $scope.$parent.Users.currentUser._id;
    Squad.save({ squad: self.squad }, function(data){
      console.log(data);
      User.addSquad({
        id: currentUserId,
        squad: data.squad
      },function(user){
        $state.go("dashboard");
      });
    });
  }
  function deleteSquad(id){
    Squad.delete({id: id}, function(){
      $state.go("dashboard");
    });
  }

  // Application Functions
  function applyToSquad(){
    self.squad.appliedMembers.push($scope.$parent.Users.currentUser);
    Squad.update( {id: self.squad._id}, self.squad, function(data){
      self.isApplied = true;
      $scope.$parent.Users.currentUser.squadsApplied.push(self.squad);
      User.update({id: $scope.$parent.Users.currentUser._id}, $scope.$parent.Users.currentUser, function(data){});
    });
  }
  function retractApplication(){
    var userPos = self.squad.appliedMembers.map(function(x){return x._id;}).indexOf($scope.$parent.Users.currentUser._id);
    self.squad.appliedMembers.splice(userPos, 1);
    Squad.update( {id: self.squad._id}, self.squad, function(data){
      self.isApplied = false;
      var squadPos = $scope.$parent.Users.currentUser.squadsApplied.map(function(x){return x._id;}).indexOf(self.squad._id);
      $scope.$parent.Users.currentUser.squadsApplied.splice(squadPos, 1);
      User.update({id: $scope.$parent.Users.currentUser._id}, $scope.$parent.Users.currentUser, function(data){});
    });
  }
  function acceptApplication(user){
    if (self.isLeader){
      self.squad.members.push(user);
      var userPos = self.squad.appliedMembers.map(function(x){return x._id;}).indexOf(user._id);
      self.squad.appliedMembers.splice(userPos, 1);
      Squad.update( {id: self.squad._id}, self.squad, function(data){
        var selectedUser = user;
        selectedUser.squads.push(self.squad);
        var squadPos = selectedUser.squadsApplied.map(function(x){return x._id;}).indexOf(selectedUser.id);
        selectedUser.squadsApplied.splice(squadPos, 1);
        User.update({id: user._id}, selectedUser, function(data){});
      });
    } else {
      console.log("Unauthorised application acceptance");
    }
  }

  function toggleAvailability(){
    if (this.squad.available !== true){
      this.squad.available = true;
    } else {
      this.squad.available = false;
    }
    Squad.update( {id: self.squad._id}, self.squad, function(data){
    });
  }

  // Tester function
  self.testFunction = function(){
    console.log("Squad Test:");
    console.log(this);
  };

}
