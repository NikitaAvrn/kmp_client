<template>
  <div class="row">
    <div class="input-field col s12">
      <i class="material-icons prefix">directions_boat</i>
      <input type="text" id="ship" class="autocomplete" autocomplete="off" v-model.trim="ship" @input="findShip" ref="shipflight" />
      <label for="ship">Название т/х или рейс</label>
    </div>
  </div>
</template>

<script>
import config from '@/store/config.json'
import { mapGetters } from 'vuex'

export default {
  props: ['minlength'],
  computed: mapGetters(['SID']),
  data: () => ({
    ship: '',
    shipflight: null,
    lastResult: [],
  }),
  mounted() {
    this.shipflight = M.Autocomplete.init(this.$refs.shipflight, {
      minLength: this.minlength,
      onAutocomplete: this.autocomplete,
    })
  },
  beforeDestroy() {
    if (this.shipflight && this.shipflight.destroy) {
      this.shipflight.destroy()
    }
  },
  methods: {
    autocomplete(event) {
      let select
      this.lastResult.forEach((r) => {
        if (r.title === event) {
          select = r
        }
      })
      this.$emit('select-flight', select)
    },
    async findShip() {
      this.shipflight.updateData({})
      this.lastResult = []
      if (this.ship.length < this.minlength) {
        return
      }
      //todo
      let response = await fetch(`${config.server}directory/flight&query=${this.ship}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=utf-8; CISID=' + this.SID,
        },
      }).then((r) => r.json())

      let autocompleteData = {}
      if (response.results) {
        response.results.forEach((r) => {
          autocompleteData[r.title] = null
        })
        this.lastResult = response.results
      }

      this.shipflight.updateData(autocompleteData)
      this.shipflight.open()
    },
  },
}
</script>

<style></style>
