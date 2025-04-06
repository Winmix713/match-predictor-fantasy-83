
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import IndexPage from './pages/Index.tsx';
import NotFoundPage from './pages/NotFound.tsx';
import Matches from './pages/Matches.tsx';
import BrandbookPage from './pages/BrandbookPage.tsx';
import League from './pages/League.tsx';
import Analysis from './pages/Analysis.tsx';
import AdvancedPattern from './pages/AdvancedPattern.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <IndexPage />
      },
      {
        path: '/matches',
        element: <Matches />
      },
      {
        path: '/league',
        element: <League />
      },
      {
        path: '/analysis',
        element: <Analysis />
      },
      {
        path: '/advanced-pattern',
        element: <AdvancedPattern />
      },
      {
        path: '/brandbook',
        element: <BrandbookPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
