(function () {
  'use strict';

  describe('filters:capitalize', function () {

    beforeEach(function () {
      module('finciero.flt.capitalize');
    });

    it('should return string with first upper letter and rest in lower case', inject(function ($filter) {
      var capitalize = $filter('capitalize');
      expect(capitalize('helloworld')).toEqual('Helloworld');
      expect(capitalize('HELLOWORLD')).toEqual('Helloworld');
    }));

  });

}());
