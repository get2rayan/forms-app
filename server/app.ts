import express, {Request, Response, NextFunction } from 'express';          // The Express framework itself
import path from 'path';                // Node.js module for handling file paths
import logger from 'morgan';            // HTTP request logger middleware
import cors from 'cors';              // Middleware for enabling CORS (Cross-Origin Resource Sharing)
import dotenv from 'dotenv'; // Load environment variables from .env file
import createError from 'http-errors';  // Used to create HTTP error objects
// Import route handlers from files
import apiRouter from './router/api';  // Routes for lib api endpoints
import clientApp from './client-app'; // Routes for serving the client application
// Load environment variables from .env file
dotenv.config();

// Create a new Express application instance
const app = express();

// -------------- VIEW ENGINE CONFIGURATION --------------
// Tell Express where to find view templates (in the 'views' folder)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// -------------- MIDDLEWARE SETUP --------------
app.use(cors());                                        // Enable CORS for all routes
app.use(logger('dev'));                                   // Log HTTP requests to the console (in development mode)   
app.use(express.json());                                  // Parse incoming JSON requests (body-parser) 
app.use(express.urlencoded({ extended: false }));         // Parse URL-encoded data (from forms)  

// -------------- ROUTE HANDLERS --------------
app.use('/api', apiRouter);
app.use('/client', clientApp);

app.get('/', function(req: Request, res: Response) {
  res.send(`__dirname is ${__dirname} & build path is ${path.join(__dirname, '../../build')}`); // Send a welcome message for the root route
})

// -------------- ERROR HANDLING --------------
// Middleware that runs if no route matches - creates a 404 error
app.use((req: Request, res: Response, next: NextFunction)=> {
  next(createError(404)); // Pass a 404 error to the next middleware
});

// Global error handler - catches all errors passed to next()
interface ErrorWithStatus extends Error {
  status?: number;
}

app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
  // Store error information in locals for templates to access
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// // /******* fallback code to run app on PORT when running locally *****/
// // /*****Uncomment the following lines to run the app on a specific port when running locally *****/
// const port = process.env.PORT || 3030;  // Default to port 3030 if not specified in environment variables
// app.listen(port, (err?: Error) => {
//   if (err) {
//       console.error("Error starting the server:", err);
//       return;
//   }   
//   console.log(`Server app is running on http://localhost:${port}`);
// });
// /*****************************************************************/

// Export the configured app so it can be imported in other files (like bin/www)
module.exports = app;
