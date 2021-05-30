<template>
  <div>
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix">{{ icon }}</i>
        <input type="text" :id="this._uid" class="autocomplete" v-model="input" ref="autocomplete" autocomplete="off" @change="selectAutocoplite($event.target.value)" />
        <label :for="this._uid">{{ label }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['icon', 'label', 'array', 'findField', 'value'],
  data: () => ({
    autocomplete: null,
    input: '',
  }),
  mounted() {
    this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
      minLength: 2,
      data: this.getObjectData(),
    })
  },
  destroyed() {
    if (this.autocomplete && this.autocomplete.destroy) {
      this.autocomplete.destroy()
    }
  },
  methods: {
    selectAutocoplite(e) {
      let value = this.array.find((a) => a[this.findField].toUpperCase().trim() === e.toUpperCase().trim() && a.active)
      this.$emit('return-obj', value)
    },
    getObjectData() {
      let objData = new Object()
      this.array.map((a) => {
        if (a.active) {
          objData[a[this.findField]] = null
        }
      })
      return objData
    },
  },
  watch: {
    array() {
      this.autocomplete.updateData(this.getObjectData())
    },
    value() {
      if (this.value) {
        this.input = this.value[this.findField]
      } else {
        this.input = ''
      }
    },
  },
}
</script>
