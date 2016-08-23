angular
  .module('users')
  .controller('UserController',['userService','$mdBottomSheet', UserController]);

function UserController(userService, $mdBottomSheet){
  var self=this;

    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.makeContact         = makeContact;
    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
          });


    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    function makeContact (selectedUser) {
      console.log('share clicked!');
      $mdBottomSheet.show({
          controller    : ContactSheetController,
          controllerAs  : "vm",
          templateUrl   : 'users/contactSheet.html',
          parent        : angular.element(document.querySelector('#content'))
      
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController() {
          this.user = selectedUser;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'svg/hangouts.svg'}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide();
            };
        }
    }

}