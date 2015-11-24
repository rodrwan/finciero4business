(function () {
  'use strict';

  angular.module('finciero.svc.category')
    .factory('Category', function ($q) {
      var categories, $defer;

      $defer = $q.defer();
      categories = [{
        id: 1,
        name: 'Presupuesto'
      }, {
        id: 2,
        name: 'Sueldos'
      }, {
        id: 3,
        name: 'Pagos Previsionales'
      }, {
        id: 4,
        name: 'Impuestos'
      }, {
        id: 5,
        name: 'Marketing'
      }, {
        id: 6,
        name: 'Tecnologia'
      }, {
        id: 7,
        name: 'Arriendo'
      }, {
        id: 8,
        name: 'Gastos Comunes'
      }, {
        id: 9,
        name: 'Electricidad'
      }, {
        id: 10,
        name: 'Agua'
      }, {
        id: 11,
        name: 'Telefonia'
      }, {
        id: 12,
        name: 'Transporte'
      }, {
        id: 13,
        name: 'Suministros'
      }, {
        id: 14,
        name: 'Aseo y Limpieza'
      }, {
        id: 15,
        name: 'Ingresos'
      }, {
        id: 16,
        name: 'Tecnología'
      }];
      setTimeout(function () {
        $defer.resolve(categories);
      }, 1000);

      return $defer.promise;

    });

}());
