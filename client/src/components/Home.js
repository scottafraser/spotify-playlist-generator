import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

class Home extends Component {
  render() {
    const style = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100vh",
      textDecoration: "none"
    };

    const { classes } = this.props;

    return (
      <div style={style}>
        <h1>Lets make a playlist</h1>
        <h4>Bored of your playlist? Make your own, anytime, anywhere</h4>

        <Button
          href="/dashboard"
          size="large"
          variant="contained"
          color="primary"
        >
          Let's Go!
        </Button>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;
