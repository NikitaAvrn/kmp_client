<template>
  <div>
    <div class="page-title hide-on-large-only">
      <h3>{{ $route.name }}</h3>
    </div>
    <loading v-if="loading" />
    <div>
      <div class="row" v-show="!loading">
        <div class="input-field col s12">
          <i class="material-icons prefix">search</i>
          <input id="icon_prefix" type="text" v-model.trim="find" />
          <label for="icon_prefix">Поиск груза</label>
        </div>
      </div>
      <ul class="collapsible popout" ref="collapsible">
        <timeline-move v-for="conosament in activeCosnosament" :key="conosament.conosament" :document="conosament" />
      </ul>
    </div>
  </div>
</template>

<script>
import TimelineMove from '../components/TimelineMove.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Loading from '../components/app/Loading.vue'

export default {
  metaInfo: {
    title: 'Дислокация груза',
  },
  computed: {
    ...mapGetters(['ACTIVE_CONOSAMENT']),
    activeCosnosament() {
      if (!(this.ACTIVE_CONOSAMENT && this.ACTIVE_CONOSAMENT.length)) {
        return []
      }
      if (this.find === '') {
        return this.ACTIVE_CONOSAMENT
      }
      let find = this.find.toLowerCase()
      let list = this.ACTIVE_CONOSAMENT.filter((str) => {
        if (str.conosament && str.conosament.toLowerCase().includes(this.find)) {
          return true
        }
        if (str.container && str.container.toLowerCase().includes(this.find)) {
          return true
        }
        if (str.request && str.request.toLowerCase().includes(this.find)) {
          return true
        }
        if (str.status && str.status.toLowerCase().includes(this.find)) {
          return true
        }
        if (str.cargo && str.cargo.toLowerCase().includes(this.find)) {
          return true
        }
        if (str.ship && str.ship.toLowerCase().includes(this.find)) {
          return true
        }
        if (
          str.flight &&
          String(str.flight)
            .toLowerCase()
            .includes(this.find)
        ) {
          return true
        }
        if (str.portOut && str.portOut.toLowerCase().includes(this.find)) {
          return true
        }
        if (str.portIn && str.portIn.toLowerCase().includes(this.find)) {
          return true
        }
        if (str.move && str.move.comment && str.move.comment.toLowerCase().includes(this.find)) {
          return true
        }
        if (str.packaging && str.packaging.toLowerCase().includes(this.find)) {
          return true
        }

        return false
      })
      return list
    },
  },
  components: {
    TimelineMove,
    Loading,
  },
  data: () => ({
    collapsible: null,
    loading: true,
    find: '',
  }),
  async mounted() {
    this.loading = true
    this.CLR_ACTIVE_CONOSAMENT()
    await this.getActiveConosament()
    this.loading = false
    this.collapsible = M.Collapsible.init(this.$refs.collapsible, {})
  },
  beforeDestroy() {
    if (this.collapsible && this.collapsible.destroy) {
      this.collapsible.destroy()
    }
  },
  methods: {
    ...mapActions(['getActiveConosament']),
    ...mapMutations(['CLR_ACTIVE_CONOSAMENT']),
  },
}
</script>
