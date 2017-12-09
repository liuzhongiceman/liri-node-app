
var action = process.argv[2];
var value = process.argv[3];
var Twitter = require('twitter');
var keys = require('./keys.js');
var request = require('request');
var fs = require('fs');
var spotify = require('node-spotify-api');
var request = require('request');
var client = new Twitter({
  consumer_key: 'BwA98Q475G4ISUScpGkldIfQB',
  consumer_secret: 'NreU6NlBPOywpYSSF587I7Q6BgU3EQRyJaDQ01KgBReMDI3VFN',
  access_token_key: '708766463016894464-e5P6aO80zfQH7I48mUDCH6r6pELGU3J',
  access_token_secret: '64NrR9BtpKQ8VAAVXlagvcKLN8z1sxY2nhhaxTGALq8jQ',
});

var params = {
    screen_name: '888iceman888',
    count: 20
    }

switch (action) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThis(value);
        break;
    case 'movie-this':
        omdbThis(value);
        break;
    case 'do-what-it-says':
        random();
        break;
}

// my-tweets function
function myTweets() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {
            fs.appendFile('terminal.log', ('=============== LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS:\r\n$: ' + process.argv + '\r\n \r\nDATA OUTPUT:\r\n'), function(err) {
                if (err) throw err;
            });
            console.log(' ');
            console.log('Last 20 Tweets:')
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1;
                console.log(' ');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
                // fs.appendFile('log.txt', ('=============== TWEET LOG ENTRY BEGIN ===============\r\n' + Date()+'\r\n'+number +'\r\n'+ 'Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + ' \r\n'+'=============== TWEET LOG OUT  ===============\r\n'), function(err) {
                //     if (err) throw err;
                // });
                 fs.appendFile('log.txt', ('\r\n'+number +'\r\n'+ 'Tweet: ' + tweets[i].text + '\r\nCreated at: ' + tweets[i].created_at + ' \r\n'), function(err) {
                    if (err) throw err;
                });
            }
           
        }
    });
} // end myTweets function

function spotifyThis(value) {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
    id: 'b86246ce99b94e9dada18b6977451938' ,
    secret: '8827baa134cc4afc915a3763bc0e4c8a'
    });

    if (value == null) {
        value = 'computer love';
    }
    spotify.search({ type: 'track', query: value }, function(err,data) {
    if (err) {
        return console.log('Error occurred: ' + err);
        }
        console.log('Song:'+value);
        console.log('Artists:'+data.tracks.items[0].artists[0].name); 
        console.log('Preview Link:'+data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);
        fs.appendFile('log.txt', ('=============== MUSIC LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS: ' + process.argv + '\r\nDATA OUTPUT:\r\n' + 'Song:'+value + '\r\nArtists:'+data.tracks.items[0].artists[0].name + '\r\nPreview Link:'+data.tracks.items[0].preview_url + '\r\nAlbum: ' + data.tracks.items[0].album.name +  '\r\n =============== MUSICS LOG ENTRY END ===============\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        });
   
} // end spotifyThis function

// omdbThis function
function omdbThis(value) {
    if (value == null) {
        value = 'wargames';
    }
    console.log(value);

    request("http://www.omdbapi.com/?t="+value+"&apikey=a19d3d6d", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            
            jsonBody = JSON.parse(body);
            console.log(jsonBody);
            console.log('Title: ' + jsonBody.Title);
            console.log('Year: ' + jsonBody.Year);
            console.log('IMDb Rating: ' + jsonBody.imdbRating);
            console.log('Country: ' + jsonBody.Country);
            console.log('Language: ' + jsonBody.Language);
            console.log('Plot: ' + jsonBody.Plot);
            console.log('Actors: ' + jsonBody.Actors);
            console.log('Rotten Tomatoes Rating: ' + jsonBody.Ratings[1].Value);
            console.log(' ');
            fs.appendFile('log.txt', ('=============== MOVIES LOG ENTRY BEGIN ===============\r\n' + Date() + '\r\n \r\nTERMINAL COMMANDS: ' + process.argv + '\r\nDATA OUTPUT:\r\n' + 'Title: ' + jsonBody.Title + '\r\nYear: ' + jsonBody.Year + '\r\nIMDb Rating: ' + jsonBody.imdbRating + '\r\nCountry: ' + jsonBody.Country + '\r\nLanguage: ' + jsonBody.Language + '\r\nPlot: ' + jsonBody.Plot + '\r\nActors: ' + jsonBody.Actors + '\r\nRotten Tomatoes Rating: ' + jsonBody.tomatoRating + '\r\nRotten Tomatoes URL: ' + jsonBody.tomatoURL + '\r\n =============== MOVIES LOG ENTRY END ===============\r\n \r\n'), function(err) {
                if (err) throw err;
            });
        }
    });
} //end omdbThis function

// random function
function random() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            console.log(dataArr);
            if (dataArr[0] === 'spotify-this-song') {
                spotifyThis(dataArr[1]);
            }
            if (dataArr[0] === 'omdb') {
                omdbThis(dataArr[1]);
            }
        }
    });
} // end doWhatItSays function