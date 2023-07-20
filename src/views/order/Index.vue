<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row">
      <div class="col-md-3 mb-4">
        <CustomerMenu />
      </div>

      <div class="col-md-9 mb-4">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h5 class="font-weight-bold">
              <i class="fas fa-shopping-cart"></i> MY ORDER
            </h5>
            <hr />
            <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Invoice</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Shipping</th>
                  <th scope="col">Grand Total</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="order in orders" :key="order.id">
                  <th>{{ order.invoice }}</th>
                  <td>{{ order.name }}</td>
                  <td>
                    {{ order.courier.toUpperCase() }} | {{ order.service }} |
                    Rp. {{ moneyFormat(order.cost_courier) }}
                  </td>
                  <td>Rp. {{ moneyFormat(order.grand_total) }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'detail_order',
                        params: { snap_token: order.snap_token },
                      }"
                      class="btn btn-sm btn-primary"
                      >DETAIL</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerMenu from "../../components/CustomerMenu.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "OrderIndexComponent",

  components: {
    CustomerMenu,
  },

  setup() {
    const store = useStore();

    onMounted(() => {
      return store.dispatch("order/getOrder");
    });

    const orders = computed(() => {
      return store.getters["order/getOrder"];
    });

    return {
      store,
      orders,
    };
  },
};
</script>

<style scoped>
.table .thead-dark th {
  color: #fff;
  background-color: #6777ef;
  border-color: #6777ef;
}
</style>
