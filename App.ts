import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import {Teacher} from './TeacherProfile';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public profiles: Array<Teacher>;
  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.profiles = new Array<Teacher>();
    this.profiles.push(new Teacher(1,'wes', 31,'wesley@gmail.com'));
    this.profiles.push(new Teacher(2,'Troy', 21,'troy@gmail.com'));
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    
    // router.get('/', (req, res, next) => {
    //   res.json({
    //     message: 'Hello World!'
    //   });
    // });
    router.get('/profile', (req, res, next) => {
        res.send(this.profiles);
    });

    router.get('/profile/:id', (req, res, next) => {
        const profile = this.profiles.find(p => p.id === parseInt(req.params.id));
        if(!profile)
            res.status(404).send("Could not find profile")
        res.send(profile);
    });

    router.post('/profile', (req,res,next) => {
      const id = this.profiles.length + 1;
      const n = req.body.name;
      const a = parseInt(req.body.age);
      const e = req.body.email;
      const profile = new Teacher(id,n,a,e);
      this.profiles.push(profile);
      res.send(profile);
    })
    this.express.use('/', router);
  }

}

export {App};