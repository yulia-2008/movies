import './App.css';
import React, { Component } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

  state = {
    moviesArray: [],
    searchTerm: null
  }

  changeHandler = event => { 
    this.setState({searchTerm: event.target.value})

    fetch(`http://www.omdbapi.com/?s=${event.target.value}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(response => {
      if (response.Search) 
      {console.log("fetch", response); this.setState({moviesArray: response.Search})
      } 
      else {this.setState({moviesArray: [] })
      }
    }) 
  }


  renderMovies = () => {
   return this.state.moviesArray.map((movie) => 
      <> 
        <li> {movie.Title} 
            ({movie.Year}) &nbsp; 
            <button onClick={this.clickHandler}>Nominate</button>
        </li> 
        <br/>
      </>) 
  }


  render() { console.log("state", this.state.moviesArray)
    return (
      <>
        <div id="centered">
          <form>
           <input type="search" placeholder="Movie Search" onChange={this.changeHandler}></input>
          </form>
        </div>

        <div id="flex">
          <div id="left-container">
                <h4 id="center">Results for "{this.state.searchTerm}" </h4>
                <br/>
                <ul>{this.renderMovies()}</ul>               
          </div>

          <div id="right-container">
           <h4> Nominations</h4>
          </div>


        </div>

      </>
    );
  }
}

export default App;

