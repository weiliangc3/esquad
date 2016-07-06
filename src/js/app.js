angular
.module('eSquad', ['ngResource', 'angular-jwt','ui.router','ngFileUpload'])
// .constant('API', 'http://localhost:3000/api')
.constant('API', 'https://thisisesquad.herokuapp.com/api')
.constant('AWS_URL', "https://s3-eu-west-1.amazonaws.com/wdi19-weidings/")
.config(MainRouter)
.config(function($httpProvider){
  $httpProvider.interceptors.push("authInterceptor");
});


MainRouter.$inject = ['$stateProvider','$urlRouterProvider', "$locationProvider"];
function MainRouter($stateProvider, $urlRouterProvider, $locationProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "../views/statics/home.html",
      resolve: {
        showCarousal: function() {return true;}
      },
      onEnter: function(){
      }
    })
    .state('login', {
      url: "/login",
      templateUrl: "../views/authentication/login.html",
      onEnter: function(){
      }
    })
    .state('register', {
      url: "/register",
      templateUrl: "../views/authentication/register.html",
      onEnter: function(){
      }
    })
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "../views/dashboard.html",
      controller: "UsersController as User",
      onEnter: function(){
      }
    })
    .state('squadsIndex', {
      url: "/squads",
      templateUrl: "../views/squads/index.html",
      controller: "SquadsController as Squads",
      onEnter: function(){
      }
    })
    .state('squadsNew', {
      url: "/squads/new",
      templateUrl: "../views/squads/new.html",
      controller: "SquadsController as Squads",
      onEnter: function(){
      }
    })
    .state('squadsShow', {
      url: "/squads/:squadId",
      templateUrl: "../views/squads/show.html",
      controller: "SquadsController as Squads",
      onEnter: function(){
      }
    })
    .state('squadsEdit', {
      url: "/squads/:squadId/edit",
      templateUrl: "../views/squads/edit.html",
      controller: "SquadsController as Squads",
      onEnter: function(){
      }
    })
    .state('usersIndex', {
      url: "/users",
      templateUrl: "../views/users/index.html",
      onEnter: function(){
      }
    })
    .state('usersEdit', {
      url: "/users/:userId/edit",
      templateUrl: "../views/users/edit.html",
      controller: "UsersController as User",
      onEnter: function(){
      }
    })
    .state('usersShow', {
      url: "/users/:userId",
      templateUrl: "../views/users/show.html",
      controller: "UsersController as User",
      onEnter: function(){
      }
    });

  $urlRouterProvider.otherwise("/");
}


$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});
