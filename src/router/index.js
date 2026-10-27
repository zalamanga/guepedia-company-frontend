import Vue from 'vue'
import VueRouter from 'vue-router'


import StoreLayout from '../views/StoreLayout.vue'
// Account
import AccountPage from '../views/Account/AccountPage.vue'
//Auth
import Auth from '../views/Auth/Layout.vue'
// Admin
import AdminAuth from '../views/Admin/AdminAuth.vue'
import AdminLayout from '../views/Admin/Layout.vue'
// Blog
import BlogLayout from '../views/Blog/Layout.vue'

import Index from '@/views/Index.vue'

import OurProduct from '@/views/OurProduct.vue'
import Cart  from '@/views/Cart.vue'
import Checkout  from '@/views/Checkout.vue'
import Book  from '@/views/Book.vue'
import Dashboard  from '@/views/Account/Dashboard.vue'
import MyProject from '@/views/Account/MyProject.vue'
import HAKI from '@/views/Account/HAKI.vue'
import DaftarHaki from '@/views/Account/DaftarHaki.vue'
import ReviewBuku from '@/views/Account/Review.vue'
import Reseller from '@/views/Account/Reseller.vue'
import Sales  from '@/views/Account/Sales.vue'
import Royalty  from '@/views/Account/Royalty.vue'
import Transaction  from '@/views/Account/Transaction.vue'
import Account  from '@/views/Account/Account.vue'
import Upload  from '@/views/Account/Upload.vue'
import Login  from '@/views/Auth/Login.vue'
import Register  from '@/views/Auth/Register.vue'
import Forgot  from '@/views/Auth/Forgot.vue'
import Invoice  from '@/views/Invoice.vue'
import Page  from '@/views/Page.vue'
import LandingPage  from '@/views/LandingPage.vue' 
import AdminDashboard  from '@/views/Admin/Dashboard.vue'
import Store  from '@/views/Admin/Store.vue'
import Naskah  from '@/views/Admin/Naskah.vue'
import Review  from '@/views/Admin/Review.vue'
import DetailNaskah from '@/views/Admin/DetailNaskah.vue'
import DetailUser from '@/views/Admin/DetailUser.vue'
import SalesReport from '@/views/Admin/SalesReport.vue'
import InputSales from '@/views/Admin/InputSales.vue'
import AdminRoyalti from '@/views/Admin/Royalti.vue'
import User from '@/views/Admin/User.vue'
import OurTeam from '@/views/Admin/OurTeam.vue'
import Setting from '@/views/Admin/Setting.vue'
import DataReseller from '@/views/Admin/DataReseller.vue'
import AdminLogin from '@/views/Admin/Login.vue'
import About from '@/views/About.vue'
import Terbit from '@/views/Terbit.vue'
import GhostWriting from "@/views/GhostWriting.vue";
import CaraOrder from '@/views/CaraOrder.vue'
import JadiPenulis from '@/views/JadiPenulis.vue'
import JadiReseller from '@/views/JadiReseller.vue'
import Privacy from '@/views/Privacy.vue'
 
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: StoreLayout,
    children: [
      {
        path: "/",
        name: "Index",
        component: Index,
      },
      {
        path: "/books/:param?",
        name: "OurProduct",
        component: OurProduct,
      },
      {
        path: "/cart",
        name: "Cart",
        component: Cart,
      },
      {
        path: "/checkout",
        name: "Checkout",
        component: Checkout,
        meta: { checkAuth: true },
      },
      {
        path: "/book/:id",
        name: "Book",
        component: Book,
      },
      {
        path: "/dashboard",
        name: "AcccountPage",
        component: AccountPage,
        children: [
          { path: "/dashboard", name: "Dashboard", component: Dashboard },
          { path: "/projects/:status?", name: "Project", component: MyProject },
          { path: "/hak-cipta", name: "Haki", component: HAKI },
          {
            path: "/hak-cipta/daftar",
            name: "daftar-haki",
            component: DaftarHaki,
          },
          { path: "/sales", name: "Sales", component: Sales },
          { path: "/royalty", name: "Royalty", component: Royalty },
          { path: "/transaction", name: "Transaction", component: Transaction },
          { path: "/account", name: "Account", component: Account },
          { path: "/upload", name: "Upload", component: Upload },
          { path: "/programreview", name: "ReviewBuku", component: ReviewBuku },
          { path: "/reseller", name: "Reseller", component: Reseller },
        ],
        meta: { checkAuth: true },
      },
      {
        path: "/login",
        name: "AuthPage",
        component: Auth,
        children: [
          { path: "/login", name: "Login", component: Login },
          { path: "/register", name: "Register", component: Register },
          { path: "/forgot", name: "Forgot", component: Forgot },
        ],
        meta: { noAuth: true },
      },
    ],
  },
  {
    path: "/invoice/:invoice",
    name: "Invoice",
    component: Invoice,
  },
  {
    path: "/page/:id",
    name: "Page",
    component: Page,
    meta: { checkAuth: true },
  },
  {
    path: "/page/:user/:judul",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/ghost-writing",
    name: "GhostWriting",
    component: GhostWriting,
  },
  {
    path: "/overview",
    name: "Admin",
    component: AdminLayout,
    children: [
      { path: "/overview", name: "AdminDashboard", component: AdminDashboard },
      { path: "/store/:status?", name: "Store", component: Store },
      { path: "/naskah/:status?", name: "Naskah", component: Naskah },
      { path: "/Review/:status?", name: "Review", component: Review },
      {
        path: "/detailnaskah/:id",
        name: "DetailNaskah",
        component: DetailNaskah,
      },
      { path: "/detailuser/:id", name: "DetailUser", component: DetailUser },
      {
        path: "/salesreport/:status?",
        name: "SalesReport",
        component: SalesReport,
      },
      { path: "/inputsales", name: "InputSales", component: InputSales },
      { path: "/royalti/:status?", name: "Royalti", component: AdminRoyalti },
      { path: "/user", name: "User", component: User },
      { path: "/our-team", name: "OurTeam", component: OurTeam },
      { path: "/setting", name: "Setting", component: Setting },
      {
        path: "/datareseller/:status?",
        name: "DataReseller",
        component: DataReseller,
      },
    ],
    meta: { adminAuth: true },
  },
  {
    path: "/g-login",
    name: "AdminAuthPage",
    component: AdminAuth,
    children: [{ path: "/g-login", name: "AdminLogin", component: AdminLogin }],
  },
  {
    path: "/about",
    name: "BlogLayout",
    component: BlogLayout,
    children: [
      { path: "/about", name: "AboutUs", component: About },
      { path: "/terbit", name: "Terbit", component: Terbit },
      { path: "/cara-order", name: "CaraOrder", component: CaraOrder },
      { path: "/jadi-penulis", name: "JadiPenulis", component: JadiPenulis },
      { path: "/jadi-reseller", name: "JadiReseller", component: JadiReseller },
      { path: "/privacy", name: "Privacy", component: Privacy },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.checkAuth)) {
      var token = localStorage.getItem('access_token');
      if (!token) {
          next({
              path: '/login'
          })
      } else {
          next()
      }
  } else {
      next() // make sure to always call next()!
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.noAuth)) {
      var token = localStorage.getItem('access_token');
      if (token) {
          next({
              path: '/dashboard'
          })
      } else {
          next()
      }
  } else {
      next() // make sure to always call next()!
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.adminAuth)) {
      var token = localStorage.getItem('admin_access_token');
      if (!token) {
          next({
              path: '/g-login'
          })
      } else {
          next()
      }
  } else {
      next() // make sure to always call next()!
  }
});

export default router
