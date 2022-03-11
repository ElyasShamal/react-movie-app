
import React, { useEffect, useState } from "react";

import Movie from './components/Movie';



const FEATURED_API ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";


const SEARCH_API ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


function App() {

const [ movies, setMovies ] = useState([]); 

const [searchTerm, setSearchTerm] = useState('');


  useEffect(()  => {
    fetch(FEATURED_API)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setMovies(data.results);
    });
  }, []);
    

   const handleOnSubmit = (e) => {
         e.preventDefault();

         if(searchTerm){
         fetch(SEARCH_API + searchTerm)
         .then((res) => res.json())
         .then((data) => {
           console.log(data);
           setMovies(data.results);
         });

         setSearchTerm('');
        }
   };


   const handeOnChange = (e) => {
     setSearchTerm(e.target.value);
   }

  return ( 
   
  <div>
    
    <header>
    <div className="main-header"><h1>Movies</h1></div>
       <form onSubmit={handleOnSubmit}>
         <input 
           classname="search"
             type="text" 
              placeholder="Search ..."
                Value={searchTerm}
                onChange={handeOnChange}
            ></input>
      
      </form>
    
  </header> 

  <div className="movie-container">
    {movies.length > 0 && movies.map((movie) => 
      <Movie key={movie.id} {...movie} />)}
  </div>
  </div>
  )
}

export default App;