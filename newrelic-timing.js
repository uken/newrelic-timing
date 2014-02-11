/*!
 * newrelic-timing v0.4.0 - Integrates Single Page Apps with NewRelic's Real User Monitoring
 * Copyright (c) 2014 Diogo Terror <diogo@uken.com>, pitr <pitr.vern@gmail.com> - https://github.com/uken/newrelic-timing
 * License: MIT
 */

(function(window, NREUM){
  window.NewrelicTiming = function() {
    this.marks = {};
    this.NREUM = NREUM;

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

      this.NREUM.inlineHit(fragmentName, 0, 0, 0, domTime, renderTime);
    };

    this.checkBeaconRequirements = function() {
      if (!this.NREUM || !this.NREUM.inlineHit || typeof this.NREUM.inlineHit !== 'function') {
        return false;
      }
      return this.marks.navStart && this.marks.domLoaded && this.marks.pageRendered;
    };
  };
})(window, window.NREUM);