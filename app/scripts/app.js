'use strict';

/**
 * @ngdoc overview
 * @name tasklistApp
 * @description Configurações do sistema
 * # tasklistApp
 *
 * Main module of the application.
 */
angular
  .module('tasklistApp', [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'toastr'
  ])

  .config(function($stateProvider, $urlRouterProvider) {

  	$stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/layout.html',
        controller: 'RootCtrl'
      })
      .state('app.home', {
        url: '^/home',
        views: {
          'content': {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl as vm'
          }
        }
      })
      .state('app.profile', {
        url: '^/profile',
        views: {
          'content': {
            templateUrl: 'views/profile.html'
          }
        }
      });

    // endereço padrão
    $urlRouterProvider.otherwise('/home');
  });
