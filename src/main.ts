import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/store'
import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0UIu5cWHNfy7nB5SpKuRDgVE75oYYN8g",
  authDomain: "mia-habib-f9b6c.firebaseapp.com",
  databaseURL: "https://mia-habib-f9b6c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mia-habib-f9b6c",
  storageBucket: "mia-habib-f9b6c.appspot.com",
  messagingSenderId: "315643109887",
  appId: "1:315643109887:web:f327d1f57089610ceec7ca",
  measurementId: "G-HLMHST03R7"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const DB = firebase.firestore();
export const STORAGE = firebase.storage();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
