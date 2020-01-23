import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersist from "vuex-persist";
import { KEY, ID, CROSS } from "../data/config.js";
// NOTE: For this app I used the keys on the Front-End side (it is not for production purposes)

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "store"
});

export const store = new Vuex.Store({
  strict: true,
  plugins: [vuexLocalStorage.plugin],
  state: {
    // Use this to store your data
    house: [],
    imagesArr: []
  },

  mutations: {
    // Use this to change the data
    gotData(state, args) {
      if (args.statusText === "OK") {
        state.house = args.data;
      } else {
        state.house = args.status;
      }
    },

    filterImagesArr(state) {
      const mediaItems = state.house.Media.map(
        media => media.MediaItems
      ).flat();

      const imagesArr = mediaItems
        .filter(item => item.Category === 6)
        .map(el => el.Url);

      state.imagesArr = imagesArr;
    }
  },

  actions: {
    // Use this to call the change/mutation^
    async getData({ commit }) {
      try {
        const GET_DATA = await axios.get(
          `${CROSS}/http://partnerapi.funda.nl/feeds/Aanbod.svc/json/detail/${KEY}/koop/${ID}/`
        );

        commit("gotData", GET_DATA);
      } catch (err) {
        commit("gotData", err);
      }
    },

    filterImagesArr({ commit }) {
      commit("filterImagesArr");
    }
  },

  getters: {
    // Use this to get stored data and change it
    house: state => {
      return state.house;
    },

    imagesArr: state => {
      return state.imagesArr;
    }
  }
});
