<template>
  <div class="card white">
    <div class="card-content black-text">
      <span class="card-title">{{ document.document }}</span>
      <cargo-autocomplete label="Груз" v-model="document.cargo" ref="cargo" />
      <container-autocomplete v-if="document.packaging = 60" label="Контейнер" v-model="document.container" />
      <div class="row">
        <div class="input-field col s12">
          <input id="weight" type="text" v-model="document.weight" />
          <label for="weight">Вес груза</label>
        </div>
      </div>
      <div class="row"  v-show="document.packaging != 60">
        <div class="input-field col s12">
          <input id="packaging" type="text" v-model.number="document.packaging" />
          <label for="packaging">Упаковка</label>
        </div>
      </div>
      <div class="row" v-show="document.packaging = 60">
        <div class="input-field col s12">
          <input id="seal" type="text" v-model="document.seal" />
          <label for="seal">Пломба</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="railBill" type="text" v-model="document.railBill" />
          <label for="railBill">Ж/Д накладная</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="carriage" type="text" v-model="document.carriage" />
          <label for="carriage">Вагон</label>
        </div>
      </div>
      <div class="row" v-show="document.packaging != 60">
        <div class="input-field col s4">
          <input id="length" type="text" v-model.number="document.length" />
          <label for="length">Длина</label>
        </div>
        <div class="input-field col s4">
          <input id="width" type="text" v-model.number="document.width" />
          <label for="width">Ширина</label>
        </div>
        <div class="input-field col s4">
          <input id="height" type="text" v-model.number="document.height" />
          <label for="height">Высота</label>
        </div>
      </div>
    </div>
    <div class="card-action">
      <a href="#" class="black-text"><i class="material-icons left">print</i></a>
      <a href="#" class="black-text"><i class="material-icons left">download</i></a>
      <a href="#" class="black-text"><i class="material-icons left">email</i></a>
    </div>
  </div>
</template>

<script>
import CargoAutocomplete from './CargoAutocomplete.vue'
import ContainerAutocomplete from './ContainerAutocomplete.vue'
export default {
  components: { CargoAutocomplete, ContainerAutocomplete },
  props: ['document'],
  data: () => ({
    collapsible: null,
  }),
  mounted() {
    this.collapsible = M.Collapsible.init(this.$refs.collapsible, {})
  },
}
</script>

<style>
.collapsible-btns {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
