//import global API
import Api from "../../api/Api";

const product = {
  //set namespace true
  namespaced: true,

  //state
  state: {
    //index products
    products: [],
    product: {},
  },

  //mutations
  mutations: {
    //set state products dengan data dari response
    GET_PRODUCTS(state, products) {
      state.products = products;
    },

    DETAIL_PRODUCT(state, product) {
      state.product = product;
    },
  },

  //actions
  actions: {
    //action getProducts
    getProducts({ commit }) {
      //get data sliders ke server
      Api.get("/product")
        .then((response) => {
          console.log(response);
          //commit ke mutation GET_PRODUCTS dengan response data
          commit("GET_PRODUCTS", response.data.products);
        })
        .catch((error) => {
          //show error log dari response
          console.log(error);
        });
    },

    getDetailProduct({ commit }, slug) {
      Api.get(`/product/${slug}`)
        .then((response) => {
          //commit ke mutation GET_PRODUCTS dengan response data
          commit("DETAIL_PRODUCT", response.data.product);
        })
        .catch((error) => {
          //show error log dari response
          console.log(error);
        });
    },
  },

  //getters
  getters: {},
};

export default product;
