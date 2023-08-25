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
    
  