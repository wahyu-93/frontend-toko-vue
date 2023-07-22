import Api from "../../api/Api";

const cart = {
  namespaced: true,
  state: {
    cart: [],
    cartTotal: 0,
    cartWeight: 0,
  },

  mutations: {
    GET_CART(state, product) {
      state.cart = product;
    },

    TOTAL_CART(state, total) {
      state.cartTotal = total;
    },

    CART_WEIGHT(state, weight) {
      state.cartWeight = weight;
    },
  },

  actions: {
    addToCart({ commit }, { product_id, price, quantity, weight }) {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.post("/cart", {
        product_id: product_id,
        price: price,
        quantity: quantity,
        weight: weight,
        customer_id: user.id,
      }).then(() => {
        Api.get("/cart").then((response) => {
          commit("GET_CART", response.data.cart);
        });

        Api.get("/cart/total").then((response) => {
          commit("TOTAL_CART", response.data.total);
        });
      });
    },

    cartCount({ commit }) {
      const token = localStorage.getItem('token');

      Api.defaults.headers.common['Authorization'] = 'Bearer ' + token

      Api.get('/cart')
        .then(response => {
          commit('GET_CART', response.data.cart)
        })
    },

    cartTotal({ commit }) {
      const token = localStorage.getItem('token');

      Api.defaults.headers.common['Authorization'] = 'Bearer ' + token

      Api.get('/cart/total')
        .then(response => {
          commit('TOTAL_CART', response.data.total)
        })
    }
  },

  getters: {
    getCart(state) {
      return state.cart;
    },

    cartCount(state) {
      return state.cart.length;
    },

    cartTotal(state) {
      return state.cartTotal
    }
  },
};

export default cart;
