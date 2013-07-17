var dojoConfig = {
  baseUrl: './',
  packages: [
    { name: 'dojo', location: 'deps/dojo' },
    { name: 'dcl', location: 'deps/dcl', main: 'dcl' },
    { name: 'lodash', location: 'deps/lodash/dist', main: 'lodash' },
    { name: 'hammer', location: 'deps/hammer/dist', main: 'hammer' },
    { name: 'frozen', location: 'deps/frozen/src', main: 'GameCore' },
<% if(ffInstall){ %>    { name: 'firefox-install', location: 'deps/firefox-install' },<% } %>
<% if(ffLandscape){ %>    { name: 'firefox-landscape', location: 'deps/firefox-landscape' },<% } %>
    { name: 'game', location: 'src', main: 'game' }
  ],
  deps: [<% if(ffInstall){ %>'firefox-install', <% } %><% if(ffLandscape){ %>'firefox-landscape', <% } %>'game'],
  async: true
};