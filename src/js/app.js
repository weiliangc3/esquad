angular
.module('eSquad', ['ngResource', 'angular-jwt','ui.router','ngFileUpload'])
.constant('API', 'https://localhost:3000/api')
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
    .state('teams.show', {
      url: "/teams/:teamid",
      templateUrl: "../views/teams/show.html",
      onEnter: function(){
      }
    })
    .state('teams.index', {
      url: "/teams",
      templateUrl: "../views/teams/index.html",
      onEnter: function(){
      }
    })
    .state('teams.edit', {
      url: "/teams/:teamid/edit",
      templateUrl: "../views/teams/edit.html",
      onEnter: function(){
      }
    })
    .state('teams.new', {
      url: "/teams/new",
      templateUrl: "../views/teams/new.html",
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
