/*
** Workaround for Android see comment issue #15902 on react-native repo
** https://github.com/facebook/react-native/issues/15902#issuecomment-401000569
 */

// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
