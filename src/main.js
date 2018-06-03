import Vue from 'vue';
import App from './App.vue';

import AppCustomHeader from './components/CustomHeader.vue';
import AppMainPage from './components/MainPage.vue';
import AppCustomFooter from './components/CustomFooter.vue';
import AppPersonalArea from './components/PersonalArea.vue';
import AppPopUp from './components/PopUp.vue';
import '../assets/js/initialState';

Vue.component('CustomHeader', AppCustomHeader);
Vue.component('MainPage', AppMainPage);
Vue.component('CustomFooter', AppCustomFooter);
Vue.component('PersonalArea', AppPersonalArea);
Vue.component('PopUp', AppPopUp);

new Vue({
    el: '#app',
    render: h => h(App),
});