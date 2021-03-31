import express, { Application } from 'express';
import cors from 'cors';

import routes from './routes';

class App {
  server: Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
