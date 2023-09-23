const bodyparser = require("body-parser");
const express    = require("express");
const path       = require("path");
const sharp      = require("sharp");
const app = express();
const redis = require("redis");
const db    = redis.createClient();


db.on("connect", (err) => {
    if (err) throw err;
    console.log("db: ready");

    // query limits
    app.param("image", (req, res, next, name) => {
        if (!name.match(/\.(png|jpg)$/i)) {
            return res.status(403).end();
        }

        db.hgetall(name, (err, image) => {
            if (err || !image ) return res.status(404).end();

            req.image = image;
            req.image.name = name;

            return next();
        });
    });

    // upload
    app.post("/uploads/:name", bodyparser.raw({
        limit : "10mb",
        type : "image/*"
    }), (req, res) => {
        db.hmset(req.params.name, {
            size : req.body.length,
            data : req.body.toString("base64"),
            //date_created : Date.now(),
        }, (err) => {
            if (err) {
                return res.send({ status : "error", code: err.code });
            }

            res.send({ status : "ok", size: req.body.length });
        });
    });

    // check if exists
    app.head("/uploads/:image", (req, res) => {
        return res.status(200).end();
    });

    // image manipulation
    app.get("/uploads/:image", (req, res) => {
        let image     = sharp(Buffer.from(req.image.data, "base64"));
        let width     = +req.query.width;
        let height    = +req.query.height;
        let blur      = +req.query.blur;
        let sharpen   = +req.query.sharpen;
        let greyscale = [ "y", "yes", "true", "1", "on"].includes(req.query.greyscale);
        let flip      = [ "y", "yes", "true", "1", "on"].includes(req.query.flip);
        let flop      = [ "y", "yes", "true", "1", "on"].includes(req.query.flop);

        if (width > 0 && height > 0) {
            image.ignoreAspectRatio();
        }

        if (width > 0 || height > 0) {
            image.resize(width || null, height || null);
        }

        if (flip)        image.flip();
        if (flop)        image.flop();
        if (blur > 0)    image.blur(blur);
        if (sharpen > 0) image.sharpen(sharpen);
        if (greyscale)   image.greyscale();

        db.hset(req.image.name, "date_used", Date.now());

        res.setHeader("Content-Type", "image/" +
            path.extname(req.image.name).substr(1));

        image.pipe(res);
    });

    // remove
    app.delete("/uploads/:image", (req, res) => {
        db.del(req.image.name, (err) => {
            return res.status(err ? 500 : 200).end();
        });
    });

    // statistic => missing
    // For the statistics, that could be hard as we're using generic hash tables and
    // we can't be sure how many hash tables are defined, and if all or any have image data.
    // We would have to scan all hash tables, which is complex for large sets.

    // in-house keeping => missing
    // the problem is the same as there's no way of looking for hash tables with a specific condition,
    // such as a field value.

    // starts to service
    app.listen(3000, () => {
        console.log("app: ready");
    });
});