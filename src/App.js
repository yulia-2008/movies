import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

  state = {
    moviesArray: null,
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
    }) 
  }


  render() { console.log("state", this.state.moviesArray)
    return (
      <div>
        <form>
          <input type="search" placeholder="Movie Search" onChange={this.changeHandler}></input>
        </form>

        <div>
          {this.state.moviesArray ?
            <p>Results for "{this.state.searchTerm}" </p>
            :
            null
          }
        </div>

      </div>
    );
  }
}

export default App;

