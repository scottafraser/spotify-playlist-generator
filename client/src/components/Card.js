import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

function MediaCard(props) {
  console.log(props.track);
  const { classes } = props;
  const track = props.track;
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
        <Button size="small" color="primary">
          Make Playlist on Song
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string
};

export default withStyles(styles)(MediaCard);
