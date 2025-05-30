(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const currentPage = window.location.pathname;

    window.addEventListener('load', function() {

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            responseContainer.innerHTML = '';
            searchedForText = searchField.value;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2UzNzNmMjI0MWZmZTZlNmVkOTNhMDJmNmQzNmE1ZSIsInN1YiI6IjY1ZDczYWI1NWNhNzA0MDE2MzBkYThiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TduGChLj8cUaYlQ8h3YcbuwmO0Q8sO0yFEkQ-h7CzRU'
                }
            };
            
            // fetch movies with search on index.html
            if (currentPage.endsWith('index.html')) {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${searchedForText}&include_adult=false&language=en-US&page=1`, options)
                .then(response => response.json())
                .then(addMovie)
                .catch(err => console.error(err));  
               // fetch persons witch search on person.html 
            } else if (currentPage.endsWith('person.html')) {
                fetch(`https://api.themoviedb.org/3/search/person?query=${searchedForText}&include_adult=false&language=en-US&page=1`, options)
                .then(response => response.json())
                .then(addPerson)
                .catch(err => console.error(err));
            }
        });

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2UzNzNmMjI0MWZmZTZlNmVkOTNhMDJmNmQzNmE1ZSIsInN1YiI6IjY1ZDczYWI1NWNhNzA0MDE2MzBkYThiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TduGChLj8cUaYlQ8h3YcbuwmO0Q8sO0yFEkQ-h7CzRU'
            }
        };

        // fetch the popular movies
        if (currentPage.endsWith('popular.html')) {
            fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US`, options)
                .then(response => response.json())
                .then(addMovie)
                .catch(err => console.error(err));
                // fetch the upcoming movies
        } else if (currentPage.endsWith('upcoming.html')) {
            fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, options)
                .then(response => response.json())
                .then(addMovie)
                .catch(err => console.error(err));
        } else if (currentPage.endsWith('favorites.html')) {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            if (favorites.length === 0) {
                responseContainer.innerHTML = '<p>No favorite movies added yet.</p>';
            } else {
                favorites.forEach(movieId => {
                     //fetch your favorite movies
                    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
                        .then(response => response.json())
                        .then(movie => addMovie({ results: [movie] }))
                        .catch(err => console.error(err));
                });
            }
        } else if (currentPage.endsWith('random.html')){
            min = 1;
            max = 40;
            randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
            //fetch the random movie
            fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&sort_by=popularity.desc&page=${randomInt}`, options)
                .then(response => response.json())
                .then(addRandomMovie)
                .catch(err => console.error(err));
            console.log(randomInt);
        }

        // add randommovie
        function addRandomMovie(data) {
            console.log(data);
        
            // Randomly select one movie from the data.results array
            let randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
            console.log(randomMovie);
        
            let div = document.createElement('div');
            div.classList.add('moviegameclass');
        
            let img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${randomMovie.backdrop_path}`;
            img.alt = randomMovie.title || randomMovie.name;
            img.addEventListener('click', function() {
                openModal(randomMovie);
            });
            div.appendChild(img);

            let h3 = document.createElement('h3');
            h3.innerText = randomMovie.title || element.name;
            h3.classList.add('randomTitle')
            div.appendChild(h3);
        
            let date = document.createElement('p');
            date.innerText = randomMovie.release_date;
            date.classList.add('randomDate')
            div.appendChild(date);
        
            // Create the Re-Roll button
            let rerollButton = document.createElement('a');
            rerollButton.href = "random.html";
            rerollButton.classList.add('moviegameclass', 'mdc-button', 'mdc-button--touch', 'reroll');
        
            let rerollLabel = document.createElement('span');
            rerollLabel.classList.add('mdc-button__label');
            rerollLabel.innerText = 'Re-Roll';
            rerollButton.appendChild(rerollLabel);
        
            div.appendChild(rerollButton);
        
            responseContainer.appendChild(div);
        }
        
        // add movie
        function addMovie(data) {
            console.log(data);
        
            data.results.forEach(element => {
                let div = document.createElement('div');
                div.classList.add('movieclass');
        
                let img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
                img.alt = element.title || element.name;
                img.addEventListener('click', function() {
                    openModal(element);
                });
                div.appendChild(img);
        
                let h3 = document.createElement('h3');
                h3.innerText = element.title || element.name;
                div.appendChild(h3);

                let order = document.createElement('div');
                order.classList.add('order');

                let score = document.createElement('h2');
                score.classList.add('scoreText')
            

                let voteAverage = parseFloat(element.vote_average);
                score.innerText = voteAverage.toFixed(1);
                if(voteAverage == 0){
                    score.innerText = "?";
                }
                order.appendChild(score); 

                const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                const isFavorite = favorites.includes(element.id.toString());

                const favButton = document.createElement('button');
                favButton.innerHTML = isFavorite ? 
                `<svg class="heartFull" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1da1f2" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>` : 
                `<svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1da1f2" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>`;

                favButton.addEventListener('click', function() {
                    const movieId = element.id.toString();
                    toggleFavorite(movieId, favButton);
                });
                order.appendChild(favButton);

                div.appendChild(order);
        
                let date = document.createElement('p');
                date.innerText = element.release_date;
                div.appendChild(date);

                responseContainer.appendChild(div);
            });
        }

        // add person
        function addPerson(data) {
            console.log(data);
        
            data.results.forEach(element => {
                let div = document.createElement('div');
                div.classList.add('movieclass');
        
                let img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${element.profile_path}`;
                img.alt = element.title || element.name;
                img.addEventListener('click', function() {
                    openModalPerson(element);
                });
                div.appendChild(img);
        
                let h3 = document.createElement('h3');
                h3.innerText = element.title || element.name;
                div.appendChild(h3);

                responseContainer.appendChild(div);
            });
        }

        // toggles favorites
        function toggleFavorite(movieId, button) {
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (favorites.includes(movieId)) {
                favorites = favorites.filter(id => id !== movieId);
                button.innerHTML = `<svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1da1f2" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>`;
            } else {
                favorites.push(movieId);
                button.innerHTML = `<svg class="heartFull" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1da1f2" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`;
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }

        // modal for the movie
        function openModal(movie) {
            let modal = document.getElementById('myModal');
            let modalImg = document.getElementById('modalImg');
            let modalTitle = document.getElementById('modalTitle');
            let modalDate = document.getElementById('modalDate');
            let modalOverview = document.getElementById('modalOverview');
        
            modalImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            modalTitle.innerText = movie.title || movie.name;
            modalDate.innerText = movie.release_date;
            modalOverview.innerText = movie.overview;
        
            modal.style.display = "block";
            document.body.style.overflow = 'hidden';  // Disable scrolling
        }

        // modal for the person
        function openModalPerson(person) {
            let modal = document.getElementById('myModal');
            let modalImg = document.getElementById('modalImg');
            let modalTitle = document.getElementById('modalTitle');
            let knownForContainer = document.getElementById('knownForContainer');

            knownForContainer.innerHTML = '';
        
            modalImg.src = `https://image.tmdb.org/t/p/w500${person.profile_path}`;
            modalTitle.innerText = person.title || person.name;

            if (person.known_for && Array.isArray(person.known_for)) {
                person.known_for.forEach(movie => {
                    addMovieToContainer(movie, knownForContainer);
                });
            }

            modal.style.display = "block";
            document.body.style.overflow = 'hidden';  // Disable scrolling
        }

        // Known for movies by moviestar
        function addMovieToContainer(movie, container) {
            let movieDiv = document.createElement('div');
            movieDiv.className = 'movie';
        
            let movieImg = document.createElement('img');
            movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            movieImg.alt = movie.title || movie.name;
        
            movieDiv.appendChild(movieImg);
            container.appendChild(movieDiv);
        }

        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName("close")[0];
       
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            let modal = document.getElementById('myModal');
            modal.style.display = "none";
            document.body.style.overflow = '';  // Enable scrolling
        }
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            let modal = document.getElementById('myModal');
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = '';  // Enable scrolling
            }
        }
    });
})();
