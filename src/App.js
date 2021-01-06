import './App.css';
import React, { Component } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

  state = {
    moviesArray: [],
    searchTerm: null,
    nominates: [],
    message: ""
  }

  changeHandler = event => { 
    this.setState({searchTerm: event.target.value})

    fetch(`http://www.omdbapi.com/?s=${event.target.value}&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(response => {
      if (response.Search) {
         this.setState({moviesArray: response.Search})
      } 
      else {
        this.setState({moviesArray: [] })
      }
    }) 
  }


  renderMovies = () => {
    return this.state.moviesArray.map(movie => 
      <> 
        <li accessKey={movie.imdbID}> 
            {movie.Title} 
            ({movie.Year}) &nbsp; 
            <button onClick={event => this.addNominant(event)}>Nominate</button>
        </li> 
        <br/>
      </>
    ) 
  }

  addNominant = event => { 
    // find movie by accessKey of the <li> element and add it to state.nominates
    let newNominant = this.state.moviesArray.find(movie => movie.imdbID === event.target.parentNode.accessKey)
    if (this.state.nominates.length > 4 ){
      this.setState({message: "Only 5 nominanations are allowed."})
    }

    else {
      this.setState({nominates: [...this.state.nominates, newNominant]
      })
      event.target.disabled=true
    }
  }

  removeNominant = event => {
    let filteredNominates =  this.state.nominates.filter(movie => movie.imdbID !== event.target.parentNode.accessKey)
    this.setState({nominates: filteredNominates,
                   message: ""
    })
  }

  renderNominates = () => {
    return this.state.nominates.map(movie => 
      <> 
        <li accessKey={movie.imdbID}> 
            {movie.Title} 
            ({movie.Year}) &nbsp; 
            <button onClick={event => this.removeNominant(event)}>Remove</button>
        </li> 
        <br/>
      </>
    ) 
  }


  render() { console.log("state", this.state.nominates)
    return (
      <>
        <div id="centered">
          <form>
           <input type="search" placeholder=" Movie Search" onChange={this.changeHandler}></input>
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
              <br/>
              <ul>{this.renderNominates()}</ul> 
              <p id="red">{this.state.message}</p>
          </div>


        </div>

      </>
    );
  }
}

export default App;

