'use strict';

const renamer = require('renamer');
const rimraf = require('rimraf');
const path = require('path');
const Git = require("nodegit");
const replace = require("replace");
const filter = require('filter-files');
const findInFiles = require('find-in-files');

// Clone a given repository into the `./tmp` folder.
rimraf.sync(__dirname + '../generators/app/templates')

Git.Clone("https://github.com/ribot/android-boilerplate", "../generators/app/templates")
  // Look up this known commit.
  .then(function(repo) {
    console.log("Completed cloning");

    replace({
      regex: "uk.co.ribot.androidboilerplate",
      replacement: "<%= appPackage %>",
      paths: ['../generators/app/templates'],
      recursive: true,
      silent: false,
    });


  })
  .catch(function(err) {
    console.log(err);
  });