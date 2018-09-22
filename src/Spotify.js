const clientId = '4751ada17ae542bdb0f8a2c63d37f076';
const redirectUri = 'http://musicmaster408.surge.sh/';
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
let accessToken;
let expiresIn;

const Spotify = {

getAccessToken() {

    if(accessToken) {
      return accessToken;
    } else if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/))
    {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

      window.setTimeout(() => accessToken = '', expiresIn*1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    }
    else
    {
      window.location = spotifyUrl;
    }
  }

}; //end of object

export default Spotify;
