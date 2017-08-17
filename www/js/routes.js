angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'signinCtrl'
  })

  .state('directory', {
    url: '/page9',
    templateUrl: 'templates/directory.html',
    controller: 'directoryCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('preferences', {
    url: '/preferences',
    templateUrl: 'templates/preferences.html',
    controller: 'preferencesCtrl'
  })

  .state('news', {
    url: '/mynews',
    templateUrl: 'templates/news.html',
    controller: 'newsCtrl'
  })

  .state('parentGuardian', {
    url: '/parents',
    templateUrl: 'templates/parentGuardian.html',
    controller: 'parentGuardianCtrl'
  })

  .state('studentInformation', {
    url: '/students',
    templateUrl: 'templates/studentInformation.html',
    controller: 'studentInformationCtrl'
  })

  .state('committees', {
    url: '/committee',
    templateUrl: 'templates/committees.html',
    controller: 'committeesCtrl'
  })

  .state('teachers', {
    url: '/page30',
    templateUrl: 'templates/teachers.html',
    controller: 'teachersCtrl'
  })

  .state('shop', {
    url: '/shop',
    templateUrl: 'templates/shop.html',
    controller: 'shopCtrl'
  })

  .state('resetPassword', {
    url: '/passwordReset',
    templateUrl: 'templates/resetPassword.html',
    controller: 'resetPasswordCtrl'
  })

  .state('tabsController.latestNews', {
    url: '/latestNews',
    views: {
      'tab2': {
        templateUrl: 'templates/latestNews.html',
        controller: 'latestNewsCtrl'
      }
    }
  })

  .state('teacherNotes', {
    url: '/notes',
    templateUrl: 'templates/teacherNotes.html',
    controller: 'teacherNotesCtrl'
  })

$urlRouterProvider.otherwise('/signin')


});