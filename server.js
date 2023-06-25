const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const methodOverride = require('method-override'); 
const app = express();

mongoose.connect('mongodb://127.0.0.1/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// process of adding the method
app.use(methodOverride('_method')); 

app.get('/', async (req, res) => {
    let query = req.query.q; 
    let searchCriteria = {}; 
  
    if (query) {
        const regex = new RegExp(query, 'i');
        searchCriteria = {
          $or: [
            // searching through all the three
            { full: regex },
            { short: regex }, 
            { notes: regex}
          ],
        };
      }
  
    try {
      // Finding the matching URLs based on search criteria
      const shortUrls = await ShortUrl.find(searchCriteria); 
      // Passing the search results and query to the viewing
      res.render('index', { shortUrls: shortUrls, query: query }); 
    } catch (error) {
      console.error('Error occurred while searching URLs:', error);
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



// This will be handling the delete request for removing the entry
app.delete('/shortUrls/:id', async (req, res) => {
  const { id } = req.params;
  await ShortUrl.findByIdAndRemove(id);
  res.redirect('/');
});

app.listen(process.env.PORT || 5000);
