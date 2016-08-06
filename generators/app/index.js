'use strict';

const yeoman = require('yeoman-generator');
const mkdirp = require('mkdirp');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.props = {};
  },
  prompting: function () {
    this.log(yosay(
      'Welcome to the rad ' + chalk.red('Android Boilerplate ') + ' generator!'
    ));
    const prompts = [{
      name: 'name',
      message: 'What are you calling your app?',
      store: true,
      default: this.appname // Default to current folder name
    },
      {
        name: 'package',
        message: 'What package will you be publishing the app under?',
        store: true
      },
      {
        name: 'targetSdk',
        message: 'What Android SDK will you be targeting?',
        store: true,
        default: 23  // Android 6.0 (Marshmallow)
      },
      {
        name: 'minSdk',
        message: 'What is the minimum Android SDK you wish to support?',
        store: true,
        default: 15  // Android 4.0 (Ice Cream Sandwich)
      }];

    return this.prompt(prompts).then(props => {
      this.props.appPackage = props.package;
      this.appName = props.name;
      this.appPackage = props.package;
      this.androidTargetSdkVersion = props.targetSdk;
      this.androidMinSdkVersion = props.minSdk;
    });
  },

  writing: function () {
    var packageDir = this.props.appPackage.replace(/\./g, '/');
    mkdirp('app');
    mkdirp('app/src/androidTest/java/' + packageDir);
    mkdirp('app/src/commonTest/java/' + packageDir);
    mkdirp('app/src/debug');
    mkdirp('app/src/main/assets');
    mkdirp('app/src/main/java/' + packageDir);
    mkdirp('app/src/test/java/' + packageDir);

    this.directory('gradle', 'gradle');
    this.directory('app/src/main/assets', 'app/src/main/assets');

    this.copy('.gitignore', '.gitignore');
    this.copy('build.gradle', 'build.gradle');
    this.copy('gradle.properties', 'gradle.properties');
    this.copy('gradlew', 'gradlew');
    this.copy('gradlew.bat', 'gradlew.bat');
    this.copy('settings.gradle', 'settings.gradle');
    this.copy('app/.gitignore', 'app/.gitignore');
    this.copy('app/proguard-rules.pro', 'app/proguard-rules.pro');

    this.template('README.md', 'README.md');
    this.template('app/build.gradle', 'app/build.gradle');
    this.template('app/src/androidTest/java/uk/co/ribot/androidboilerplate', 'app/src/androidTest/java/' + packageDir, this, {});
    this.template('app/src/commonTest/java/uk/co/ribot/androidboilerplate', 'app/src/commonTest/java/' + packageDir, this, {});
    this.template('app/src/debug/AndroidManifest.xml', 'app/src/debug/AndroidManifest.xml');
    this.template('app/src/main/AndroidManifest.xml', 'app/src/main/AndroidManifest.xml');
    this.template('app/src/main/java/uk/co/ribot/androidboilerplate', 'app/src/main/java/' + packageDir, this, {});
    this.template('app/src/main/res', 'app/src/main/res', this, {});
    this.template('app/src/test/java/uk/co/ribot/androidboilerplate', 'app/src/test/java/' + packageDir, this, {});
  }
});
