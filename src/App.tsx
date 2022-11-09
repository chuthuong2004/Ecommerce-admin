import React, { Fragment, ReactNode } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import config from './config';
import { selectAuth } from './features/authSlice';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';

// 258122201888-nki79uqhlu4g7tbmj5cukepcqvcs2d5u.apps.googleusercontent.com
// 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
const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to={config.routes.dashboard} replace />} />
        {routes.map((route, index) => {
          const Page = route.component;
          let Layout: any = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <RequireAuth>
                  <Layout>
                    <Page />
                  </Layout>
                </RequireAuth>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};
function RequireAuth({ children }: { children: any }): JSX.Element {
  const { user } = useAppSelector(selectAuth);
  let location = useLocation();
  if (user) {
    return <Navigate to={config.routes.login} state={{ from: location }} replace={true} />;
  }
  return children;
}
export default App;
