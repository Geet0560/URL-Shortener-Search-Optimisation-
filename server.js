const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const methodOverride = require('method-override');
const Favorite = require('./models/favorite');
const app = express();

mongoose.connect('mongodb://127.0.0.1/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const filter = req.query.filter;

  let shortUrls;
  if (filter === 'alphabetical') {
    shortUrls = await ShortUrl.find({}).sort({ notes: 1 });
  } else if (filter === 'time') {
    shortUrls = await ShortUrl.find({}).sort({ createdAt: -1 });
  } else if (filter === 'length') {
    shortUrls = await ShortUrl.aggregate([
      {
        $project: {
          full: 1,
          short: 1,
          clicks: 1,
          notes: 1,
          length: { $strLenCP: '$notes' }
        }
      },
      { $sort: { length: 1 } },
      {
        $project: {
          full: 1,
          short: 1,
          clicks: 1,
          notes: 1
        }
      }
    ]);
  } else {
    shortUrls = await ShortUrl.find({});
  }

  try {
    const favoriteUrls = await ShortUrl.find({ favorite: true });
    res.render('index', { shortUrls: shortUrls, favoriteUrls: favoriteUrls });
  } catch (error) {
    console.error('Error occurred while retrieving URLs:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/shortUrls', async (req, res) => {
  const { fullUrl, notes } = req.body;
  await ShortUrl.create({ full: fullUrl, notes: notes });
  res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});

app.put('/shortUrls/:id/favorite', async (req, res) => {
  const { id } = req.params;
  try {
    const shortUrl = await ShortUrl.findById(id);
    if (!shortUrl) {
      return res.status(404).send('URL not found');
    }

    
    shortUrl.favorite = !shortUrl.favorite;
    await shortUrl.save();

    if (shortUrl.favorite) {
      const favorite = await Favorite.create({
        full: shortUrl.full,
        short: shortUrl.short,
        clicks: shortUrl.clicks,
        notes: shortUrl.notes
      });
      console.log('Favorite created:', favorite);
    } else {

      await Favorite.deleteOne({ short: shortUrl.short });
      console.log('Favorite deleted:', shortUrl.short);
    }

    res.redirect('/');
  } catch (error) {
    console.error('Error occurred while favoriting/unfavoriting URL:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/shortUrls/:id', async (req, res) => {
  const { id } = req.params;
  await ShortUrl.findByIdAndRemove(id);
  res.redirect('/');
});

app.listen(process.env.PORT || 5000);
