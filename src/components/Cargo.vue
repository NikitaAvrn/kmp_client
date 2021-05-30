<template>
  <div class="row">
    <div class="input-field col s12">
      <i class="material-icons prefix">get_app</i>
      <input type="text" :id="'cargo-input-' + this._uid" v-model="cargo" @input="cargoTitleChange" v-uppercase autocomplete="off" class="autocomplete" ref="autocomplete">
      <label :for="'cargo-input-' + this._uid">{{ label }}</label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: ['value', 'label'],
  computed: {
    ...mapGetters(['CARGO_LIST'])
  },
  data: () => ({
    autocomplete: null,
    cargo: '',
  }),
  async beforeMount() {
    await this.getCargoList()
  },
  mounted() {
    this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
      data: {},
      minLength: 2,
      onAutocomplete: this.onSelectCargo
    })
  },
  beforeDestroy() {
    if(this.autocomplete && this.autocomplete.destroy) {
      this.autocomplete.destroy()
    }
  },
  methods: {
    ...mapActions(['getCargoList']),
    ...mapMutations(['ADD_CARGO_LIST']),
    cargoTitleChange() {
      this.$emit('input', this.cargo)
    },
    onSelectCargo(cargo) {
      let selectCargo  = this.CARGO_LIST.find(c => cargo == c)
      if(!selectCargo) {
        selectCargo = { title: cargo }
      }
      this.$emit('input', selectCargo)
    }
  },
  watch: {
    CARGO_LIST() {
      let cargoList = {}
      this.CARGO_LIST.forEach(cargo => {
        cargoList[cargo] = null
      })
      this.autocomplete.updateData(cargoList)
    },
    value() {
      this.cargo = this.value
    }
  }
}
</script>

<style>

</style>