
const isAuthenticated = (to, from) => {
  const access_token = localStorage.getItem('access_token')
  if(!access_token) return { name: 'Login'}
  return true
}
const routes = [
  {
    path:"/",
    redirect: { path: "/login" }
  },
  {
    name:"Login",
    path:'/login',
    component: () => import('pages/LoginPage.vue')
  }
  ,
  {
    name:"Home",
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: [isAuthenticated],
    children:[
      {name:"Menu", path:'/menu', component: () => import('pages/IndexMenu.vue')},
      {name:"User",path:'/user', component: () => import('pages/IndexUser.vue')},
      {name:"Create User",path:'/user/create', component: () => import('pages/components/CreateUser.vue'), },
      {name:"Edit User",path:'/user/:action/:id', component: () => import('pages/components/CreateUser.vue'),props:true },
      {name:"Consult User",path:'/user/:action/:id', component: () => import('pages/components/CreateUser.vue'),props:true },
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
