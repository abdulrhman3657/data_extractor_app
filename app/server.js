const express = require('express');
const ytdl = require('ytdl-core');
const cors = require("cors");
const path = require("path");

const port = 3000;

const app = express();

app.set('view-engine', 'ejs');

app.use(express.static(__dirname + '/views'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));

app.get('/', (req, res) => {

  console.log(`${req.method}: ${req.path}`);

  res.render('Home.ejs');

})

app.post('/', (req, res) => {

    console.log(`${req.method}: ${req.path}`);

    const url = req.body.url_name;

    ytdl.getBasicInfo(url).then((info) => {

        res.render('Results.ejs', {
          title: info.videoDetails.title,
          viewCount: info.videoDetails.viewCount,
          likes: info.videoDetails.likes,
          description: info.videoDetails.description,
          thumbnail: info.videoDetails.thumbnails[0].url
         });
         
    }).catch((err) => {
      console.error(err);
    });

})

app.listen(port, () => {
  console.log(`server runnnig on http://localhost:${port}`)
})