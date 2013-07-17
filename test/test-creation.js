/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('frozen generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('frozen:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files for GameCore', function (done) {
    var expected = [
      'src/draw.js',
      'src/game.js',
      'src/update.js',
      'styles/game.css',
      '.bowerrc',
      '.gitignore',
      '.jshintrc',
      'bower.json',
      'config.js',
      'game.profile.js',
      'Gruntfile.js',
      'index.html',
      'package.json',
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'test game',
      'description': 'fake game for tests',
      'version': '0.1.0',
      'repo': 'git://github.com/justasilly/test',
      'boxGame': false,
      'ffInstall': false
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files for BoxGame', function (done) {
    var expected = [
      'src/boxData.js',
      'src/draw.js',
      'src/game.js',
      'src/update.js',
      'styles/game.css',
      '.bowerrc',
      '.gitignore',
      '.jshintrc',
      'bower.json',
      'config.js',
      'game.profile.js',
      'Gruntfile.js',
      'index.html',
      'package.json',
      'README.md'
    ];

    helpers.mockPrompt(this.app, {
      'name': 'test game',
      'description': 'fake game for tests',
      'version': '0.1.0',
      'repo': 'git://github.com/justasilly/test',
      'boxGame': true,
      'ffInstall': false
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('creates expected files for Firefox Install', function(done){
    var expected = [
      'manifest.webapp'
    ];
    helpers.mockPrompt(this.app, {
      'name': 'test game',
      'description': 'fake game for tests',
      'version': '0.1.0',
      'repo': 'git://github.com/justasilly/test',
      'boxGame': true,
      'ffInstall': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
