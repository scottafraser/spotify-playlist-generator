import React, { Component } from "react";
import "./App.scss";

class SongCard extends Component {
  render() {
    if (!this.props.nowPlaying.artists) {
      return (
        <div id="nowPlayingCard">
          <p>Nothing Playling</p>
        </div>
      );
    } else {
      return (
        <div id="nowPlayingCard">
          <h4>Now Playing</h4>
          {this.props.nowPlaying.artists[0].name}
          <br />
          <br />
          <img src={this.props.nowPlaying.album.images[2].url} alt="song" />
          <br />
          <br />
          {this.props.nowPlaying.name}
        </div>
      );
    }
  }
}

export default SongCard;
