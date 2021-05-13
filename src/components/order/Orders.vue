<template>
  <div class="orders">
    <breadcrumb></breadcrumb>
    <card-box>
      <order-search></order-search>
      <order-list></order-list>
    </card-box>
  </div>
</template>

<script>
import Breadcrumb from "../breadcrumb/Breadcrumb.vue";
import CardBox from "../card/CardBox";
import OrderList from "./OrderList.vue";
import OrderSearch from "./OrderSearch.vue";
export default {
  components: { Breadcrumb, OrderSearch, OrderList, CardBox },
  name: "Orders",
};
</script>

<style>
</style>