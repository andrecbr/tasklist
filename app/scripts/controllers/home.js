'use strict';

/**
 * @ngdoc function
 * @name tasklistApp.controller:HomeCtrl
 * @description Controller principal
 * # HomeCtrl
 * Controller of the tasklistApp
 */
angular.module('tasklistApp')
  .controller('HomeCtrl', function (Tarefa, $window, toastr) {
    var vm = this;

    var newTask = {
    	titulo: '',
    	descricao: '',
    	status: 0
    };



    /**
     * Carregamento da lista de tarefas
    **/
    vm.loadTasks = function (){
    	vm.tasks = [];
    	Tarefa.query()
    		.$promise
	    	.then(function (response){
	    		vm.tasks = response;
	    	});
    };



    /**
     * Reseta o formulário para uma nova tarefa
    **/
    vm.newTask = function (){
    	vm.task = angular.copy(newTask);
    };



    /**
     * Salva a tarefa tanto se for inserção quanto edição
    **/
    vm.saveTask = function (){
    	var mode = 'insert',
    			params = null;

    	if (vm.task.id){
    		mode = 'update';
    		params = {id: vm.task.id};
    	}

    	Tarefa.save(params, vm.task)
    		.$promise
    		.then(function (response){
    			if (response.id){
    				// Recupera a tarefa recém criada/alterada
    				Tarefa.get({id: response.id})
    					.$promise
    					.then(function (response){
    						if (mode === 'insert'){
    							toastr.success('Tarefa cadastrada', 'Sucesso.');
    							vm.tasks.push(response);
    						}else{
    							toastr.success('Tarefa alterada', 'Sucesso.');
    							vm.loadTasks();
    						}
    					});
    			}
    		})
    		// Ao final do processo limpa o formulário
    		.finally(function (){
    			vm.newTask();
    		});
    	
    };



    /**
     * Edição da tarefa
    **/
    vm.editTask = function (task){
    	vm.task = task;
    };



    /**
     * Exclui a tarefa de acordo com seu ID
    **/
    vm.deleteTask = function (id){
    	if ($window.confirm('Confirma a exclusão da tarefa?')){
	    	Tarefa.delete({id: id})
	    		.$promise
	    		.then(function (response){
	    			if (response.count){
	    				toastr.success('Tarefa excluída', 'Sucesso.');
	    				vm.loadTasks();
	    				vm.newTask();
	    			}
	    		});
    	}
    };

    

    // Função extra para formatação da data do formato MySQL para ISO
    vm.formatDate = function (date){
    	return new Date(date).toISOString();
    };



    /**
     * Inicialização da página
    **/
    vm.loadTasks();							//carrega as tarefas
    vm.newTask();								//limpa/reseta o formulário

  });
