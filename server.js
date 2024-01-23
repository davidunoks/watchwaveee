const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://davidunoks:1234@cluster0.ob21fjr.mongodb.net/?retryWrites=true&w=majority', {
    tls: true
});

// Movie schema
const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    rating: Number,
});

const Movie = mongoose.model('Movie', movieSchema);
// Assuming you have already connected to the MongoDB and defined the Movie model

const movies = [
    {
      title: 'The Godfather: Part II',
      genre: 'Crime',
      rating: 9.0,
    },
    {
      title: 'Schindler\'s List',
      genre: 'Biography',
      rating: 8.9,
    },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      genre: 'Adventure',
      rating: 8.8,
    },
    {
      title: 'Fight Club',
      genre: 'Drama',
      rating: 8.8,
    },
    {
      title: 'Forrest Gump',
      genre: 'Drama',
      rating: 8.8,
    },
    {
      title: 'The Matrix',
      genre: 'Action',
      rating: 8.7,
    },
    {
      title: 'The Dark Knight Rises',
      genre: 'Action',
      rating: 8.4,
    },
    {
      title: 'The Shawshank Redemption',
      genre: 'Drama',
      rating: 9.3,
    },
    {
      title: 'The Silence of the Lambs',
      genre: 'Crime',
      rating: 8.6,
    },
    {
      title: 'Inception',
      genre: 'Sci-Fi',
      rating: 8.8,
    },
    {
      title: 'Gladiator',
      genre: 'Action',
      rating: 8.5,
    },
    {
      title: 'The Departed',
      genre: 'Crime',
      rating: 8.5,
    },
    {
      title: 'Braveheart',
      genre: 'Biography',
      rating: 8.4,
    },
    {
      title: 'The Social Network',
      genre: 'Drama',
      rating: 7.7,
    },
    {
      title: 'The Revenant',
      genre: 'Action',
      rating: 8.0,
    },
    {
      title: 'The Grand Budapest Hotel',
      genre: 'Adventure',
      rating: 8.1,
    },
    {
      title: 'The Green Mile',
      genre: 'Crime',
      rating: 8.6,
    },
    {
      title: 'Jurassic Park',
      genre: 'Adventure',
      rating: 8.1,
    },
    {
      title: 'The Pianist',
      genre: 'Biography',
      rating: 8.5,
    },
    {
      title: 'The Big Lebowski',
      genre: 'Comedy',
      rating: 8.1,
    },
    {
      title: 'A Beautiful Mind',
      genre: 'Biography',
      rating: 8.2,
    },
    {
      title: 'The Usual Suspects',
      genre: 'Crime',
      rating: 8.5,
    },
    {
      title: 'The Lion King',
      genre: 'Animation',
      rating: 8.5,
    },
    {
      title: 'The Princess Bride',
      genre: 'Adventure',
      rating: 8.1,
    },
    {
      title: 'The Terminator',
      genre: 'Action',
      rating: 8.0,
    },
    {
      title: 'The Shining',
      genre: 'Drama',
      rating: 8.4,
    },
    {
      title: 'Eternal Sunshine of the Spotless Mind',
      genre: 'Drama',
      rating: 8.3,
    },
    {
      title: 'The Breakfast Club',
      genre: 'Comedy',
      rating: 7.9,
    },
    {
      title: 'The Truman Show',
      genre: 'Comedy',
      rating: 8.1,
    },
    {
      title: 'Dead Poets Society',
      genre: 'Drama',
      rating: 8.1,
    },
  ];
  
  // Insert movies into the MongoDB database
  const insertMovies = async () => {
    try {
        const existingMovies = await Movie.find();
        const moviesToInsert = movies.filter(movie => !existingMovies.some(existingMovie => existingMovie.title === movie.title));

        if (moviesToInsert.length > 0) {
            await Movie.insertMany(movies.map(movie => ({ ...movie, genre: movie.genre.toLowerCase() })));
            console.log('Movies inserted successfully.');
        } else {
            console.log('No new movies to insert.');
        }
    } catch (error) {
        console.error('Error inserting movies:', error);
    }
};

// Call the function to insert movies when the server starts
insertMovies();


// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/recommend', async (req, res) => {
    const genre = req.query.genre;

    if (!genre || typeof genre !== 'string') {
        return res.status(400).json({ error: 'Invalid genre parameter' });
    }

    // Example recommendation logic - find movies with the same genre
    const recommendedMovies = await Movie.find({ genre });

    res.json(recommendedMovies);
});

    

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
