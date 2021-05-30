<template>
  <div class="row">
    <div class="input-field col s12">
      <i class="material-icons prefix">mode_edit</i>
      <textarea :id="'textarea-' + this._uid" class="materialize-textarea" :data-length="length" ref="textarea" v-model="text" @input="$emit('input', $event.target.value)"></textarea>
      <label :for="'textarea-' + this._uid">{{ label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'label', 'length'],
  data: () => ({
    text: '',
  }),
  mounted() {
    M.CharacterCounter.init(this.$refs.textarea)
    //this.text = this.value
  },
  watch: {
    value() {
      this.text = this.value
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  },
}
</script>

<style></style>
