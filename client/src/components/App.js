import React, { Component } from "react";
import "./App.scss";
import { connect } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import NavBar from "./NavBar";
import PropTypes from "prop-types";
import * as actions from "../actions/items";
import PlaylistSelect from "./PlaylistSelect";
import Card from "./Card";
import ArtistListChip from "./ArtistListChip";
import PlaylistStyle from "./PlaylistStyle";
import GenreChips from "./GenreChips";
import Paper from "@material-ui/core/Paper";
import Select from "./Select";

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistList: [],
      genreList: [],
      currentArtist: {},
      passwords: []
    };
  }

  componentDidMount() {
    const jwt = window.sessionStorage.getItem("jwt");
    let token = "";
    if (jwt) {
      token = jwt;
    } else {
      document.title = "Spotify Shuffle";
      var hashParams = {};
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      e = r.exec(q);
      while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
      }
      token = hashParams.access_token;
    }
    if (token) {
      window.sessionStorage.setItem("jwt", token);
      window.sessionStorage.setItem("expiryToken", Date());
      spotifyApi.setAccessToken(token);
    }
    spotifyApi.getMe().then(response => {
      this.props.setUser(response);
      let userLoggedIn = token ? true : false;
      this.props.loggedIn(userLoggedIn);
    });
  }

  updateInput = e => {
    this.setState({
      genre: e.target.value
    });
  };

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.props.getSong(response);
    });
  }

  getPlaylists() {
    spotifyApi.getUserPlaylists().then(response => {
      this.props.getPlaylists(response);
    });
  }

  createGenrePlaylist = () => {
    this.findGenreSeeds();
    let genre = this.props.genre;
    spotifyApi.getRecommendations({ seed_genres: genre }).then(response => {
      this.props.createGenrePlaylist(response);
    });
  };

  findGenreSeeds = () => {
    spotifyApi
      .getAvailableGenreSeeds()
      .then(response => this.setState({ genreList: response.genres }));
  };

  createArtistPlaylist = e => {
    e.preventDefault();
    spotifyApi.searchArtists(this.props.artist).then(response => {
      if (response.artists.items[0] === undefined) {
        alert("no artists found");
      } else {
        let artistId = response.artists.items[0].id;
        let foundArtists = response.artists.items;
        this.setState({
          artistList: foundArtists
        });
        let type = "artist";
        this.getRecommendations(artistId, type);
      }
    });
  };

  createSongList = songId => {
    let type = "song";
    this.getRecommendations(songId, type);
  };

  getRecommendations = (Id, type) => {
    if (type === "artist") {
      spotifyApi.getRecommendations({ seed_artists: Id }).then(response => {
        this.props.createNewArtistPlaylist(response);
      });
    } else {
      spotifyApi.getRecommendations({ seed_tracks: Id }).then(response => {
        this.props.createNewArtistPlaylist(response);
      });
    }
  };

  updateArtist = newArtist => {
    let artistId = newArtist;
    spotifyApi.getRecommendations({ seed_artists: artistId }).then(response => {
      this.props.createNewArtistPlaylist(response);
    });
  };

  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.props.getSong({
        name: response.item.name,
        albumArt: response.item.album.images[2].url
      });
    });
  };

  render() {
    return (
      <Paper>
        <div className="topInfo">
          {/* <div>
            <PlaylistStyle />
          </div> */}
          <div>
            {this.props.isLoggedIn && (
              <PlaylistSelect
                createGenreList={this.createGenrePlaylist}
                createArtistList={this.createArtistPlaylist}
              />
            )}
          </div>
          <div className="artistChips">
            {this.state.artistList.map((artist, index) => (
              <ArtistListChip
                key={index}
                chipArtist={artist}
                createArtistList={this.updateArtist}
              />
            ))}

            {this.state.genreList.map((genre, index) => (
              <GenreChips
                key={index}
                chipGenre={genre}
                createGenreList={() => this.createGenrePlaylist}
              />
            ))}
            <Select />
          </div>
        </div>
        <div className="playlists">
          {this.props.createPlaylistTracks.map(track => (
            <Card
              track={track}
              key={track.id}
              id={track.id}
              name={track.name}
              artist={track.artist}
              album={track.album.images[1].url}
              createSongList={this.props.createSongList}
            />
          ))}
        </div>
      </Paper>
    );
  }
}

App.propTypes = {
  thisUser: PropTypes.object,
  setUser: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  showArtistSuggestions: PropTypes.bool,
  createGenrePlaylist: PropTypes.func,
  createArtistPlaylist: PropTypes.func,
  createSongList: PropTypes.func
};

const mapStateToProps = state => {
  return {
    genre: state.setGenre,
    artist: state.setArtist,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    createPlaylistTracks: state.createPlaylistTracks,
    userPlaylists: state.userPlaylists,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: response => dispatch(actions.setUser(response)),
    createGenrePlaylist: response =>
      dispatch(actions.userCreatePlaylist(response)),
    createNewArtistPlaylist: response =>
      dispatch(actions.userCreatePlaylist(response)),
    loggedIn: bool => dispatch(actions.userIsLoggedIn(bool)),
    getSong: response => dispatch(actions.getUserCurrentSong(response)),
    getPlaylists: response => dispatch(actions.getUserPlaylists(response))
    // goToHome: response => dispatch(navActions.routeToHome(response)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// if (this.props.artistList === undefined) {
// }
// if (this.props.hasErrored) {
//   return <p>Sorry! There was an error loading the items</p>;
// }
// if (this.props.isLoading) {
//   return <p>Loading…</p>;
// }

// getRecentTracks() {

//   spotifyApi.getMyRecentlyPlayedTracks().then(response => {
//     this.setState({ savedTracks: response.items });
//   });
// }

/* recent tracks
        {this.state.savedTracks.map((song, index) => <li key={index}>
            {song.track.artists[0].name}
            <br />
            {song.track.album.name}
            <br />
            <img src={song.track.album.images[1].url} />
          </li>)} */

//   <PlaylistSelect createGenreList={this.createGenrePlaylist} createArtistList={this.createArtistPlaylist} /> * /}
//  this.props.isLoggedIn && (
//   <NowPlaying
//   isLoggedIn={this.props.isLoggedIn}
//   getNowPlaying={this.props.getSong}
//   nowPlaying={this.props.nowPlaying}
// />

// <button onClick={() => this.getPlaylists()}>
//   Check User Playlists
//  </button>
