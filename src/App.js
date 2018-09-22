import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import './App.css'
import Profile from './Profile';
import Spotify from './Spotify';
import Gallery from './Gallery';

//Line 67 only shows items if artist is not null. if null then it is hidden.

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
    this.search = this.search.bind(this);
  }


    search(query) {
      const BASE_URL = 'https://api.spotify.com/v1/search?';
      let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
      const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

      const accessToken = Spotify.getAccessToken();
      console.log(accessToken);
      return fetch(FETCH_URL,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(response => response.json()).then(json =>
        {
          const artist = json.artists.items[0];
          console.log('artist', artist);
          this.setState({artist});

          FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
          return fetch(FETCH_URL,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }).then(response => response.json())
              .then(json => {
              console.log('artist\'s top tracks:', json);
              const {tracks} = json;
              this.setState({tracks});
              })

        }
    )

  };//end of search

  render() {
    return (
      <div className='App'>

        <div className='App-title'>
          Music Master
        </div>

        <FormGroup>
          <InputGroup className='SearchBar'>
          <FormControl
            type='text'
            placeholder='Search for an Artist'
            value={this.state.query}
            onChange={event => {this.setState({query: event.target.value})}}
            onKeyPress={event => {
              if (event.key === 'Enter') {
              this.search();
              }
            } }
          />


            <Button className='Button' onClick={this.search}>Submit</Button>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
            <div>
              <Profile
                artist={this.state.artist}
              />
            <Gallery
              tracks={this.state.tracks}
            />
            </div>
          : <div></div>
        }
    
      </div>
    )
  }
}

export default App;
