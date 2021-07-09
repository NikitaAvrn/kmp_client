<template>
  <div class="row">
    <div class="input-field col s12">
      <input type="text" :id="'packaging-' + this._uid" v-model="packagingQuery" class="autocomplete" ref="autocomplete" @input="findPackaging" autocomplete="off" />
      <label :for="'packaging-' + this._uid">{{ label }}</label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['value', 'label'],
  data: () => ({
    autocomplete: null,
    packagingQuery: '',
  }),
  computed: {
    ...mapGetters(['PACKAGING_LIST', 'PACKAGING']),
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
    ...mapActions(['getFindPackagings', 'getPackagingById']),
    async updateText(id) {
      await this.getPackagingById(id)
      this.packagingQuery = this.PACKAGING.title
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
    async findPackaging() {
      this.autocomplete.updateData({})
      if (this.packagingQuery.length < 3) {
        return
      }
      await this.getFindPackagings(this.packagingQuery)
      if (!this.PACKAGING_LIST) {
        return
      }
      let updateData = {}
      this.PACKAGING_LIST.forEach((c) => {
        updateData[c.title] = null
      })
      this.autocomplete.updateData(updateData)
      this.autocomplete.open()
    },
    onAutocomplete(e) {
      let code
      this.PACKAGING_LIST.forEach((c) => {
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
