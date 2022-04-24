const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const app = express();
 
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
};
const whitelist = ['http://localhost:3000','https://rfood.herokuapp.com']; // list of allow domain

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (whitelist.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}

// end 
app.use(cors(corsOptions));
app.use(express.static('./dist/FE-RF'));
 
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'/dist/FE-RF/index.html'));
});
 
app.use(forceSSL());
 
app.listen(process.env.PORT || 8080);