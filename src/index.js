const express = require("express");
const nedb = require("nedb");

const app = express();

const db = new nedb("database.db");
db.loadDatabase();

const port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`listening at ${port}`);
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (request, response) => {
    const time = Date.now();
    request.body.time = time;
    db.insert(request.body);
    console.log("Sucessfuly inserted info into the database");

    response.end();
});

app.post("/db", (request, response) => {
    db.find({ user: request.body.user }, (err, data) => {
        if (err) {
            console.log(err);
            response.end();
            return;
        }
        response.json(data.length != 0);
    });
});

app.post("/numbers", (request, response) => {
    db.find({ user: request.body.user }, (err, data) => {
        response.json(data);
    });
});

app.post("/theorchestraverdammten", (request, response) => {
    const attempt = request.body.password.toLowerCase().trim();
    const close = ["2019", "june", "junho", "12 de junho", "june 12", "12"];
    if (attempt == "oblivion") {
        response.json("have you completly forgotten this is about the umbrella academy?");
    } else if (attempt == "oblivion hotel" || attempt == "oblivionhotel") {
        response.json("any sense to you? does this make");
    } else if (attempt == "hotel oblivion" || attempt == "hoteloblivion") {
        response.json("right, but the question is not where or what, but when");
    } else if (close.includes(attempt)) {
        response.json("you're close, but please be more specific and format it in a better way");
    } else if (attempt == "06/12/2019") {
        response.json("vc por acaso é estado unidense?");
    } else if (attempt == "12/06/2019") {
        let res = { url: "QR.html", text: "u did it :)" };
        response.json(res);
    } else {
        response.json("wrong");
    }
});

app.post("/terminauts", (request, response) => {
    const attempt = request.body.password.toLowerCase().trim();
    if (attempt == "governor" || attempt == "california") {
        let res = { url: "yiolin!.html", text: "u did it :)" };
        db.insert;
        response.json(res);
    } else {
        response.json("wrong");
    }
});

app.post("/fl", (request, response) => {
    const attempt = request.body.password.toLowerCase().trim();
    if (attempt == "governor" || attempt == "california" || attempt == "12/06/2019") {
        let res = { src: "./imgs/wc.png", text: "congrats" };
        response.json(res);
    } else {
        response.json("wrong");
    }
});

app.post("/login", (request, response) => {
    db.find({ user: request.body.user }, (err, data) => {
        response.json(request.body.password == data[0].password);
    });
});

app.post("/add-level", (request, response) => {
    let levels;
    db.find({ user: request.body.user }, (err, data) => {
        levels = data[0].allowedLevels.split(" ");
        console.log(levels);
        if (!levels.includes(request.body.level)) {
            levels.push(request.body.level);
            console.log(levels);
            levels = levels.join(" ").trim();
            db.update({ user: request.body.user }, { $set: { allowedLevels: levels } });
        }
        response.end();
    });
});

app.post("/get-levels", (request, response) => {
    db.find({ user: request.body.user }, (err, data) => {
        response.json(data[0].allowedLevels.split(" "));
    });
});

const links = ["/1", "/2", "/3", "/4", "/5", "/7", "/yiolin", "/apocalypsesuite", "/terminauts", "/theorchestraverdammten", "/login"];

links.forEach((link) => {
    app.get(link, (req, res) => {
        res.redirect(`${link}.html`);
    });
});
