<template>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" :id="'cargo-' + this._uid" v-model="cargoQuery" class="autocomplete" ref="autocomplete" @input="findCargo" autocomplete="off" />
      <label :for="'cargo-' + this._uid">{{ label }}</label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['value', 'label'],
  data: () => ({
    autocomplete: null,
    cargoQuery: '',
  }),
  computed: {
    ...mapGetters(['CARGO_LIST', 'CARGO']),
  },
  mounted() {
    this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
      data: {},
      minLength: 3,
      onAutocomplete: this.onAutocomplete,
    })
    if (this.value) {
      this.updateText(this.value)
    }
  },
  beforeDestroy() {
    if (this.autocomplete && this.autocomplete.destroy) {
      this.autocomplete.destroy()
    }
  },
  methods: {
    ...mapActions(['getFindCargoes', 'getCargoById']),
    async updateText(id) {
      await this.getCargoById(id)
      this.cargoQuery = this.CARGO.title
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
    async findCargo() {
      this.autocomplete.updateData({})
      if (this.cargoQuery.length < 3) {
        return
      }
      await this.getFindCargoes(this.cargoQuery)
      if (!this.CARGO_LIST) {
        return
      }
      let updateData = {}
      this.CARGO_LIST.forEach((c) => {
        updateData[c.title] = null
      })
      this.autocomplete.updateData(updateData)
      this.autocomplete.open()
    },
    onAutocomplete(e) {
      let code
      this.CARGO_LIST.forEach((c) => {
        if (c.title.trim() == e) {
          code = c.code
        }
      })
      this.$emit('input', code)
    },
  },
}
</script>

<style></style>
