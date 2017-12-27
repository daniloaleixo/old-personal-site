var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index')
});

app.get('/cool', function(request, response) {
  response.send(cool());
});


// Email engine
app.post('/email', function(request, response) {
	console.log('O que vei', request.body);

	const email = request.body.email;
	const message = request.body.message;

	const msg = {
	  to: 'danilo_aleixo@hotmail.com',
	  from: email,
	  subject: 'Danilo Aleixo | Personal Website',
	  text: message
	};
	sgMail.send(msg);

	response.sendStatus(200);

});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});