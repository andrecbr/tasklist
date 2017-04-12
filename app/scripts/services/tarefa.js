'use strict';

/**
 * @ngdoc service
 * @name tasklistApp.Tarefa
 * @description Serviço/Classe para controle das ações principais das tarefas
 * # Tarefa
 * Factory in the tasklistApp.
 */
angular.module('tasklistApp')
  .factory('Tarefa', function ($resource) {
    return $resource('http://demo.performatric.com.br/api/tarefa/:id', null,
      {
        'update': { method:'PUT' }
      });
  });
