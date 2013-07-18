'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var semver = require('semver');

var FrozenGenerator = module.exports = function FrozenGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    if(!options['skip-install']){
      this.installDependencies({ skipInstall: options['skip-install'] });
      if(this.ffInstall){
        this.bowerInstall([
          'firefox-install'
        ], {
          save: true
        });
      }
      if(this.ffLandscape){
        this.bowerInstall([
          'firefox-landscape'
        ], {
          save: true
        });
      }
    }
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(FrozenGenerator, yeoman.generators.Base);

FrozenGenerator.prototype.askFor = function askFor() {
  var done = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'name',
    message: 'What is the name of your game?'
  },{
    name: 'description',
    message: 'Describe your game'
  },{
    name: 'version',
    message: 'What version is your game?',
    validate: function(input){
      var done = this.async();
      if(semver.valid(input)){
        done(true);
      } else {
        done('Please specify a valid semver');
      }
    }
  },{
    name: 'repo',
    message: 'Where is the repository?'
  },{
    type: 'confirm',
    name: 'boxGame',
    message: 'Will your game use Box2D?',
    default: false
  },{
    type: 'confirm',
    name: 'ffInstall',
    message: 'Should your game be installable on Firefox/FFOS?',
    default: false
  },{
    name: 'devName',
    message: '(Developer Info) What is your name?',
    when: function(input){
      return input.ffInstall;
    }
  },{
    name: 'devUrl',
    message: '(Developer Info) What is your homepage?',
    when: function(input){
      return input.ffInstall;
    }
  },{
    type: 'confirm',
    name: 'ffLandscape',
    message: 'Lock in landscape mode on Firefox when available?',
    default: false,
    when: function(input){
      return input.ffInstall;
    }
  }];

  this.prompt(prompts, function (props) {
    for(var key in props){
      this[key] = props[key];
    }

    // Since the questions may or may not be asked
    this.devName = this.devName || '';
    this.devUrl = this.devUrl || '';
    this.ffLandscape = this.ffLandscape || false;

    done();
  }.bind(this));
};

FrozenGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('styles');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_README.md', 'README.md');
  this.template('_config.js', 'config.js');
  this.template('_index.html', 'index.html');
  this.copy('game.profile.js', 'game.profile.js');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('styles/game.css', 'styles/game.css');

  if(this.ffInstall){
    this.mkdir('icons');

    this.template('_manifest.webapp', 'manifest.webapp');
    this.copy('icons/icon16.png', 'icons/icon16.png');
    this.copy('icons/icon30.png', 'icons/icon30.png');
    this.copy('icons/icon32.png', 'icons/icon32.png');
    this.copy('icons/icon48.png', 'icons/icon48.png');
    this.copy('icons/icon60.png', 'icons/icon60.png');
    this.copy('icons/icon64.png', 'icons/icon64.png');
    this.copy('icons/icon128.png', 'icons/icon128.png');
  }

  if(this.boxGame){
    this.copy('BoxGame/draw.js', 'src/draw.js');
    this.copy('BoxGame/game.js', 'src/game.js');
    this.copy('BoxGame/update.js', 'src/update.js');
    this.copy('BoxGame/boxData.js', 'src/boxData.js');
  } else {
    this.copy('GameCore/draw.js', 'src/draw.js');
    this.copy('GameCore/game.js', 'src/game.js');
    this.copy('GameCore/update.js', 'src/update.js');
  }
};

FrozenGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('gitignore', '.gitignore');
  this.copy('bowerrc', '.bowerrc');
  this.copy('jshintrc', '.jshintrc');
};
