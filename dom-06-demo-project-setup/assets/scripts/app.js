const addMovieModal = document.getElementById("add-modal");
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
// const backdrop = document.body.firstElementChild;
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
// const cancelAddMovieButton = addMovieModal.lastElementChild.firstElementChild;
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
// const userInputs = addMovieModal.getElementsByTagName("input");
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
    if (movies.length === 0){
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const deleteMovie = (movieId) =>{
    let movieIndex = 0;
    for (const movie of movies){
        if(movie.id === movieId){
            break
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    cancelAddMovieButton.removeEventListener("click", closeMovieDeletionModal);

    cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
    confirmDeletionButton.addEventListener(
        "click",
        deleteMovie.bind(null, movieId)
    );
    // deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElemnt = document.createElement('li');
    newMovieElemnt.className = 'movie-element';
    newMovieElemnt.innerHTML = `
    <div class="movie-element__image">
     <img src = "${imageUrl}" alt= "${title}">
    </div>
    <div class="movie-element__info">
     <h2>${title}</h2>
     <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieElemnt.addEventListener('click', deleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElemnt);
};

const clearMovieInput = () => {
    for (const usrInputs of userInputs){
        usrInputs.value = '';
    };
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};



const toggleBackdrop = () => {
    backdrop.classList.toggle("visible"); 
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add("visible");
    toggleBackdrop();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput(); 
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid Values (Rating between 1 and 5)!');
        return;
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue ,
        image: imageUrlValue,
        rating: ratingValue
    };
    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title,newMovie.image,newMovie.rating);
    updateUI();
};



startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click",backdropClickHandler);
cancelAddMovieButton.addEventListener("click",cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click",addMovieHandler);