NewRelic Timing
===============

Integrates Single Page Apps with NewRelic's Real User Monitoring

### Installing

Make sure you have bower. Also see http://bower.io/

    npm install -g bower

then run:

    bower install newrelic-timing

For Rails, consider using https://rails-assets.org/ and add the following to your Gemfile:

```ruby
source 'https://rails-assets.org'

gem "rails-assets-newrelic-timing"
```

### Usage

- `newrelic-timing.js` exposes `window.newrelicTiming` that does all the work.
- `newrelic-timing-angular.js` hooks `newrelicTiming` into angular router state changes.

Please take a look at `newrelic-timing-angular.js` as an example of how to integrate this into your framework.

### Changelog

#### 0.2.0 (December 12, 2013)

- Gracefully handle NREUM not being loaded
- newrelicTiming.sendNRBeacon() now takes optional fragment as a parameter
- angular version uses $location.path() for fragment name

#### 0.1.0 (November 27, 2013)

Initial Release
