var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('./services/authentication.js');
var expressSession = require('express-session');
var routes = require('./routes/index.js');
var path = require('path');

global.appRoot = path.resolve(__dirname);

var config = require( path.join( global.appRoot, '/nodejs_config/config.js'));
const MW = require(path.join(global.appRoot, '/middleware.js'));
const calendarControllers = require(path.join(global.appRoot, '/services/calendar.js'));

app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public')); // _dirname = name/path of current directory. this command
    // configures express to look for static content like images linked in html pages, js files, etc. in public folder.
app.use(expressSession( { // not including 'resave' and 'saveUninitialized' keys in this json results in deprecation warning
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false })); // omitting the "{ extended: false }" parameter here results in the
// warning "body-parser deprecated undefined extended: provide extended option" on executing the 'node app.js' command
app.use(bodyParser.json());

app.post('/api/authenticateLogin', routes.authenticateLogin);
app.post('/api/isUsernameUnique', routes.isUsernameUnique);
app.post('/api/forgotPassword', routes.forgotPassword);
app.post('/api/resetPassword', routes.resetPassword);
app.post('/api/upload-profile-image', MW.isLoggedIn, routes.uploadProfileImage);
app.get('/api/getMember/:id', MW.isLoggedIn, routes.getMember);
app.get('/api/profileimage', MW.isLoggedIn, routes.getProfileImage);
app.get('/api/members', MW.isLoggedIn, routes.getMembers);
app.put('/api/saveProgress', MW.isLoggedIn, routes.saveProgressRoute);
app.get('/api/logout', function(req, res){
  req.logout(); // method exposed by PassportJS, terminates user's session
  return res.status(config.App.httpStatuses.LOGOUT).send();
});
app.post('/api/events', MW.isLoggedIn, calendarControllers.save);
app.get('/api/events', calendarControllers.fetchAll);
app.get('/api/events/:id', calendarControllers.fetchEvent);
app.put('/api/events/:id', MW.isLoggedIn, calendarControllers.updateEvent);
app.delete('/api/events/:id', MW.isLoggedIn, calendarControllers.deleteEvent);

if(process.env.NODE_ENV !== 'test') { // spin off our http server only when NOT running in test env cuz the testing env sets one up automatically
	app.set('port', process.env.PORT || config.App.server.port);
	var server = app.listen( app.get('port'), function() {
		console.log('Express server listening on port %d', server.address().port);
	});
}

module.exports = app;