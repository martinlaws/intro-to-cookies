const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.cookies.language === 'english') {
    res.render('english')
  } else if (req.cookies.language === 'french') {
    res.render('french')
  } else {
    res.render('choose-language');
  }
});

router.get('/lang/english', (req, res, next) => {
  res.cookie('language', 'english');
  res.redirect('/');
});

router.get('/lang/french', (req, res, next) => {
  res.cookie('language', 'french');
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  // res.cookie('language', '')
  res.clearCookie('language')

  res.redirect('/')
})

const users = [
 {
    username: 'mlaws',
    password: '123',
    admin: false
  }
];

const findUser = username => users.find(user => user.username === username)

const validateUser = (username, password) => users.find(user => user.username === username && user.password === password);

router.get('/login', (req, res) => {
  if (findUser(req.cookies.username)) {
    res.redirect('/treasure')
  } else {
    res.render('login')
  }
});

router.get('/signup', (req, res) => {
  res.render('signup')
});

router.get(`/treasure`, (req, res) => {
  const username  = req.cookies.username;
  const user = findUser(username);

  if (user) {
    res.render('treasure', { currentUser: user });
  } else {
    res.redirect('/login');
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (validateUser(username, password)) {
    res.cookie('username', username);
    res.redirect('/treasure');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
