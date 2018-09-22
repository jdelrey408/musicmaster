import React, { Component } from 'react';
import './App.css';

//we want to map the array of tracks in the tracks object so we can display it.
//remember since we set this.props to tracks, then mapped tracks with a single track argument, our path to the json is now track.

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }

  playAudio(preview_url){
    let audio = new Audio(preview_url);
    if (!this.state.playing) {
    audio.play()
    this.setState(
      {
        playing: true,
        playingUrl: preview_url,
        audio
      })
    } else {
      if (this.state.playingUrl === preview_url) {
        this.state.audio.pause();
        this.setState({playing: false})
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: preview_url,
          audio
        })
      }
    }
  }

  render() {

    const { tracks } = this.props;

    return(
      <div>{tracks.map((track, trackItems) => {
          console.log('track', track);
          const trackImg = track.album.images[0].url;
       return(
         <div
           key={trackItems}
           onClick={() => this.playAudio(track.preview_url)}
           className='track'>
           <img
             src={trackImg}
             className='track-img'
             alt='track'
           />
           <div className='track-play'>
             <div className='track-play-inner'>
             {
                    this.state.playingUrl === track.preview_url
                      ? <span>| |</span>
                      : <span>&#9654;</span>
                  }
             </div>
           </div>
           <p className='track-text'>
           {track.name}
           </p>
         </div>
       )

      })}</div>
    )
  }

};//end of class

export default Gallery;
