angular.module('app.controllers', [])

.controller('menuCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $ionicAuth, $state) {

    if ($ionicAuth.isAuthenticated()){
           $scope.userData = $ionicUser.details;
    };
    //onsole.log("hello");
    //$scope.$on('user:updated', function(event,data) {
  //    console.log('Listenin g for update user!')
  //    if ($ionicAuth.isAuthenticated()){
  //         $scope.userData = $ionicUser.details;
  //    }
  //  });

  //  $scope.refreshLogin = function(){
  //    console.log("HI there");
//      if ($ionicAuth.isAuthenticated()){
//           $scope.userData = $ionicUser.details;
//      }
//    }

    $scope.logout = function(){
        $ionicAuth.logout();
        $state.go('signin');
    }

}])

.controller('signinCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth',
              '$state', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $ionicAuth, $state, $rootScope) {

    $scope.data = {
        'email': '',
        'password': ''
    }

    $scope.error = '';

    if ($ionicAuth.isAuthenticated()) {
        // Make sure the user data is going to be loaded
        $ionicUser.load().then(function() {});
        $rootScope.$broadcast('user:updated','userInfo');
        //$ionicSideMenuDelegate.toggleLeft();
        $state.go('tabsController.latestNews');
    }

    $scope.login = function(){
        $scope.error = '';
        $ionicAuth.login('basic', $scope.data).then(function(){
            $ionicUser.load().then(function() {});
            $state.go('tabsController.latestNews');
        }, function(){
            $scope.error = 'Error logging in.';
        })
    }

    $scope.resetPassword = function(){
        window.open($ionicAuth.passwordResetUrl, '_blank');
    }

    $scope.register = function(){
        $state.go('register');
    }

}])

.controller('directoryCtrl', ['$scope', '$stateParams', 'Directory', '$ionicPopup', '$ionicLoading', '$ionicAuth', '$state',
function ($scope, $stateParams, Directory, $ionicPopup, $ionicLoading, $ionicAuth, $state) {

  if ($ionicAuth.isAuthenticated()){

       $scope.directory = [];
       $scope.params = $stateParams;
        $scope.data = {
          search: ''
       }

       $scope.show = function() {
        $ionicLoading.show({
          template: '<p>Loading...</p><ion-spinner></ion-spinner>'
         });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };

        $scope.fields = {
                name: ''
        }

        $scope.search = function(){

        var s = $scope.data.search.toLowerCase();
        console.log(s);
        $scope.narrowed_directory = $scope.directory;

        if (s === ''){
              $scope.narrowed_directory = $scope.loadData();

              return;
          }

          $scope.narrowed_directory = $scope.directory.filter(function(tutorial){
            if (tutorial.Name.toLowerCase().indexOf(s) > -1){
                return true;
            }
            return false;
          });
          console.log($scope.narrowed_directory);
          $scope.directory = $scope.narrowed_directory;
        };

       $scope.loadData = function(){
           $scope.show($ionicLoading);
           if ($scope.params.name){
               Console.log("Param: " + $scope.params.name);
                Directory.query($scope.params).then(function(res){
                    $scope.directory = res;
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.hide($ionicLoading);
                }).finally(function($ionicLoading) {
                 $scope.hide($ionicLoading);
                });
            }else{
               Directory.all().then(function(res){
                   $scope.show($ionicLoading);
                   $scope.directory = res;
                   $scope.$broadcast('scroll.refreshComplete');
               }).finally(function($ionicLoading) {
                 $scope.hide($ionicLoading);
                });
            }
       }

       $scope.loadData();
  }
  else{
       $state.go('signin');
  }
}])

.controller('registerCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicAuth, $ionicUser, $state) {

    $scope.data = {
        'name': '',
        'email': '',
        'password': ''
    }

    $scope.error='';
    $scope.inputs = [
        { value: null }
    ];

    $scope.addInput = function () {
        $scope.inputs.push({ value: null });
    }

    $scope.removeInput = function (index) {
        $scope.inputs.splice(index, 1);
    }

    $scope.news = function (){
        $state.go('tabsController.latestNews');
    }
    $scope.signup = function(){

        $scope.error = '';

        $ionicAuth.signup($scope.data).then(function() {
            // `$ionicUser` is now registered
            $ionicAuth.login('basic', $scope.data).then(function(){
              $state.go('tabsController.latestNews');
            });
        }, function(err) {

            var error_lookup = {
                'required_email': 'Missing email field',
                'required_password': 'Missing password field',
                'conflict_email': 'A user has already signed up with that email',
                'conflict_username': 'A user has already signed up with that username',
                'invalid_email': 'The email did not pass validation'
            }

            $scope.error = error_lookup[err.details[0]];
        });
    }

}])

.controller('preferencesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('newsCtrl', ['$scope', '$stateParams', '$cordovaOauth', '$cordovaOauthUtility', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaOauth, $cordovaOauthUtility) {


}])

.controller('parentGuardianCtrl', ['$scope', '$stateParams', 'RegistrationService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, RegistrationService, $state) {
    $scope.user = []

    $scope.registerParents = function(){
            $scope.submitting = true;
            console.log("Email:" + $scope.user.Email);
            var params = {
                'Email': $scope.user.Email,
                'Name': $scope.user.Name,
                'Phone': $scope.user.Phone,
                'Dues': $scope.user.Dues,

            }

            RegistrationService.addParents(params).then(function(res){
                console.log(res);
                $state.go('studentInformation', {'email': $scope.user.Email});
            })

            $scope.submitting = false;
            //console.log("Attempting to reload page");
            //$scope.loadData();
        }
}])

.controller('studentInformationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

    var email = $stateParams.email;

    $scope.registerStudents= function(){
            $scope.submitting = true;
            console.log("Email:" + $scope.user.Email);
            var params = {
                'Student1': '',
                'Student1GradYear':'',
                'Student2': '',
                'Student2GradYear':'',
                'Student3': '',
                'Student3GradYear': ''
            }

            RegistrationService.addStudents(params).then(function(res){
                console.log(res);
                $state.go('studentInformation', {'email': $scope.user.Email});
            })

            $scope.submitting = false;
            //console.log("Attempting to reload page");
            //$scope.loadData();
        }
}])

.controller('committeesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('teachersCtrl', ['$scope', '$stateParams', '$ionicAuth',
              '$ionicUser', 'TeacherService', '$state', '$ionicPopup',
              '$ionicLoading',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicAuth, $ionicUser, TeacherService, $state,
            $ionicPopup, $ionicLoading) {
    $scope.userData = $ionicUser.details;
    console.log("User: " + $scope.userData.name);
    $scope.data ={
        'id': 0,
        'Teacher': '',
        'Needs': ''
    }
    $scope.show = function() {
            $ionicLoading.show({
              template: '<p>Loading...</p><ion-spinner></ion-spinner>'
             });
     };
    $scope.hide = function(){
            $ionicLoading.hide();
    };

    $scope.submitNeed = function(){
        $scope.show($ionicLoading);
        var params = {
            'Teacher': $scope.userData.name,
            'Needs':$scope.data.message
        }
        TeacherService.add(params).then(function(res){
                console.log(res);
                $scope.hide($ionicLoading);
                $ionicPopup.alert({
                    title: 'Thanks for letting us know!',
                    template: 'Your request has been sent to OE Wolf Parents.'
                });
                //$state.go('tabsController.latestNews');
                $scope.data = {
                  message:''
                };

        })
    }

}])

.controller('shopCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

    //if (!$ionicAuth.isAuthenticated()){
     //   $state.go('signin');
//    }

}])

.controller('resetPasswordCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('latestNewsCtrl', ['$scope', '$stateParams', '$ionicLoading', '$ionicAuth', '$ionicSideMenuDelegate',
              '$window', '$state',
function ($scope, $stateParams, $ionicLoading, $ionicAuth, $ionicSideMenuDelegate,
  $window, $state) {

  $scope.$on("$ionicView.beforeEnter", function() {
    if ($ionicAuth.isAuthenticated()){
      console.log('User is authed');

      var twttr = (function(d, s, id) {
                console.log("In Twitter JS");
                var js, fjs = d.getElementsByTagName(s)[0],
                  t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
                t._e = [];
                t.ready = function(f) {
                  t._e.push(f);
                };
                console.log(t);
                return t;
              }(document, "script", "twitter-wjs"));
  }
  else{
      $state.go('signin')
  }
});

}])

.controller('teacherNotesCtrl', ['$scope', '$stateParams',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  $scope.updatePreference = function(){
    console.log("Hello Do not Show Checkbox");
        console.log($scope.doNotShow.checked);
  }
    //if (!$ionicAuth.isAuthenticated()){
    //    $state.go('signin');
//    }
}])
