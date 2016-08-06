'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-android-boilerplate:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'SampleApp',
        package: 'com.sample.boilerplate',
        targetSdk: '21',
        minSdk: '14'
      })
      .toPromise();
  });

  it('creates project files', function () {
    assert.file([
      '.gitignore',
      'build.gradle',
      'gradle.properties',
      'gradlew',
      'gradlew.bat',
      'settings.gradle',
      'README.md'
    ]);
  });

  it('creates core app files', function () {
    assert.file([
      'app/.gitignore',
      'app/build.gradle',
      'app/proguard-rules.pro',
      'app/src/main/java/com/sample/mvp/BoilerplateApplication.java',
      'app/src/main/AndroidManifest.xml'
    ]);
  });

  it('copies gradle wrapper', function () {
    assert.file([
      'gradle/wrapper/gradle-wrapper.jar',
      'gradle/wrapper/gradle-wrapper.properties'
    ]);
  });
});
