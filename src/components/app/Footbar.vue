<template>
  <footer class="page-footer blue darken-3">
    <div class="footer-copyright">
      <div class="container">
        © 2021 ООО «КМП»
        <a class="grey-text text-lighten-4 right" href="#" @click.prevent="clickUpButton"><i class="material-icons left">arrow_upward</i>Наверх</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    clickUpButton() {
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style>
footer {
  padding-top: 0 !important;
}
</style>
