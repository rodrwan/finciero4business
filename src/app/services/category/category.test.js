(function () {
  'use strict';

  describe('service:category', function () {

    beforeEach(function () {
      module('finciero.svc.category');
    });

    it('should contain an Category service', inject(function(Category) {
      expect(Category).not.toEqual(null);
    }));

  });

}());
