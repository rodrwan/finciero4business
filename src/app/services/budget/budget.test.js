(function () {
  'use strict';

  describe('service:budget', function () {

    beforeEach(function () {
      module('finciero.svc.budget');
    });

    it('should contain an budget service', inject(function(Budget) {
      expect(Budget).not.toEqual(null);
    }));


  });

}());
