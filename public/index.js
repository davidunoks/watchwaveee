const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
const form = document.querySelector('form')

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});


// Fetching of movies

function getRecommendations() {
  const genreInput = document.getElementById('genre');
  const genre = genreInput.value.toLowerCase();

  // Check if the genre is empty
  if (!genre) {
    // Display a message if no genre is provided
    const recommendedMoviesList = document.getElementById('recommendedMovies');
    recommendedMoviesList.innerHTML = `Please enter a genre to get recommendations.`;
    return;
  }

  // Make fetch request to the server
  fetch(`/recommend/?genre=${genre}`)
    .then(response => response.json())
    .then(data => {
      // Display recommended movies
      const recommendedMoviesList = document.getElementById('recommendedMovies');
      recommendedMoviesList.innerHTML = '';

      data.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = `${movie.title} (${movie.genre}) - Rating: ${movie.rating}`;
        recommendedMoviesList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching recommendations:', error));
}
