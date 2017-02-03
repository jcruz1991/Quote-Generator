var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Twit = require('twit');

var T = new Twit({
  consumer_key:         'vt7Yst7BHtxSeckX5aePWlN2f',
  consumer_secret:      'KiEH96VsR3neV4xV4r5kq1pSDXiPG3MqttyQ19WTW3dxGYpnAN',
  access_token:         '195223500-tPugMimarFzvqtZLlbvdf4oZUHlpaaoBsiqybhkG',
  access_token_secret:  'QnKVSoJR0LvdyIkIMeIUufihTvVbFqX1tChVZcwcNQy7p',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').createServer(app);
var port = 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, function() {
    console.log('Server listening on port 3000.');
});


app.use('/', index);
app.use('/users', users);

app.get('/retrieveQuotes', function(req, res){

    // Quotes list
    var quotes =["Success or failure is caused more by mental attitude than by mental capacity.", "To be conscious that you are ignorant is a great step to knowledge.", "Action may not always bring happiness but there is no happiness without action.", "Progress is impossible without change; and those who cannot change their minds cannot change anything.", "Success is not the result of spontaneous combustion. You must set yourself on fire.", "Yes, risk taking is inherently failure-prone. Otherwise, it would be called sure-thing-taking."];

    // Grab length of quotes
    var quotesLength = quotes.length - 1;

    // Grab random quote
    var random = Math.floor((Math.random() * quotesLength) + 1);
    var randomQuote = quotes[random];
    res.json(randomQuote);

});

app.post('/tweet', function(req, res) {
  var quote = req.body.quote;
  var tweet = {
    status: quote
  };
  console.log(tweet);
    T.post('statuses/update', tweet, function(err, data, response) {
    console.log(data);
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
