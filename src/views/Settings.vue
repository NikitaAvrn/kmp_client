<template>
  <div>
    <div class="page-title">
      <h3>{{ $route.name }}</h3>
    </div>
    {{ SESSION_LIST }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: mapGetters(['SESSION_LIST']),
  methods: mapActions(['getSessions']),
  mounted() {
    this.getSessions()
  },
}
</script>

<style></style>
