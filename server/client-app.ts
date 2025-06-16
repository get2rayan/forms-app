import express, { Request, Response, NextFunction, Express, Application } from 'express';
import cors from 'cors';
import path from 'path';
//import debugLib from 'debug';
require('dotenv').config();

//const console.log = console.logLib(`clientApp`);

// Create an express application instance for serving the client app
const clientApp: Express = express();
clientApp.use(cors());
clientApp.use(express.urlencoded({ extended: false }));

const buildPath = path.join(__dirname, './../client');

console.log(`Serving static files from: ${buildPath}`);
clientApp.use(express.static(buildPath));

// Serve index.html for all unmatched routes (SPA fallback)
clientApp.get('/{*splat}', (req: Request, res: Response) => {
  const indexPath = path.join(buildPath, 'index.html');
  console.log('Sending index.html for route:', req.path);
  res.sendFile(indexPath, (err: Error) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Sorry, something went wrong.');
    }
  });
});

clientApp.on('mount', (parent: Application) => {
  console.log(`Client app mounted on path: ${clientApp.mountpath}`);
});

export default clientApp;