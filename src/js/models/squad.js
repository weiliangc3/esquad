angular
  .module('eSquad')
  .factory('Squad', Squad);

Squad.$inject = ['$resource', 'API'];
function Squad($resource, API){

  return $resource(
    API+'/squads/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'update':    { method: 'PUT' }
    }
  );
}
