var express = require('express');
var router = express.Router();
var passport = require('passport');

router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

router.post('/api/signup',function(req, res, next) {
   passport.authenticate('local.signup', function (err,user,info) {
     if (err) {
       return next(err);
     }
     if (!user) {
       return res.status(401).json({
         err: info
       });
     }
     req.logIn(user, function(err) {
       if (err) {
         return res.status(500).json({
           err: 'Could not Register user'
         });
       }
    res.status(200).json({
      status: 'Registration successful!'
    });
    });
  })(req, res, next);
  });

router.post('/api/signin',function(req, res, next) {
passport.authenticate('local.signin', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
  });

  router.get('/api/logout', function(req, res,next) {
    req.logout();
    res.status(200).json({
      status: 'Bye!'
    });
  });


router.get('/api/status', function(req, res,next) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});



module.exports = router;



function isLoggedIn(req, res, next) {
      if (!req.isAuthenticated()) {
      return res.status(200).json({
        status: false
      });
    }
    res.status(200).json({
      status: true
    });
}
