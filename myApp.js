require('dotenv').config();
let bodyParser = require("body-parser");
let express = require('express');
let app = express();



app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use("/public", express.static(__dirname + "/public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});


app.get("/name", (req, res) => {
  console.log(req.query);
  res.json({"name": req.query.first + " " + req.query.last})
});

app.post("/name", (req, res) => {
  console.log(req.body);
  res.json({"name": req.body.first + " " + req.body.last})
})


app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({
    echo: word
  });
  console.log(word)
})

var helloObjLow = {"message": "Hello json"};
var helloObjUp = {"message": "HELLO JSON"};
app.get('/json', function(req, res) {
	const mySecret = process.env['MESSAGE_STYLE']
	if(mySecret == "uppercase") {
		res.json(helloObjUp);
	} else {
		res.json(helloObjLow);
	}
});


if(process.env.MESSAGE_STYLE == "uppercase") {
  app.get("/json", (req, res) => {
    const message = "Hello Json";
    return res.send({
      "message": message.toUpperCase()
    })
  })
 } else {
  app.get("/json", (req, res) => {
    return res.send({
      "message": "Hello Json"
    })
  })
  }


app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
      res.send({
        time: req.time
      })
    }
);




















 module.exports = app;
