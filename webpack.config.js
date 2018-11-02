/**
 * Why is this here you ask? React Native doesn't use Webpack. True. This file is here to trick
 * IDEA in recognizing module aliases (see the package.json files in some of the subdirs).
 * Nice solution? No. Does it work? Sure.
 * Tracker URL: https://youtrack.jetbrains.com/issue/WEB-23221
 *
 * - TS
 */
/* eslint-disable */

const fs = require('fs');
const path = require('path');

const walkSync = function (dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    } else if (file === 'package.json') {
      filelist.push([path.resolve(dir), path.resolve(dir + file)]);
    }
  });
  return filelist;
};

const alias = {};
walkSync('app/src/').forEach((p) => {
  const pkg = require(p[1]);
  alias[pkg.name] = p[0];
});

module.exports = {
  resolve: {
    alias
  }
};
