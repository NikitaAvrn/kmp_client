<template>
  <div class="row">
    <div class="input-field col s12">
      <i class="material-icons prefix">location_city</i>
      <input :id="'address-' + this._uid" type="text" class="autocomplete" v-model="query" @input="findAdr" autocomplete="off" ref="autocomplete" />
      <label :for="'address-' + this._uid">{{ label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'defquery'],
  data: () => ({
    query: '',
    autocomplete: null,
    lastFindArray: null,
  }),
  mounted() {
    this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
      onAutocomplete: this.onSelect,
    })
    if (this.defquery) {
      this.query = this.defquery
    }
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  destroyed() {
    if (this.autocomplete && this.autocomplete.destroy) {
      this.autocomplete.destroy()
    }
  },
  methods: {
    onSelect(e) {
      const result = this.lastFindArray.find((f) => f.value === e)
      this.$emit('input', result.value)
    },
    async findAdr() {
      if (this.query.length < 3) {
        return
      }
      const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
      const token = '2a2d3b4a0cf3e461fe8a75176c26beb67a942fb8'
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + token,
        },
        body: JSON.stringify({
          query: this.query,
        }),
      }).then((r) => r.json())
      let autodata = new Object()
      response.suggestions.forEach((r) => {
        const str = r.value
        autodata[str] = null
      })
      this.lastFindArray = response.suggestions
      this.autocomplete.updateData(autodata)
    },
  },
  watch: {
    value() {
      this.query = this.value
    },
  },
}
</script>
