import { admin, user } from 'src/helper/ListAkses'

const routes = [
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('pages/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'registerPage',
    component: () => import('pages/auth/Register.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/admin/',
    meta: {
      allowedRole: admin.value,
      auth: true
    },
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboardAdmin',
        component: () => import('pages/admin/Index.vue')
      },
      {
        path: 'genre',
        name: 'dataGenreAdmin',
        component: () => import('pages/admin/genre/Index.vue')
      },
      {
        path: 'movie',
        name: 'dataMovieAdmin',
        component: () => import('pages/admin/movie/Index.vue')
      },
      {
        path: 'movie/input',
        name: 'inputDataMovieAdmin',
        component: () => import('pages/admin/movie/Input.vue')
      },
      {
        path: 'movie/edit/:id',
        name: 'editDataMovieAdmin',
        component: () => import('pages/admin/movie/Edit.vue')
      }
    ]
  },
  {
    path: '/user/',
    meta: {
      allowedRole: user.value,
      auth: true
    },
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboardUser',
        component: () => import('pages/user/Index.vue')
      },
      {
        path: 'transaction',
        name: 'transactionUser',
        component: () => import('pages/user/Transaction.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
