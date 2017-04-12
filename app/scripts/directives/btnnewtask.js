'use strict';

/**
 * @ngdoc directive
 * @name tasklistApp.directive:btnNewTask
 * @description Diretiva para setar o foco no primeiro input visível
 * # btnNewTask
 */
angular.module('tasklistApp')
  .directive('btnNewTask', function ($timeout) {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
      	element.bind('click', function (){
      		$timeout(function (){
      			$('form input:nth-child(1n):visible')[0].focus();
      		});
      	});
      }
    };
  });
