(function(window){
  window.NewrelicTiming = function() {
    this.marks = {};

    this.mark = function(name) {
      this.marks[name] = +new Date();
    };

    this.measure = function(markName, against) {
      var compareTime, referenceTime;

      if (against) {
        referenceTime = this.marks[against];
        compareTime = this.marks[markName];
      } else {
        referenceTime = this.marks[markName];
        compareTime = +new Date();
      }

      return compareTime - referenceTime;
    };

    this.sendNRBeacon = function(fragmentName) {
      if (!this.checkBeaconRequirements()) {
        return;
      }

      fragmentName || (fragmentName = window.location.hash.substring(1));

      var domTime = this.measure('domLoaded', 'navStart');
      var renderTime = this.measure('pageRendered', 'navStart');

      window.NREUM.inlineHit(fragmentName, 0, 0, 0, domTime, renderTime);
    };

    this.checkBeaconRequirements = function() {
      if (!window.NREUM || !window.NREUM.inlineHit || typeof window.NREUM.inlineHit !== 'function') {
        return false;
      }
      return this.marks.navStart && this.marks.domLoaded && this.marks.pageRendered;
    };
  };
})(window);
