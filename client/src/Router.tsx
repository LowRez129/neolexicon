import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './routes/App';
import ErrorPage from './routes/ErrorPage';
import SignIn from './routes/SignIn';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';

export default function Router () {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <App/>,
          errorElement: <ErrorPage/>,
        },
        {
            path: "/sign-in",
            element: <SignIn/>,
            errorElement: <ErrorPage/>
        },
        {
          path: "/login",
          element: <Login/>,
          errorElement: <ErrorPage/>
        },
        {
          path: "/dashboard",
          element: <Dashboard/>,
          errorElement: <ErrorPage />
        }
      ]);
      
    return <RouterProvider router={router}/>;
}