const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();


mongoose.connect('mongodb://127.0.0.1/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

const users = [
  { username: 'admin', password: 'password' },
  { username: 'user', password: '123456' }
];

// Middleware
function authenticateUser(req, res, next) {
  if (req.session && req.session.user) {
    // User is authenticated
    next();
  } else {
    
    res.redirect('/login');
  }
}

app.get('/login', (req, res) => {
  res.render('login'); 
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});


// Homepage
app.get('/', authenticateUser, async (req, res) => {
  let query = req.query.q;
  let searchCriteria = {};

  if (query) {
    const regex = new RegExp(query, 'i');
    searchCriteria = {
      $or: [
        { full: regex },
        { short: regex },
        { notes: regex }
      ]
    };
  }
  
  try {
    const shortUrls = await ShortUrl.find(searchCriteria).sort({ favorite: -1 });
    res.render('index', { shortUrls: shortUrls, query: query, user: req.session.user });
  } catch (error) {
    console.error('Error occurred while searching URLs:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.post('/shortUrls/:id/favorite', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const shortUrl = await ShortUrl.findById(id);

  if (!shortUrl) {
    return res.sendStatus(404);
  }

  shortUrl.favorite = !shortUrl.favorite;
  await shortUrl.save();

  res.redirect('/');
});



app.post('/shortUrls',authenticateUser,  async (req, res) => {
  const { fullUrl, notes } = req.body;
  await ShortUrl.create({ full: fullUrl, notes: notes });
  res.redirect('/');
});

app.get('/:shortUrl', authenticateUser, async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});

app.delete('/shortUrls/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  await ShortUrl.findByIdAndRemove(id);
  res.redirect('/');
});


app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port 5000');
});