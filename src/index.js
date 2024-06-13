const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const crypto = require("crypto");
const { constants } = require("buffer");

const app = express();

const PORT = 8888;

let db;

app.use(express.static(path.join(__dirname, "./../public/")));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "./../public/", "index.html"));
});

app.post("/sendstr", (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    console.log(data);
    res.status(200).send("Получено содержимое инпута");
  });
});

app.post("/upload_card", (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    const data_obj = JSON.parse(data);
    const hash = crypto
      .createHash("sha256")
      .update(data_obj.name)
      .digest("hex");
    let tags = "";
    data_obj.tags.forEach((tag, index) => {
      if (index != data_obj.tags.length - 1) {
        tags += tag + ";";
      } else {
        tags += tag;
      }
    });

    db.run(
      "INSERT INTO cards_layout (link, name, description, tags, hash) VALUES(?, ?, ?, ?, ?)",
      [data_obj.link, data_obj.name, data_obj.description, tags, hash],
      (err) => {
        if (err) {
          console.log(err);
          res.status(400).send("Карточки не загружены");
        } else {
          res.status(200).send("Карточка загружена");
        }
      }
    );
  });
});

app.get("/get_cards", (req, res) => {
  db.all("SELECT * FROM cards_layout", (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send();
    } else {
      let arrCards = [];
      data.forEach((card) => {
        let tagsArr = card.tags.split(";");
        let newCard = {
          name: card.name,
          link: card.link,
          description: card.description,
          tags: tagsArr,
          hash: card.hash,
        };

        arrCards.push(newCard);
      });
      res.status(200).send(arrCards);
    }
  });
});

app.listen(PORT, () => {
  console.log("Server started");

  db = new sqlite3.Database(
    path.join(__dirname, "./../", "database.db"),
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      err ? console.log(err.message) : console.log("Connected to the database");
    }
  ).wait();
  db.run(
    "CREATE TABLE IF NOT EXISTS cards_layout( name TEXT PRIMARY KEY, description TEXT, link TEXT, tags TEXT, hash TEXT)",
    (err) => {
      err ? console.log(err.message) : console.log("Table created");
    }
  ).wait();
});
