// Layouts

// Pages
import config from '../config';
import Product from '../pages/Product';
import Login from '../pages/Login/Login';
import React, { ReactNode } from 'react';
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import Customer from '../pages/Customer';
import Catalog from '../pages/Catalog';
import Category from '../pages/Category';
import Brand from '../pages/Brand';
import Chat from '../pages/Chat';
import Review from '../pages/Review';
// import NotPageFound from '../pages/NotPageFound';

type routeType = {
  path: string;
  component: React.FC<any>;
  layout?: React.FC<{ children: ReactNode }> | null;
};
const routes: Array<routeType> = [
  {
    path: config.routes.dashboard,
    component: Dashboard,
  },
  {
    path: config.routes.product,
    component: Product,
  },
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.register,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.order,
    component: Order,
  },
  {
    path: config.routes.customer,
    component: Customer,
  },
  {
    path: config.routes.catalog,
    component: Catalog,
  },
  {
    path: config.routes.category,
    component: Category,
  },
  {
    path: config.routes.brand,
    component: Brand,
  },
  {
    path: config.routes.chat,
    component: Chat,
  },
  {
    path: config.routes.review,
    component: Review,
  },
  //   {
  //     path: '*',
  //     component: NotPageFound,
  //   },
];
export default routes;
