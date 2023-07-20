// impport global api
import Api from "../../api/Api";

const auth = {
  namespaced: true,

  state: {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {},
  },

  mutations: {
    AUTH_SUCCESS(state, token, user) {
      state.token = token;
      state.user = user;
    },

    GET_USER(state, user) {
      state.user = user;
    },

    AUTH_LOGOUT(state) {
      state.token = "";
      state.user = {};
    },
  },

  actions: {
    // action register
    register({ commit }, user) {
      // define callback promise
      return new Promise((resolve, reject) => {
        // send data ke server
        Api.post("/register", {
          // data yg dikirm ke server
          name: user.name,
          email: user.email,
          password: user.password,
          password_confirmation: user.password_confirmation,
        })
          .then((response) => {
            // define variable dengan isi hasil response dari serve
            const token = response.data.token;
            const user = response.data.user;

            // set localstorage untuk mentimpan token dan user
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // set default header axios dengan token
            Api.defaults.headers.common["Authorization"] = "Bearer " + token;

            // coammit auth succes ke mutation
            commit("AUTH_SUCCESS", token, user);

            // resolve ke componen dengan hasil response
            resolve(response);
          })
          .catch((error) => {
            // jika gagl, remove localstorage dengan key token
            localStorage.removeItem("token");
            reject(error.response.data);
          });
      });
    },

    getUser({ commit }) {
      const token = localStorage.getItem("token");

      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      Api.get("/user").then((response) => {
        commit("GET_USER", response.data.user);
      });
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("AUTH_LOGOUT");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // delete header axios
        delete Api.defaults.headers.common["Authorization"];

        resolve();
      });
    },

    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        Api.post("/login", {
          email: user.email,
          password: user.password,
        })
          .then((response) => {
            const token = response.data.token;
            const user = response.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            Api.defaults.headers.common["Authorization"] = "Bearer " + token;

            commit("AUTH_SUCCESS", token, user);
            commit("GET_USER", user);
            resolve(response);
          })
          .catch((error) => {
            localStorage.removeItem("token");
            reject(error.response.data);
          });
      });
    },
  },

  getters: {
    // get current user
    currentUser(state) {
      return state.user;
    },

    // loggedIn
    isLoggedIn(state) {
      return state.token;
    },
  },
};

export default auth;
