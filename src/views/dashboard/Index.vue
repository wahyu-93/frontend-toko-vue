<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row">
      <div class="col-md-3 mb-4">
        <CustomerMenu />
      </div>

      <div class="col-md-9 mb-4">
        <div class="card border-0rounded-shadow">
          <div class="card-body">
            <h5 class="font-weight-bold">
              <i class="fas fa-tachometer-alt"></i>
              Dashboard
              <hr />
              Selamat Datang
              <strong class="text-danger">{{ user.name }}</strong>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerMenu from "../../components/CustomerMenu.vue";
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";

export default {
  name: "DashboardComponent",
  components: {
    CustomerMenu,
  },

  setup() {
    const store = useStore();

    onMounted(() => {
      // panggil action getIser module auth
      store.dispatch("auth/getUser");
    });

    // computed
    const user = computed(() => {
      // panggil getters dengan nama currentUser module auth
      return store.getters["auth/currentUser"];
    });

    // return state dan function
    return {
      store,
      user,
    };
  },
};
</script>
