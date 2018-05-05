"use strict";
exports.__esModule = true;
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var IProfile_1 = require("./IProfile");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.express = express();
        this.middleware();
        this.routes();
        this.profiles = new Array();
        this.profiles.push(new IProfile_1.IProfile(1, 'wes', 31, 'wesley@gmail.com'));
        this.profiles.push(new IProfile_1.IProfile(2, 'Troy', 21, 'troy@gmail.com'));
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        var router = express.Router();
        // router.get('/', (req, res, next) => {
        //   res.json({
        //     message: 'Hello World!'
        //   });
        // });
        router.get('/profile', function (req, res, next) {
            res.send(_this.profiles);
        });
        router.get('/profile/:id', function (req, res, next) {
            var profile = _this.profiles.find(function (p) { return p.id === parseInt(req.params.id); });
            if (!profile)
                res.status(404).send("Could not find profile");
            res.send(profile);
        });
        router.post('/profile', function (req, res, next) {
            var id = _this.profiles.length + 1;
            var n = req.body.name;
            var a = parseInt(req.body.age);
            var e = req.body.email;
            var profile = new IProfile_1.IProfile(id, n, a, e);
            _this.profiles.push(profile);
            res.send(profile);
        });
        this.express.use('/', router);
    };
    return App;
}());
exports.App = App;
