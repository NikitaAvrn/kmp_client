<template>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" :id="'port-' + this._uid" v-model="portQuery" class="autocomplete" ref="autocomplete" @input="findPort" autocomplete="off" />
      <label :for="'port-' + this._uid">{{ label }}</label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['value', 'label'],
  data: () => ({
    autocomplete: null,
    portQuery: '',
  }),
  computed: {
    ...mapGetters(['PORT_LIST', 'PORT']),
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
    ...mapActions(['getFindPorts', 'getPortById']),
    async updateText(id) {
      await this.getPortById(id)
      this.portQuery = this.PORT.title
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
    async findPort() {
      this.autocomplete.updateData({})
      if (this.portQuery.length < 3) {
        return
      }
      await this.getFindPorts(this.portQuery)
      if (!this.PORT_LIST) {
        return
      }
      let updateData = {}
      this.PORT_LIST.forEach((p) => {
        updateData[p.title] = null
      })
      this.autocomplete.updateData(updateData)
      this.autocomplete.open()
    },
    onAutocomplete(e) {
      let code
      this.PORT_LIST.forEach((p) => {
        if (p.title.trim() == e) {
          code = p.code
        }
      })
      this.$emit('input', code)
    },
  },
}
</script>

<style></style>
