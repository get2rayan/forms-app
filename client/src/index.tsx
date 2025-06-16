import React , { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import ProfileForm from './components/form-w-hook';
import { ProfileContextProvider } from './context/profile-context';
import NotFound from './components/NotFound';
import { ThankYou } from './components/ThankYou';

const Profiles = lazy(() => import('./components/profiles'));
const ProfilePage = lazy(() => import('./components/profile-page'));

const router = createBrowserRouter([
  {
    path: '/',
    element:  <ProfileForm />,
  },
  {
    path: '/profiles',
    element: <Profiles />,
    children: [{
      path: '/profiles/:profileId',
      element: <ProfilePage />
    }],
  },
  {
    path: '/thank-you',
    element: <ThankYou />
  },
  {
    path: '*',
    element: <NotFound />
  }
],
{  basename: '/client' } // since the app will be mounted on path '/client' served from 'client' sub domain in node server
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContextProvider>         
          <RouterProvider router={router}  />      
      </ProfileContextProvider>
    </Suspense>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
