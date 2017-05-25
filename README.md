# react-skellington
A basic skeleton for a React app with - of course - some basic assumptions and opinions

Uses webpack2, webpack dev server + hot module reloading.

Assumes you want a react app that uses Redux, Redux-Saga, React-Router and Redux-Form.

Also assumes you're going to be writing code in an es6-kinda way, using SASS and doing some object-rest-spread fun.

Also also assumes you want Moment.js.

# SKELLINGTON!

This is the _minimal_ set of dev dependencies I found that worked for my requirements - I wanted to write my webpack config as es6, I wanted webpack dev server, hot module reloading and some kind of production build.

# TODO

- Clean up webpack config (inc. per-environment setup)
- Verify requirment of specific babel plugins that seem dubious
- Clean up eslint rules
- Add contrived redux-saga example to verify HMR
- Refactor directory structure for redux and sagas related modules
- Add various css (postcss, whatever) webpack loaders/rules
- Add test harness - most likely involving mocha, chai and enzyme (enzyme wraps jsdom, so that is acceptable)
