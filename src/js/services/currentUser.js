angular
  .module('eSquad')
  .service('CurrentUser',CurrentUser);

CurrentUser.$inject = ["TokenService", "User"];
function CurrentUser(TokenService, User){
    var self        = this;
    self.getUser    = getUser;
    self.clearUser  = clearUser;
    self.user       = getUser();

    function getUser(){
      return self.user ? self.user : TokenService.decodeToken();
    }

    function clearUser(){
      TokenService.removeToken();
      self.user = null;
    }
}
