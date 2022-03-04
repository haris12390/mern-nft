import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// import DashboardLayout from 'src/layouts/DashboardLayout';
// import FullWidthLayout from 'src/layouts/fullWidthLayout'
// import DocsLayout from 'src/layouts/DocsLayout';
// import MainLayout from 'src/layouts/MainLayout';
// import HomeView from 'src/views/home/HomeView';

import MainLayout from 'src/layouts/MainLayout/index';

import LoadingScreen from './components/loaders/loading';
import AuthGuard from './components/Guards/AuthGuard';
import AdminAuthGuard from './components/Guards/AdminGuard';
import GuestGuard from './components/Guards/GuestGuard';



export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={props => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [

  {
    exact: true,
    path: '/admin-dashboard',
    guard: AdminAuthGuard,
    component: lazy(() => import('./components/views/AdminDashboard/admindashboard'))
  },
  {
    exact: true,
    path: '/',
    layout: MainLayout,
    // component: lazy(() => import('./components/views/Home/home'))
    component: lazy(() => import('./components/views/Home/home'))
  },
  {
    exact: true,
    layout: MainLayout,
    path: '/application-dashboard',
    component: lazy(() => import('./components/views/Home/App/Dashboard/appDashboard'))
  },
  {
    exact: true,
    path: '/gallery',
    layout: MainLayout,
    component: lazy(() => import('./components/views/Home/Gallery/gallery'))
  },
  {
    exact: true,
    path: '/application',
    layout: MainLayout,
    component: lazy(() => import('./components/views/Home/App/App/application'))
  },
  {
    exact: true,
    path: '/contact-us',
    layout: MainLayout,
    component: lazy(() => import('./components/views/Home/Contact Us/contact'))
  },
  {
    exact: true,
    path: '/faq',
    layout: MainLayout,
    component: lazy(() => import('./components/views/Home/Faq/faq'))
  },
  {
    exact: true,
    path: '/blog',
    layout: MainLayout,
    component: lazy(() => import('./components/views/Home/Blog/blog'))
  },
  {
    exact: true,
    path: '/pricing',
    layout: MainLayout,
    component: lazy(() => import('./components/views/Home/App/Pricing/pricing'))
  },
  {
    exact: true,
    path: '/about',
    layout: MainLayout,
    component: lazy(() => import('./components/views/Home/About/about'))
  },
  {
    exact: true,
    path: '/blog/:id',
    layout: MainLayout,
    component: lazy(() => import('./components/views/Home/Blog/innerBlog/innerBlog'))
  },

  {
    exact: true,
    path: '/register',
    // guard: GuestGuard,
    layout: MainLayout,
    component: lazy(() => import('./components/views/Register/register'))
  },
  {
    exact: true,
    path: '/login',
    // guard: GuestGuard,
    layout: MainLayout,
    component: lazy(() => import('./components/views/Login/login'))
  },
  {
    exact: true,
    path: '/forgotpassword',
    guard: GuestGuard,
    component: lazy(() => import('./components/views/ForgotPassword/ForgotPassword'))
  },
  {
    exact: true,
    path: '/resetpassword/:resetToken',
    component: lazy(() => import('./components/views/ResetPassword/ResetPasswordScreen'))
  },

  {
    path: '*',
    // layout: MainLayout,
    routes: [

      {
        component: () => <Redirect to="/404" />
      }
    ]
  }






];
export default routes;
