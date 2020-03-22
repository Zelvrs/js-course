let contentShow = 'list'; // 'list' atau 'detail'
let idSelected = null;
let currentPage = 1;
var tempScrollTop = 0;

$(window).on('scroll', function () {
    if (contentShow === 'list') {
        if ($(window).scrollTop() >= $(
            '.container-fluid').offset().top + $('.container-fluid').
                outerHeight() - window.innerHeight) {

            currentPage = currentPage + 1;
            getMovieLists();
            showContent();
        }
    }
});


const elMovieListContent = document.querySelector('#movie-list .content');

function showContent() {
    if (contentShow === 'list') {
        document.getElementById('movie-list').classList.remove('d-none');
        document.getElementById('movie-detail').classList.add('d-none');

        // remove videos
        let elVideos = document.querySelector('.movie-detail-videos');
        elVideos.innerHTML = '';
    } else {
        document.getElementById('movie-list').classList.add('d-none');
        document.getElementById('movie-detail').classList.remove('d-none');

        // tampilkan loader
        document.querySelector('.movie-detail-loading').classList.remove('d-none');
        document.querySelector('.movie-detail').classList.add('d-none');

        const onSuccess = function (movie) {
            // hide loader


            // parsing data movie
            document.querySelector('.movie-detail-title').innerText = movie.title;
            document.querySelector('.movie-detail-overview').innerText = movie.overview;
            document.querySelector('.movie-detail-poster').src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            document.querySelector('.movie-detail-poster').alt = movie.title;

            getMovieVideos(movie.id, function (videos) {
                let elVideos = document.querySelector('.movie-detail-videos');
                elVideos.innerHTML = '';

                const promises = [];

                videos.forEach(video => {

                    let iFrame = document.createElement('iframe');
                    iFrame.width = '100%';
                    iFrame.height = '315';
                    iFrame.src = `https://www.youtube.com/embed/${video.key}`;
                    iFrame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
                    iFrame.style = 'border: 0;';

                    

                    let promise = new Promise((resolve, reject) => {
                        iFrame.addEventListener('load', function (e) {
                            resolve();
                        })
                    })

                    promises.push(promise);

                    let col = document.createElement('div');
                    col.classList.add('col-12');
                    col.classList.add('col-md-6');

                    col.append(iFrame)

                    elVideos.append(col);

                });

                Promise.all(promises).then(() => {
                    document.querySelector('.movie-detail-loading').classList.add('d-none');
                    document.querySelector('.movie-detail').classList.remove('d-none');
                })

            });


        };


        getMovieDetail(idSelected, onSuccess);


    }
}

function getCard(movie) {
    const image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    let div = document.createElement('div');
    div.classList.add('col');
    div.classList.add('mb-4');

    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('h-100');
    card.classList.add('shadow-sm');
    card.classList.add('position-relative');

    let img = document.createElement('img');
    img.src = image;
    img.alt = movie.title;
    img.classList.add('card-img-top');

    card.append(img);

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.classList.add('text-center');
    cardBody.innerHTML = `<h5 class="card-title">${movie.title}</h5>`;
    cardBody.innerHTML += `<p>${movie.overview.split(' ').filter((word, index) => index <= 10).join(' ')} ...</p>`;

    let a = document.createElement('a');
    a.classList.add('btn');
    a.classList.add('btn-primary');
    a.href = '#';
    a.innerText = 'Detail';

    a.addEventListener('click', function (e) {
        e.preventDefault();

        contentShow = 'detail';
        idSelected = movie.id;

        showContent();
    });

    cardBody.append(a);

    card.append(cardBody);

    div.append(card);

    return div;
}

document.querySelector('.navbar-brand').addEventListener('click', function (e) {
    e.preventDefault();

    contentShow = 'list';
    showContent();
});

function getMovieLists() {

    let movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=b243dc06bac1b60355d79c1938f4da27&language=en-US&page=${currentPage.toString()}`;

    fetch(movieUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const movies = data.results;

            movies.forEach(movie => {
                elMovieListContent.append(getCard(movie));
            });
        });
}

function getMovieDetail(id, onSuccess) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=b243dc06bac1b60355d79c1938f4da27&language=en-US`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (typeof onSuccess === 'function') {
                onSuccess(data);
            }
        });
}

function getMovieVideos(id, onSuccess) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=b243dc06bac1b60355d79c1938f4da27&language=en-US`;

    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (typeof onSuccess === 'function') {
                onSuccess(data.results.filter(video => video.site === 'YouTube'));
            }
        });
}



// eksekusi pertama
getMovieLists();
