<template>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" :id="'client-' + this._uid" v-model="clientQuery" class="autocomplete" ref="autocomplete" @input="findClient" autocomplete="off" />
      <label :for="'client-' + this._uid">{{ label }}</label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['value', 'label'],
  data: () => ({
    autocomplete: null,
    clientQuery: '',
  }),
  computed: {
    ...mapGetters(['CLIENT_LIST', 'CLIENT']),
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
    ...mapActions(['getFindClients', 'getClientById']),
    async updateText(id) {
      await this.getClientById(id)
      this.clientQuery = this.CLIENT.title
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
    async findClient() {
      this.autocomplete.updateData({})
      if (this.clientQuery.length < 3) {
        return
      }
      await this.getFindClients(this.clientQuery)
      if (!this.CLIENT_LIST) {
        return
      }
      let updateData = {}
      this.CLIENT_LIST.forEach((c) => {
        updateData[c.title] = null
      })
      this.autocomplete.updateData(updateData)
      this.autocomplete.open()
    },
    onAutocomplete(e) {
      let code
      this.CLIENT_LIST.forEach((c) => {
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
