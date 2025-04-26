function moviecard(movie, container){
    if(!movie.poster_path || !movie.title)return;
    const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';
   
     //fetch movie details
    const template=document.getElementById('movie-template');
    const clone= template.content.cloneNode(true);
    clone.querySelector('.moviePoster').src = imageUrl;
    clone.querySelector('.moviePoster').alt = movie.title;
    clone.querySelector('.movieTitle').textContent = movie.title;
    clone.querySelector('.movieDate').textContent = `Release Date: ${movie.release_date || 'N/A'}`;
    

    const movieElement = clone.querySelector('.movie');
    movieElement.setAttribute('data-id', movie.id);

    // Direct to movie details
    movieElement.addEventListener('click', () => {
        showDetails(movie.id);
});

container.appendChild(clone);
}
   
   async function fetchmovie() {
            
            const movieName=document.getElementById('search-input').value;
            const url =`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}`;

            try {
                document.getElementById('main-container').style.display = 'none';
                const res=await fetch(url,{
                headers:{
                    Authorization:`Bearer ${API_KEY}`,
                    'Content-Type':'application/json;charset=utf-8'
                        }
                    }
                );
    
                const data = await res.json();
                const container = document.getElementById('movies-container');
                container.innerHTML = '';
    
                if(data.results.length > 0){
                    data.results.forEach(movie =>moviecard(movie, container));
            
            } else {
                container.innerHTML = '<p>No results found.</p>';
            }
            } catch (error) {
            console.error('Error fetching movie:', error);
            }
        }

 async function fetchnowplayingmovie(){
            const url=`https://api.themoviedb.org/3/movie/now_playing`
        try {
            document.getElementById('main-container').style.display = 'none';
            const res=await fetch(url,{
            headers:{
                Authorization:`Bearer ${API_KEY}`,
                'Content-Type':'application/json;charset=utf-8'
            }
            }
            );

            const data = await res.json();
            const container = document.getElementById('movies-container');
            container.innerHTML = '';

            if(data.results.length > 0){
                data.results.forEach(movie => moviecard(movie, container));
            
        } else {
            container.innerHTML = '<p>No results found.</p>';
        }
       }  catch (error) {
        console.error('Error fetching movie:', error);
        }
        }
async function fetchtopmovie(){
        const url=`https://api.themoviedb.org/3/movie/top_rated`

    try {
        document.getElementById('main-container').style.display = 'none';
      
        const res=await fetch(url,{
        headers:{
            Authorization:`Bearer ${API_KEY}`,
            'Content-Type':'application/json;charset=utf-8'
        }
        }
        );
        const data = await res.json();
        const container = document.getElementById('movies-container');
        container.innerHTML = '';

        if(data.results.length > 0){
            data.results.forEach(movie =>moviecard(movie, container));
    } else {
        container.innerHTML = '<p>No results found.</p>';
    }
   }  catch (error) {
    console.error('Error fetching movie:', error);
    }
}

async function fetchupcomingmovie(){
    const url=`https://api.themoviedb.org/3/movie/upcoming`
try {
    const res=await fetch(url,{

    headers:{
        Authorization:`Bearer ${API_KEY}`,
        'Content-Type':'application/json;charset=utf-8'
    }
    }
    );

    const data = await res.json();
    const container = document.getElementById('main-container');



    if(data.results.length > 0){
        data.results.forEach(movie => moviecard(movie, container));
} else {
    container.innerHTML = '<p>No results found.</p>';
}
}  catch (error) {
console.error('Error fetching movie:', error);
}
}

        //Show details in alert foem
        function showalert(message){
            const alertbox= document.getElementById('alert-main');
            const alertmessage= document.getElementById('alert-message');
            const alertclose= document.getElementById('alert-close');
        

        alertmessage.textContent=message;
        alertbox.classList.remove('hidden')
        alertclose.addEventListener('click', () =>{
            alertbox.classList.add('hidden');
        });

        alertbox.addEventListener('click', (event) =>{
            if(event.target === alertbox){
                alertbox.classList.add('hidden');
            }
        });
    }

        //show movie details
        function showDetails(movieId) {
            const url = `https://api.themoviedb.org/3/movie/${movieId}`;
        
            fetch(url, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
                .then(res => res.json())
                .then(movie => {
                    showalert(`Title: ${movie.title}\nDescription: ${movie.overview}`);
                })
                .catch(error => console.error('Error fetching movie details:', error));
        }
        
        document.addEventListener('DOMContentLoaded', fetchupcomingmovie);
        document.getElementById('search-button').addEventListener('click', fetchmovie);
        document.getElementById('toprated-button').addEventListener('click', fetchtopmovie);
        document.getElementById('nowplaying-button').addEventListener('click', fetchnowplayingmovie);
    
   
