require("dotenv").config();

const express = require('express');
const path = require('path');
const request = require("request"); // "Request" library
// const cors = require("cors");
const querystring = require("querystring");
var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = "https://fierce-fjord-94321.herokuapp.com/callback"; // Your redirect uri

var generateRandomString = function (length) {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = "spotify_auth_state";
console.log(stateKey + "here");


const app = express();

// Serve static files from the React app
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', express.static(path.join(__dirname, 'public')))

app.get("/login", function (req, res) {
    console.log(process.env)
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    var scope =
        "user-top-read user-read-private user-read-email user-read-playback-state user-library-read playlist-read-private user-read-recently-played playlist-modify-public playlist-modify-private";
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        })
    );
});

app.get("/callback", function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    // if (state === null || state !== storedState) {
    //     res.redirect(
    //         "/#" +
    //         querystring.stringify({
    //             error: "state_mismatch"
    //         })
    //     );
    // } else {
    res.clearCookie(stateKey);
    var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: "authorization_code"
        },
        headers: {
            Authorization:
                "Basic " +
                new Buffer(client_id + ":" + client_secret).toString("base64")
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token,
                refresh_token = body.refresh_token;

            var options = {
                url: "https://api.spotify.com/v1/me",
                headers: { Authorization: "Bearer " + access_token },
                json: true
            };

            // use the access token to access the Spotify Web API
            request.get(options, function (error, response, body) {
                console.log(body);
            });

            // we can also pass the token to the browser to make requests from there
            // res.json({
            //     access_token: access_token,
            //     refresh_token: refresh_token
            // });
            res.redirect(
                "http://localhost:3000/#" +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                })
            );
        } else {
            // res.json({
            //     error: "invalid_token"
            // });
            res.redirect(
                "/#" +
                querystring.stringify({
                    error: "invalid_token"
                })
            );
        }
    });
    // }
});

app.get("/logout", function (req, res) {
    res.redirect("https://www.spotify.com/us/logout");
});

app.get("/refresh_token", function (req, res) {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization:
                "Basic " +
                new Buffer(client_id + ":" + client_secret).toString("base64")
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                access_token: access_token
            });
        }
    });
});


// Put all API endpoints under '/api'
// app.get('/api/passwords', (req, res) => {
//     const count = 5;

//     // Generate some passwords
//     const passwords = Array.from(Array(count).keys()).map(i =>
//         generatePassword(12, false)
//     )

//     // Return them as json
//     res.json(passwords);

//     console.log(`Sent ${count} passwords`);
// });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);