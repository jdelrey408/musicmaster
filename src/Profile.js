import React, { Component } from 'react';
import './App.css';

//if the json response is not null then we are going to update the property of artist
//changes the initial value of let artist to the new data filled value
//if (this.props.artist !== null) {
//artist = this.props.artist
//then update the values in the render
//let artist helps us render the content in the return statement
//line 27 map through a array of genres

//if not the last gnre add a space and a comma, otheerwise if last genrea dont add a comma
//

class Profile extends Component {

  render() {

    let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres: []};
    artist = this.props.artist !== null ? this.props.artist : artist;

    return (
      <div className='Profile'>
        <img
          className='profile-img'
          src={artist.images[0].url}
        />
      <div className='profile-info'>
        <div className='profile-name'>{artist.name}</div>
        <div className='profile-followers'>{artist.followers.total} followers</div>
        <div className='profile-genres'>{artist.genres.map((genre, genreArrayItems) =>{

          genre = genre !== artist.genres[artist.genres.length]-1 ? ` ${genre},` : ` & ${genre}.`;

          return(
            <span key={genreArrayItems}>{genre}</span>
          )
        })}</div>
        </div>
      </div>
    )
  }


};// end of class


export default Profile;
