import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './routes/App';
import ErrorPage from './routes/ErrorPage';
import SignIn from './component/app/SignIn';
import Login from './component/app/Login';
import Dashboard from './routes/Dashboard';
import ViewUser from './routes/ViewUser';

export default function Router () {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <App/>,
          errorElement: <ErrorPage/>,
        },
        {
          path: "/dashboard",
          element: <Dashboard/>,
          errorElement: <ErrorPage />
        },
        {
          path: "/user/:username",
          element: <ViewUser/>,
          errorElement: <ErrorPage/>
        }
      ]);
      
    return <RouterProvider router={router}/>;
}