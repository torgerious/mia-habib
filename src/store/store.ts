import Vue from 'vue';
import Vuex from 'vuex';
import {users} from "@/store/users";
import {work} from "@/store/work";
import {menuModal} from "@/store/menuModal";
import {calendarEvent} from "@/store/calendarEvent";
import {imageGallery} from "@/store/imageGallery";
import { people } from './people';

Vue.use(Vuex);

export const store =  new Vuex.Store({
  modules: {
    users,
    work,
    menuModal,
    calendarEvent,
    imageGallery,
    people
  }
});
