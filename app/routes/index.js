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
  if (req.cookies.username) {
    res.render('treasure', { currentUser: req.cookies.username })
  } else {
    res.render('login')
  }
});

router.get('/signup', (req, res) => {
  res.render('signup')
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password)

  if (user) {
    res.cookie('username', user.username)
    res.render('treasure', { currentUser: user.username })
  } else {
    res.redirect('/login')
  }
});

module.exports = router;
