import Vue from 'vue';
import Vuex from 'vuex';
import {users} from "@/store/users";
import {work} from "@/store/work";
import {menuModal} from "@/store/menuModal";
import {calendarEvent} from "@/store/calendarEvent";

Vue.use(Vuex);

export const store =  new Vuex.Store({
  modules: {
    users,
    work,
    menuModal,
    calendarEvent
  }
});
