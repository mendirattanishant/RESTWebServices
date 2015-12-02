//#!/bin/env node

var express = require('express')
  , http = require('http')
  , path = require('path')
  , request = require('request')
  , cors = require('cors')
  , db = require('./routes/db')
  ,UserAPIs = require('./routes/UserAPIs'),
  SkiAPIs = require('./routes/SkiAPIs');
  var fs      = require('fs');

/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.app = express();

        // all environments
        self.app.set('views', __dirname + '/public');
        self.app.set('view engine', 'ejs');
        //self.app.use(express.logger('dev'));
        self.app.use(express.bodyParser());
        self.app.use(express.methodOverride());
        self.app.use(self.app.router);
        self.app.use(cors());
        self.app.use(express.static(path.join(__dirname, 'public')));

        // development only
        if ('development' == self.app.get('env')) {
          self.app.use(express.errorHandler());
        }

         //self.app.get('/getTasks', KanbanAPIs.getTasks);
         self.app.post('/createUser', UserAPIs.createUser);
         self.app.get('/getUsers', UserAPIs.getUsers);
         self.app.post('/login', UserAPIs.login);
         self.app.post('/attendEvent', UserAPIs.attendEvent);
         self.app.delete('/deleteEvent', UserAPIs.deleteEvent);
         self.app.post('/createSkiRecord', SkiAPIs.createSkiRecord);
         self.app.post('/getSkiRecords', SkiAPIs.getSkiRecords);
         self.app.delete('/deleteSkiRecord', SkiAPIs.deleteSkiRecord);
         self.app.post('/getAttendingEvents', UserAPIs.getAttendingEvents); 
         //self.app = express.createServer();
        
    };
    
     self.createRoutes();
         self.app = express.createServer();
        self.app = express.createServer();
        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }

    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        console.log ("Check initialize working")
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();
