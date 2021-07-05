<template>
  <div>
    <div class="page-title hide-on-large-only">
      <h3>{{ $route.name }}</h3>
    </div>
    <div class="row">
      <div class="col s12">
        <ul id="tabs-swipe" class="tabs" ref="tabs">
          <li class="tab col s4"><a href="#form-request">Заявка</a></li>
          <li class="tab col s4"><a href="#documents">Коносаменты</a></li>
          <li class="tab col s4"><a href="#invoice">Счет</a></li>
        </ul>
      </div>
    </div>

    <div id="form-request" class="col s12">
      <form-request :number="$route.query.number" />
    </div>
    <div id="documents" class="col s12">
      <div class="row">
        <div class="col s12">
          Коносаменты
        </div>
      </div>
    </div>
    <div id="invoice" class="col s12">
      <div class="row">
        <div class="col s12">
          Счет
        </div>
      </div>
    </div>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large waves-effect waves-light green darken-1">
        <i class="large material-icons">save</i>
      </a>
    </div>
  </div>
</template>

<script>
import FormRequest from '../components/request/FormRequest.vue'
import utils from '@/utils/utils'

export default {
  components: { FormRequest },
  computed: {
    swipeable() {
      return utils.isMobile()
    }
  },
  data: () => ({
    tabs: null
  }),
  mounted() {
    this.tabs = M.Tabs.init(this.$refs.tabs, {
      swipeable: this.swipeable
    });
  },
  beforeDestroy() {
    if (this.tabs && this.tabs.destroy) {
      this.tabs.destroy();
    }
  },
}
</script>

<style></style>
