<template>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" :id="'client-' + this._uid" v-model="clientQuery" class="autocomplete" ref="autocomplete" @input="findClient" autocomplete="off" />
      <label :for="'client-' + this._uid">Грузоотправитель</label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['value'],
  data: () => ({
    autocomplete: null,
    clientQuery: '',
  }),
  computed: {
    ...mapGetters(['CLIENT_LIST'])
  },
  async beforeMount() {
    if (this.value) {
      this.getClientById(this.value)
    }
  },
  mounted() {
    this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
      data: {},
      minLength: 3,
      onAutocomplete: this.onAutocomplete
    })
  },
  beforeDestroy() {
    if (this.autocomplete && this.autocomplete.destroy) {
      this.autocomplete.destroy()
    }
  },
  methods: {
    ...mapActions(['getFindClients', 'getClientById']),
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
      this.CLIENT_LIST.forEach(c => {
        updateData[c.title] = null
      })
      this.autocomplete.updateData(updateData)
      this.autocomplete.open()
    },
    onAutocomplete(e) {
      let code
      this.CLIENT_LIST.forEach(c => {
        if (c.title.trim() == e) {
          code = c.code
        }
      })
      this.$emit('input', code)
    }
  }
}
</script>

<style>

</style>