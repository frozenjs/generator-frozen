'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var semver = require('semver');

var FrozenGenerator = module.exports = function FrozenGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
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
  }];

  this.prompt(prompts, function (props) {
    for(var key in props){
      this[key] = props[key];
    }

    done();
  }.bind(this));
};

FrozenGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('styles');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_README.md', 'README.md');
  this.copy('config.js', 'config.js');
  this.copy('game.profile.js', 'game.profile.js');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('styles/game.css', 'styles/game.css');
  if(this.boxGame){
    this.template('BoxGame/_index.html', 'index.html');
    this.copy('BoxGame/draw.js', 'src/draw.js');
    this.copy('BoxGame/game.js', 'src/game.js');
    this.copy('BoxGame/update.js', 'src/update.js');
    this.copy('BoxGame/boxData.js', 'src/boxData.js');
  } else {
    this.template('GameCore/_index.html', 'index.html');
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
