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
