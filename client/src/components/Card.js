import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import * as itemActions from "../actions/items";
import compose from "recompose/compose";

const styles = {
  card: {
    maxWidth: 300,
    margin: "1%"
  },
  media: {
    height: 300,
    width: 300
  }
};

//need to build function to resize image depending on window size

// handleSongClick(id => {
//   this.props.createSongList(id);
// });

function MediaCard(props) {
  const { classes } = props;
  const track = props.track;
  console.log(props);
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.album}
          title={props.key}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
            <br />
            <i>{track.artists[0].name}</i>
          </Typography>
          <Typography component="p">{props.artist}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Replace
        </Button> */}
        {/* <Button
          size="small"
          color="primary"
          // onClick={() => props.createSongList(0)}
        >
          Make Playlist on Song
        </Button> */}
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string
};

const mapStateToProps = state => {
  return {
    genre: state.genre,
    artist: state.artist,
    showHome: state.showHome,
    nowPlaying: state.nowPlaying
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSong: response => dispatch(itemActions.getUserCurrentSong(response))
  };
};

export default compose(
  withStyles(styles, { name: "Card" }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MediaCard);
