import Vue from 'vue'
import App from './App.vue';
import router from './router/router';
import VueRouter from 'vue-router';
import store from './store/store';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios'
import moment from 'moment'


Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueToast)

const baseUrl = "http://localhost:8081/api/";
Vue.prototype.$postAPi = (url,body,header) => {
  if(header){
    return axios.post(baseUrl+url,body,{headers:header});
  }
  return axios.post(baseUrl+url,body);
},

Vue.prototype.$putAPi = (url,body,header) => {
  if(header){
    return axios.put(baseUrl+url,body,{headers:header});
  }
  return false
},

Vue.prototype.$getAPI = (url,header)=>{
    return axios.get(baseUrl+url,{headers:header});
}

// Vue.prototype.$name = "My name is Hieu";

// Vue.prototype.$test = ()=>{
//   return Vue.prototype.$name;
// }

Vue.prototype.$getUser = async (userId)=>{
  let url = `user/Profile/${userId}`;
  let user ={};
  const Response = await Vue.prototype.$postAPi(url);
  if (Response.data.success == false) {
    Vue.prototype.$toast.open({
      message: Response.data.message,
      type: "error",
      duration: 1500,
    });
  }else if(Response.data.success == true) {
    user = { ...Response.data.data };
    return user;
  }else{
    return false;
  }
}



Vue.prototype.moment = moment;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
