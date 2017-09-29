
require('dotenv').config();

// Database setup
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;
// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});
// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("Connected to MongoDB!");
});

// Pull in Models from the `schema.js`
var Schema = require("./schema.js");

var BoardModel = Schema.BoardModel;
var PostModel = Schema.PostModel;

// Delete all boards from the database BoardModel.remove({}, function (err) {
    BoardModel.remove({}, function (err) {
        console.log(err);
    });

// Create some boards and Posts
const channel = new BoardModel({ name: 'Channel', description: "This is the main board channel" })


const post1 = new PostModel({ content: 'Little Post' })
const post2 = new PostModel({ content: 'Big Post' })
const post3 = new PostModel({ content: 'Blue Post' })

// Here we assign some Posts to each board.
const boards = [channel]
const posts = [post1, post2, post3]

boards.forEach((board) => {

    board.posts = posts

    board.save()
        .then((board) => {
            console.log(`${board.name} saved!`)
        })
        .catch((error) => {
            console.log(error)
        })
});

// Disconnect from database
db.close();