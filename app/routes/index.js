const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.cookies.language === 'english') {
    res.render('english')
  } else if (req.cookies.language === 'french') {
    res.render('french')
  } else {
    res.render('choose-language');
  }
});

router.get('/lang/english', function(req, res, next) {
  res.cookie('language', 'english');
  res.redirect('/');
});

router.get('/lang/french', function(req, res, next) {
  res.cookie('language', 'french');
  res.redirect('/');
});

const users = [
  {
    username: 'mlaws',
    password: '123'
  }
];

router.get('/login', (req, res) => {
  res.render('login')
});

router.get('/signup', (req, res) => {
  res.render('signup')
});

module.exports = router;
