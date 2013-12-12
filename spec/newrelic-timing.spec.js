(function(global) {

  describe('NewrelicTiming', function(){

    var newrelicTiming;

    beforeEach(function() {
      newrelicTiming  = new global.NewrelicTiming();
    });

    describe('mark', function() {

      it('marks an event', function() {
        newrelicTiming.mark('hello');

        expect(typeof newrelicTiming.marks.hello).toBe('number');

        expect(newrelicTiming.marks.hello).toBeLessThan(+new Date()+1);
        expect(newrelicTiming.marks.hello).toBeGreaterThan(+new Date()-10);
      });
    });

    describe('measure', function() {

      it('returns difference between two marks', function() {
        newrelicTiming.marks.a = 1;
        newrelicTiming.marks.b = 100;

        expect(newrelicTiming.measure('b', 'a')).toBe(99);
      });

    });

    describe('checkBeaconRequirements', function() {
      beforeEach(function() {
        newrelicTiming.marks = {
          'navStart': 5,
          'domLoaded': 9,
          'pageRendered': 20
        };

        newrelicTiming.NREUM = {
          inlineHit: function() {
          }
        };
      });

      it('returns true if everything is setup', function() {
        expect(newrelicTiming.checkBeaconRequirements()).toBeTruthy();
      });

      it('returns false if NREUM is not defined', function() {
        newrelicTiming.NREUM = null;

        expect(newrelicTiming.checkBeaconRequirements()).toBeFalsy();
      });

      it('returns false if NREUM.inlineHit is not defined', function() {
        newrelicTiming.NREUM = {};

        expect(newrelicTiming.checkBeaconRequirements()).toBeFalsy();
      });

      it('returns false if NREUM.inlineHit is not a function', function() {
        newrelicTiming.NREUM = {
          inlineHit: 42
        };

        expect(newrelicTiming.checkBeaconRequirements()).toBeFalsy();
      });

      it('returns false if proper marks are not set', function() {
        newrelicTiming.marks = {};

        expect(newrelicTiming.checkBeaconRequirements()).toBeFalsy();

        newrelicTiming.marks = {
          'navStart': 5,
          'pageRendered': 20
        };

        expect(newrelicTiming.checkBeaconRequirements()).toBeFalsy();
      });

    });

    describe('sendNRBeacon', function() {

      var results = null;

      beforeEach(function() {
        newrelicTiming.marks.navStart = 5;
        newrelicTiming.marks.domLoaded = 9;
        newrelicTiming.marks.pageRendered = 20;

        newrelicTiming.NREUM = {
          inlineHit: function() {
            results = [].slice.call(arguments, 0);
          }
        };

        newrelicTiming.checkBeaconRequirements = function() {
          return true;
        };
      });

      it('sends specific markings to NREUM', function() {
        newrelicTiming.sendNRBeacon('page1');

        expect(results).toEqual(['page1', 0, 0, 0, 4, 15]);
      });

      it('handles hash in fragments', function() {
        window.location.hash = '#page2/page3/';
        newrelicTiming.sendNRBeacon();

        expect(results).toEqual(['page2/page3/', 0, 0, 0, 4, 15]);
      });
    });
  });

}(this));
