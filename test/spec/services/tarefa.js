'use strict';

describe('Service: tarefa', function () {

  // load the service's module
  beforeEach(module('tasklistApp'));

  // instantiate service
  var tarefa;
  beforeEach(inject(function (_tarefa_) {
    tarefa = _tarefa_;
  }));

  it('should do something', function () {
    expect(!!tarefa).toBe(true);
  });

});
