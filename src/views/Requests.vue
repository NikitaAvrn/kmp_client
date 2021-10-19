<template>
  <div>
    <div class="page-title hide-on-large-only">
      <h3>{{ $route.name }}</h3>
    </div>
    <loading v-if="loading" />
    <div v-else>
      <div class="row">
        <div class="input-field col s12">
          <i class="material-icons prefix">search</i>
          <input id="icon_prefix" type="text" v-model.trim="findQuery" />
          <label for="icon_prefix">Поиск по заявкам</label>
        </div>
      </div>
      <div class="row" v-for="(block, index) in req" :key="index">
        <div class="col s12 m4" v-for="request in block" :key="request.number">
          <card-request :request="request" />
        </div>
      </div>
    </div>

    <div class="fixed-action-btn">
      <router-link to="/request">
        <a class="btn-floating btn-large waves-effect waves-light blue darken-3">
          <i class="large material-icons">add</i>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CardRequest from '../components/CardRequest.vue'
import utils from '@/utils/card.utils'
import Loading from '../components/app/Loading.vue'

export default {
  metaInfo: {
    title: 'Заявки на перевозку',
  },
  components: { CardRequest, Loading },
  computed: {
    ...mapGetters(['REQUEST_LIST']),
    req() {
      if (!this.REQUEST_LIST) {
        return []
      }
      let findArray = this.REQUEST_LIST.filter((card) => {
        if (this.findQuery === '') return card
        this.findQuery = this.findQuery.toLowerCase()
        let findFlag = false

        Object.keys(card).forEach((index) => {
          if (
            String(card[index])
              .toLowerCase()
              .includes(this.findQuery)
          )
            findFlag = true
        })
        if (!findFlag) {
          card.documents.forEach((doc) => {
            Object.keys(doc).forEach((index) => {
              if (
                String(doc[index])
                  .toLowerCase()
                  .includes(this.findQuery)
              )
                findFlag = true
            })
          })
        }

        if (!findFlag) {
          Object.keys(card.invoice).forEach((index) => {
            if (
              String(card['invoice'][index])
                .toLowerCase()
                .includes(this.findQuery)
            )
              findFlag = true
          })
        }

        if (findFlag) return card
      })
      return utils.arrayCardTransform(findArray, 3)
    },
  },
  data: () => ({
    loading: false,
    findQuery: '',
  }),
  async mounted() {
    this.loading = true
    await this.getRequests()
    this.loading = false
  },
  methods: {
    ...mapActions(['getRequests']),
  },
}
</script>

<style></style>
