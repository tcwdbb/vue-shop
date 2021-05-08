<template>
  <div class="users">
    <breadcrumb></breadcrumb>
    <card-list></card-list>
  </div>
</template>

<script>
import Breadcrumb from '../breadcrumb/Breadcrumb.vue'
import CardList from '../card/CardList.vue'
export default {
  components: { Breadcrumb, CardList },
  name: 'Users'
}
</script>

<style>

</style>