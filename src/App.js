import './App.css';
import React, { Component } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {

  state = {
    moviesArray: [],
    searchTerm: null,
    nominations: [],
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
        <div id="movie-card"> 
            <img src={movie.Poster} alt="poster"></img> <br/>
            <div>
              <br/>
              <p>{movie.Title}</p>
              <p>({movie.Year})</p> 
                  {this.alreadyNominated(movie.imdbID) ?     
                      <button id={movie.imdbID} onClick={event => this.addNomination(event)} disabled >Nominate</button>
                      :                     
                      <button id={movie.imdbID} onClick={event => this.addNomination(event)}>Nominate</button>
                  }
            </div>
        </div> 
    ) 
  }

  alreadyNominated = id =>{
          // chick if the movie is already nominated (for rendering active or disabled "Nominate" button)
    let nominatedMovie = this.state.nominations.filter(movie => movie.imdbID === id)
      if (nominatedMovie.length > 0 ) { 
        return true
      } 
      else{
        return false
      }    
  }


  addNomination = event => {   
          // find movie by accessKey of the <li> element and add it to state.nominations
    let newNomination = this.state.moviesArray.find(movie => movie.imdbID === event.target.id)
    if (this.state.nominations.length > 4 ){
      this.setState({message: "Only 5 nominanations are allowed."})
    }
    else {
      this.setState({nominations: [...this.state.nominations, newNomination]
      })

      // option for disable "Nominate" button
      // event.target.disabled=true
    }
  }

  removeNomination = event => {
    let filteredNominations =  this.state.nominations.filter(movie => movie.imdbID !== event.target.id)
    this.setState({nominations: filteredNominations,
                   message: ""
    })

        // turned "Nominate" buttom back to active (in the left container)
    let div = document.querySelector("#left-container")   
    let button = div.querySelector(`#${event.target.id}`) 
    if (button){
       button.disabled=false
    }
}

  renderNominations = () => {
    return this.state.nominations.map(movie => 
        <div id="movie-card"> 
          <img src={movie.Poster} alt="poster"></img>
          <div>
            <br/>
            <p>{movie.Title}</p> 
            <p>({movie.Year})</p>
            <button  id={movie.imdbID} onClick={event => this.removeNomination(event)}>Remove</button>
          </div> 
        </div>
    ) 
  }


  render() { console.log("state", this.state.nominations)
    return (
      <div id="main">
        <div id="centered">
          <form>
           <input type="search" placeholder=" Movie Search" onChange={this.changeHandler}></input>
          </form>
        </div>

        <div id="flex">
          <div id="left-container">
              <h4>Results for "{this.state.searchTerm}" </h4>
              <br/>
              {this.renderMovies()}               
          </div>

          <div id="right-container">
              <h4> Nominations</h4>
              <br/>
              {this.renderNominations()}
              <p id="red">{this.state.message}</p>
          </div>


        </div>

      </div>
    );
  }
}

export default App;

