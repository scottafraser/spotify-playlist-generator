import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import record from "../images/record.jpeg";
import { withStyles } from "@material-ui/core/styles";

class Home extends Component {
  render() {
    const style = {
      background: "linear-gradient(120deg,#1DB954,#191414)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100vh",
      textDecoration: "none"
    };

    return (
      <div style={style}>
        <Card>
          <CardContent style={{ textAlign: "center" }}>
            <div>
              <h1>Lets make a playlist</h1>
              {/* <img
                src={record}
                alt="record"
                className="App-logo"
                style={{ height: 150 }}
              /> */}
            </div>
            <h4>Bored of your playlists? Make your own, anytime, anywhere</h4>
            <Button
              href="/dashboard"
              size="large"
              variant="contained"
              color="primary"
            >
              Let's Go!
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;
