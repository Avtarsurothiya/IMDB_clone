const homeButton = document.querySelector("#homeButton");
const searchBox = document.querySelector(".form-control");
const goToFavouriteButton = document.querySelector("#goto-favourites-button");
const movieCardContainer = document.querySelector(".box")


function showAlert(message) {
    alert(message);
  }
  
  let currentMovieStack = [];
  
  function renderList(actionForButton) {
    movieCardContainer.innerHTML = '';
    for (let i = 0; i < currentMovieStack.length; i++) {


        let movieCard = document.createElement('div');
        movieCard.classList.add("movie-card");
    
    
        movieCard.innerHTML = `
    <div class="card m-2" >
            <img src="${'https://image.tmdb.org/t/p/w500' + currentMovieStack[i].poster_path}" alt="${currentMovieStack[i].title}" height="200" >
                <div class="card-body">
                    <h5 class="card-title"><span>${currentMovieStack[i].title}</span></h5>
                    <div class="rating-container">
                        <img src="./res/rating-icon.png" alt="">
                        <span>${currentMovieStack[i].vote_average}</span>
                    </div>
                    <button id="${currentMovieStack[i].id}" onclick="getMovieInDetail(this)" class="btn btn-primary"> Movie Details </button>
    
                    <button onclick="${actionForButton}(this)" class="add-to-favourite-button text-icon-button btn btn-danger" data-id="${currentMovieStack[i].id}" >
    
                        <span>${actionForButton}</span>
                    </button>
                </div>
    
    
    </div>
            `;
        movieCardContainer.append(movieCard); //appending card to the movie container view
    
      }
    }
    
    

// gets trending movies
function getTrandingMovies() {
    const tmdb = fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=cb213741fa9662c69add38c5a59c0110")
      .then((response) => response.json())
      .then((data) => {
        currentMovieStack = data.results;
        renderList("favourite");
      })
      .catch((err) => printError(err));
  }
  
  homeButton.addEventListener('click', getTrandingMovies);
  
  getTrandingMovies();
  addincurfav();
  

  // search box event listner check for any key press and search the movie according and show on web-page
searchBox.addEventListener('keyup', () => {
    let searchString = searchBox.value;
  
    if (searchString.length > 0) {
      let searchStringURI = encodeURI(searchString);
      const searchResult = fetch(`https://api.themoviedb.org/3/search/movie?api_key=cb213741fa9662c69add38c5a59c0110&language=en-US&page=1&include_adult=false&query=${searchStringURI}`)
        .then((response) => response.json())
        .then((data) => {
          currentMovieStack = data.results;
          renderList("favourite");
        })
        .catch((err) => printError(err));
    }
  })
  

// function to add movie into favourite section
function favourite(element) {
    let id = element.dataset.id;
    for (let i = 0; i < currentMovieStack.length; i++) {
      if (currentMovieStack[i].id == id) {
        let favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
  
        if (favouriteMovies == null) {
          favouriteMovies = [];
        }
  
        for (let j = 0; j < favouriteMovies.length; j++) {
          if (favouriteMovies[j].id == id) {
            showAlert(currentMovieStack[i].title + " Already added to favourite")
            return;
          }
        }
  
        favouriteMovies.unshift(currentMovieStack[i]);
        localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
  
        addincurfav();
        showAlert(currentMovieStack[i].title + " added to favourite")
        return;
      }
    }
  }
    
  