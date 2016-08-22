angular
  .module('users')
  .controller('UserController',['userService',UserController]);

function UserController(userService){
  var self=this;

    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;

    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
          });


    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

}