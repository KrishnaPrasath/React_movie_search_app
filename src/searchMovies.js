import React , {useState} from 'react';

export default function SearchMovies() {

    const [ query , setQuery ] = useState('');
    const [ movies , setMovies ] = useState([]);
    const api_key = '#####################################';
    const searchMovies = async (event) => {
        event.preventDefault();
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            const movies_list = data.results; //Array of movie objects 
            const movies = [];
            movies_list.forEach(element => {
                const movie = {
                    id : element.id,
                    title : element.title, 
                    release_date : element.release_date,
                    rating : element.vote_average,
                    poster : element.poster_path,
                    ov : element.overview
                }   
                movies.push(movie);
            });
            setMovies(movies);
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
        <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">Movie Name</label>
        <input type="text" name="query" placeholder="i.e. Interstellar" className="input" value={query} onChange={(e)=>{setQuery(e.target.value)}}/>
        <button type="submit" className="button">Search</button>
        </form>
        <div className="card-list">
            { movies.filter(movie=> movie.poster).map(movie=>(
                <div className="card" key={movie.id}>
                    <img className="card--img"  
                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster}`} alt={movie.title + 'poster'}/>
                    <div className="card--content">
                    <h3 className="card--title">{movie.title}</h3>
                    <p><small>RELEASE DATE : {movie.release_date} </small></p>
                    <p><small>RATING : {movie.rating} </small></p>
                    <p className="card--desc">{movie.ov}</p>
                </div>
                </div>
                
            )) }
        </div>
        
        </>
    )
}
