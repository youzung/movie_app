import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

// const MovieTitles =[
//   "Toy Story 4",
//   "Frozen 2",
//   "Zootopia",
//   "Inside Out"
// ]

// const MovieImages =[
//   "https://www.joblo.com/assets/images/joblo/posters/2019/02/Dyow9RgX4AElAGN.jpg",
//   "https://i.pinimg.com/236x/a7/95/cf/a795cfabc3f07fd25effc0e9da0e50d0.jpg",
//   "https://images-na.ssl-images-amazon.com/images/I/91yoxCuaxZL._SX450_.jpg",
//   "https://images-na.ssl-images-amazon.com/images/I/91JyhM8h8gL._SX450_.jpg"

// ]


class App extends Component {
  
  //Render : componentWillMount() -> render() -> componentDidMount()
  //Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()
  
  state ={}

  componentDidMount(){
    this._getMovies();
  }

  _renderMovies = () => {
      const movies = this.state.movies.map((movie) => {
          
          return <Movie
           title={movie.title} 
           poster={movie.medium_cover_image}
           key={movie.id} 
           genres={movie.genres}
           synopsis={movie.synopsis}/>
        })
      return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    this.setState({
      movies
    })
  }

  _callApi =() => {
    return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=download_count')
    .then(potato => potato.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading...' }
      </div>
    );
  }
}

export default App;
