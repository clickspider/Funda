import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersist from "vuex-persist";
import { KEY, ID, CROSS } from "../data/config.js";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "store"
});

export const store = new Vuex.Store({
  strict: true,
  plugins: [vuexLocalStorage.plugin],
  state: {
    // Use this to store your data
    house: []
  },

  mutations: {
    // Use this to change the data
    gotData(state, args) {
      if (args.statusText === "OK") {
        state.house = args.data;
      } else {
        state.house = args.status;
      }
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
    }
  },

  getters: {
    // Use this to get stored data and change it
    house: state => {
      return state.house;
    }
  }
});
