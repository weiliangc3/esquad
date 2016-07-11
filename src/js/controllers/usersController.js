angular
.module('eSquad')
.controller('UsersController', UsersController);

UsersController.$inject = ['User','Squad','CurrentUser', '$state', '$stateParams', '$scope'];
function UsersController(User, Squad, CurrentUser, $state, $stateParams, $scope){

  var self = this;

  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
  self.error         = null;
  self.userType      = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  self.acceptInvite  = acceptInvite;

  self.showCarousal  = false;
  self.userCanBeInvited = [];
  self.invite           = invite;

  if (checkLoggedIn()) {
    self.getUsers();
  }

  if ($stateParams.userId){
    populateInvites();
  }

  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null ;
    if (token){
      self.currentUser = CurrentUser.getUser();
      self.getUsers();
      if (self.currentUser.userType === "squaddie"){
        $state.go("dashboard");
      } else{
        $state.go("home");
      }
    }
  }

  function handleError(e) {
    self.error = "Something went wrong.";
  }

  function register(userType) {
    self.user.userType = userType;
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
    self.all         = null;
    self.currentUser = null;
    self.user        = null;
    CurrentUser.clearUser();
    $state.go("home");
  }

  function checkLoggedIn() {
    self.currentUser = CurrentUser.getUser();
    return !!self.currentUser;
  }

  // Invite functions
  function invite(user){
    if (!!self.squadToInvite){
      if (user.squadsInvited.indexOf(self.squadToInvite) === -1) return false;

      self.user.squadsInvited.push(self.squadToInvite);
      User.updateSquads({user: self.user}, function(data){
        console.log("user sent", self.user);
          Squad.get({ id: self.squadToInvite }, function(res){
            var squad = res.squad;
            squad.invitedMembers.push(self.user);
            Squad.update({id: self.squadToInvite},squad,function(data){
            });
          });
      });
    }
  }

  function populateInvites(){
    self.userCanBeInvited = [];
    User.get({ id: $stateParams.userId }, function(res){
      self.user = res.user;
      User.get({ id: self.currentUser._id}, function(res){
        var currentUserLeaderOf = [];
        var currentUser = res.user;
        for (i=0;i<currentUser.squads.length;i++){
          for (j=0;j<currentUser.squads[i].leaders.length;j++){
            if (currentUser.squads[i].leaders[j] === currentUser._id){
              currentUserLeaderOf.push(currentUser.squads[i]);
            }
          }
        }
        for (i=0;i<currentUserLeaderOf.length;i++){
          var found = false;
          if (!!self.user.squads){
            for (j=0;j<self.user.squads.length;j++){
              if (self.user.squads[j]._id === currentUserLeaderOf[i]._id){
                found = true;
              }
            }
          }
          if (!!self.user.squadsApplied){
            for (j=0;j<self.user.squadsApplied.length;j++){
              if (self.user.squadsApplied[j]._id === currentUserLeaderOf[i]._id){
                found = true;
              }
            }
          }
          if (!!self.user.squadsInvited){
            for (j=0;j<self.user.squadsInvited.length;j++){
              if (self.user.squadsInvited[j]._id === currentUserLeaderOf[i]._id){
                found = true;
              }
            }
          }
          if (found === false) {
            self.userCanBeInvited.push(currentUserLeaderOf[i]);
          }
        }
      });
    });
  }

  function acceptInvite(squadId){
    Squad.get({id: squadId},function(res){
      var squad = res.squad;
      var inviteIndex =  squad.invitedMembers.map(function(x){return x._id;}).indexOf(self.currentUser._id);
      squad.invitedMembers.splice(inviteIndex, 1);
      var userToApply = jQuery.extend(true,{},self.currentUser);
      squad.members.push(userToApply);
      Squad.update( {id: squadId}, squad, function(data){});
      var squadIndex = self.currentUser.squadsInvited.map(function(x){return x._id;}).indexOf(squadId);
      self.currentUser.squadsInvited.splice(squadIndex, 1);
      var squadToApply = jQuery.extend(true,{},squad);
      self.currentUser.squads.push(squadToApply);
      User.updateSquads({user: self.currentUser}, function(data){
        if ($state.current.name === 'dashboard'){
          self.user = self.currentUser;
        }
      });
    });
  }

  // Tester function
  self.testFunction = function(){
    console.log(" User Test:");
    console.log(this);
  };

  // Dashboard conditionals - shouldn't be in usersController- move to another service eventually
  if ($state.current.name === 'dashboard'){
    self.user = User.get({ id: self.currentUser._id }, function(res){
      self.user = res.user;
    });
  }

  return self;
}
