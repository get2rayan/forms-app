import express, {Router, Request, Response, NextFunction} from 'express';
import profileRouter from './profile.router'; // Import the profile router

const router: Router = express.Router();

router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.send('This is default Forms App API!'); // Send a welcome message  
});

router.use('/profiles', profileRouter); // Use the profile router for /api/profiles endpoint

router.get('/{*splat}', function(req: Request, res: Response, next: NextFunction) {
  // This route will catch all other requests that do not match the above route
  res.send('All redirects of the Forms App API!'); // Send a welcome message
});

export default router;
