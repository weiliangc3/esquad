angular
.module('eSquad')
.controller('SquadsController', SquadsController);

SquadsController.$inject = ['User', 'Squad', '$state', '$stateParams', '$scope', 'Upload', 'API', 'AWS_URL'];
function SquadsController(User, Squad, $state, $stateParams, $scope, Upload, API, AWS_URL){
  var self = this;

  self.createSquad   = createSquad;
  self.deleteSquad   = deleteSquad;

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
    });
  }

  // Functions
  function createSquad(){
    self.squad.specialties  = [];
    if (!!self.newSquad.specialty1) self.squad.specialties.push(self.newSquad.specialty1);
    if (!!self.newSquad.specialty2) self.squad.specialties.push(self.newSquad.specialty2);
    if (!!self.newSquad.specialty3) self.squad.specialties.push(self.newSquad.specialty3);
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


  // Tester function
  self.testFunction = function(){
    console.log("Squad Test:");
    console.log(this.squad);
  };

}
