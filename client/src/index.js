import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Home from "./components/Home";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import orange from "@material-ui/core/colors/orange";
import indigo from "@material-ui/core/colors/indigo";

// import ErrorBoundry from "./components/ErrorBoundry";

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange
  },
  status: {
    danger: "orange"
  },
  typography: {
    useNextVariants: true
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={App} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
