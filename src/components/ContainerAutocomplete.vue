<template>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" :id="'container-' + this._uid" v-model="containerQuery" class="autocomplete" ref="autocomplete" @input="findContainer" autocomplete="off" />
      <label :for="'container-' + this._uid">{{ label }}</label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['value', 'label'],
  data: () => ({
    autocomplete: null,
    containerQuery: '',
  }),
  computed: {
    ...mapGetters(['CONTAINER_LIST', 'CONTAINER']),
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
    ...mapActions(['getFindContainers', 'getContainerById']),
    async updateText(id) {
      await this.getContainerById(id)
      this.containerQuery = this.CONTAINER.code
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
    async findContainer() {
      this.autocomplete.updateData({})
      if (this.containerQuery.length < 3) {
        return
      }
      await this.getFindContainers(this.containerQuery)
      if (!this.CONTAINER_LIST) {
        return
      }
      let updateData = {}
      this.CONTAINER_LIST.forEach((c) => {
        updateData[c.code] = null
      })
      this.autocomplete.updateData(updateData)
      this.autocomplete.open()
    },
    onAutocomplete(e) {
      let code
      this.CONTAINER_LIST.forEach((c) => {
        if (c.code.trim() == e) {
          code = c.code
        }
      })
      this.$emit('input', code)
    },
  },
}
</script>

<style></style>
