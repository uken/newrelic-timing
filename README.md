NewRelic Timing
===============

[![Build Status](https://travis-ci.org/uken/newrelic-timing.png?branch=master)](https://travis-ci.org/uken/newrelic-timing)

Integrates Single Page Apps with NewRelic's Real User Monitoring

### Installing

Make sure you have bower. Also see http://bower.io/

    npm install -g bower

then run:

    bower install newrelic-timing

For Rails, consider using [bower-rails gem](https://github.com/42dev/bower-rails) or https://rails-assets.org/ and add the following to your Gemfile:

```ruby
source 'https://rails-assets.org'

gem "rails-assets-newrelic-timing"
```

### AngularJS 

To install add both `newrelic-timing.js` and `newrelic-timing-angular.js` scripts to your html, then add `newrelic-timing` to your angular module dependencies.

```javascript
angular.module('your.application', [
  // other dependencies
  'newrelic-timing'
]);
```

Supports both ui-router and ngRoute. 


### Usage

- `newrelic-timing.js` exposes `window.newrelicTiming` that does all the work.
- `newrelic-timing-angular.js` hooks `newrelicTiming` into angular router state changes.

Please take a look at `newrelic-timing-angular.js` as an example of how to integrate this into your framework.

### Changelog

#### 0.4.0 (February 11, 2014)

- added support for [ui-router](https://github.com/angular-ui/ui-router)

#### 0.3.1 (December 18, 2013)

- fixed a silly typo in the angular plugin that prevented it from working

#### 0.3.0 (December 12, 2013)

- add specs
- fix minor bugs and internal refactorings

#### 0.2.0 (December 12, 2013) (broken)

- Gracefully handle NREUM not being loaded
- newrelicTiming.sendNRBeacon() now takes optional fragment as a parameter
- angular version uses $location.path() for fragment name

#### 0.1.0 (November 27, 2013)

Initial Release
