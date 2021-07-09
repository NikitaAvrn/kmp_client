<template>
  <div class="card white">
    <div class="card-content black-text">
      <span class="card-title">{{ document.document }}</span>
      <cargo-autocomplete label="Груз" v-model="document.cargo" ref="cargo" />
      <container-autocomplete v-if="(document.packaging = 60)" label="Контейнер" v-model="document.container" />
      <div class="row">
        <div class="input-field col s12">
          <input id="weight" type="text" v-model="document.weight" />
          <label for="weight">Вес груза</label>
        </div>
      </div>
      <packaging-autocomplete v-show="document.packaging != 60" label="Упаковка" v-model="document.packaging" />
      <div class="row" v-show="(document.packaging = 60)">
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
      <a href="#" class="black-text hide-on-med-and-down" @click.prevent="printConosament(document.document)"><i class="material-icons left">print</i></a>
      <a href="#" class="black-text"><i class="material-icons left">download</i></a>
      <a href="#" class="black-text"><i class="material-icons left">email</i></a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CargoAutocomplete from './CargoAutocomplete.vue'
import ContainerAutocomplete from './ContainerAutocomplete.vue'
import PackagingAutocomplete from './PackagingAutocomplete.vue'
export default {
  components: { CargoAutocomplete, ContainerAutocomplete, PackagingAutocomplete },
  props: ['document'],
  computed: {
    ...mapGetters(['PRINT_CONTENT']),
  },
  data: () => ({
    collapsible: null,
  }),
  mounted() {
    this.collapsible = M.Collapsible.init(this.$refs.collapsible, {})
  },
  methods: {
    ...mapActions(['getConosamentPrint']),
    async printConosament(document) {
      await this.getConosamentPrint(document)

      let windowPrint = window.open('_blank', 'print-invoice', 'left=50,top=50,width=1024,height=768,toolbar=0,location=yes,resizable=yes,scrollbars=yes,status=yes')
      windowPrint.document.write('<title>Печать коносамента ' + document + '</title>')
      windowPrint.document.write('<link rel="stylesheet" href="http://340.ru/css/pr.css" type="text/css" />')
      windowPrint.document.write('<div>')
      windowPrint.document.write(this.PRINT_CONTENT)
      windowPrint.document.write('</div>')
      windowPrint.document.close()
      windowPrint.focus()
      windowPrint.onload = () => {
        windowPrint.print()
      }
      windowPrint.onafterprint = () => {
        windowPrint.close()
      }
    },
  },
}
</script>

<style>
.collapsible-btns {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
