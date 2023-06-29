import { boot } from 'quasar/wrappers'
import axios from 'axios'


// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const API_BASE_URL = 'http://localhost:4001'
const api = axios.create({
  baseURL: API_BASE_URL
})

// add interceptor request data
// api.interceptors.request.use((config)=>{
//   let session = decode(localStorage.getItem('user'))
//   let token = JSON.parse(localStorage.getItem('token'))
//   if(session != null) {
//     config.headers['X-PROFILE'] = session.id // id profile
//   }
//   if(token){
//     config.headers['Authorization'] = "Bearer " + token // Authorization token

//     // let payload = jwt_decode(token)
//     // console.log('👨🏽‍💻 Expires on',new Date(payload.exp*1000))
//     // console.log(payload, new Date(payload.exp*1000) - new Date () >= 0 ? 'Logged 🤴🏽' : 'Un-authorized 🔒')
//     // if(new Date(payload.exp*1000) - new Date () === 5*60){
//     //   console.log('5min Warning 🎁')
//     // }
//   }
//   return config
// }, function (error) {
//   return Promise.reject(error);
// });


// add interceptor response data
api.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});


export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api

})



export { api }
