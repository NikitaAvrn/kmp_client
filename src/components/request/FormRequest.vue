<template>
  <div>
    <loading v-if="!REQUEST_PROCCESSING" />
    <div v-else>
      <div class="row">
        <div class="col s12 m6">
          <my-clients v-model="REQUEST_PROCCESSING.client" />
        </div>
        <div class="input-field col s12 m6">
          <input type="text" id="contract" readonly v-model="REQUEST_PROCCESSING.contract" />
          <label for="contract">Договор</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <client-autocomplete label="Грузоотправитель" v-model="REQUEST_PROCCESSING.shipper" ref="shipper" />
        </div>
        <div class="col s12 m6">
          <p>
            <label>
              <input type="checkbox" v-model="shipperAsClient" />
              <span>Клиент - грузоотправитель</span>
            </label>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="row">
            <div class="col s12">
              <client-autocomplete label="Грузополучатель" v-model="REQUEST_PROCCESSING.consignee" ref="consignee" />
            </div>
          </div>
        </div>
        <div class="col s12 m6">
          <p>
            <label>
              <input type="checkbox" v-model="consigneeAsClient" />
              <span>Клиент - грузополучатель</span>
            </label>
          </p>
        </div>
      </div>
      <!-- <hr /> -->
      <div class="row">
        <div class="col s12 m6">
          <port-autocomplete label="Порт отправления" v-model="REQUEST_PROCCESSING.portDispatch" ref="portDispatch" />
        </div>
        <div class="col s12 m6">
          <div class="row">
            <div class="input-field col s12">
              <input type="text" id="fromShipment" v-model="REQUEST_PROCCESSING.fromShipment" class="autocomplete" />
              <label for="fromShipment">Пункт отправления</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <port-autocomplete label="Порт назначения" v-model="REQUEST_PROCCESSING.portDestination" ref="portDestination" />
        </div>
        <div class="col s12 m6">
          <div class="row">
            <div class="input-field col s12">
              <input type="text" id="autocomplete-input" v-model="REQUEST_PROCCESSING.toShipment" class="autocomplete" />
              <label for="autocomplete-input">Пункт назначения</label>
            </div>
          </div>
        </div>
      </div>
      <!-- <hr /> -->
      <div class="row">
        <div class="col s12 m6">
          <p>
            <label>
              <input id="transportationType1" value="1" type="radio" v-model="REQUEST_PROCCESSING.transportationType" />
              <span>Каботаж</span>
            </label>
          </p>
          <p>
            <label>
              <input id="transportationType2" value="2" type="radio" v-model="REQUEST_PROCCESSING.transportationType" />
              <span>ПСЖВС</span>
            </label>
          </p>
        </div>
        <div class="col s12 m6">
          <p>
            <label>
              <input type="checkbox" v-model="REQUEST_PROCCESSING.autoWhenSending" />
              <span>Автоперевозка при отправке</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" v-model="REQUEST_PROCCESSING.autoUponReceipt" />
              <span>Автоперевозка при получении</span>
            </label>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input id="additionaServices" type="text" v-model="REQUEST_PROCCESSING.additionaServices" />
              <label for="additionaServices">Дополнительное ТЭО</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input id="orderSpecialNotes" type="text" v-model="REQUEST_PROCCESSING.orderSpecialNotes" />
              <label for="orderSpecialNotes">Особые отметки в заявке</label>
            </div>
          </div>
        </div>
      </div>
      <!-- <hr /> -->
      <div class="row">
        <div class="input-field col s12">
          <select v-model="REQUEST_PROCCESSING.cargoType" ref="typeContainer">
            <option value="" disabled selected>Выберете тип перевозки</option>
            <option value="1">Рефрижераторный контейнер</option>
            <option value="2">Контейнер-термос</option>
            <option value="3">Сухой контейнер</option>
            <option value="4">Генеральный груз</option>
            <option value="5">Автотехника</option>
          </select>
          <label>Тип перевозки</label>
        </div>
      </div>
      <div class="row" v-show="REQUEST_PROCCESSING.cargoType < 4">
        <div class="col s12">
          <p>
            <label>
              <input id="containerSize20" value="20" v-model="REQUEST_PROCCESSING.containerSize" type="radio" />
              <span>20-футовый контейнер</span>
            </label>
          </p>
          <p>
            <label>
              <input id="containerSize40" value="40" v-model="REQUEST_PROCCESSING.containerSize" type="radio" />
              <span>40-футовый контейнер</span>
            </label>
          </p>
        </div>
      </div>
      <div class="row" v-show="REQUEST_PROCCESSING.cargoType < 4">
        <div class="input-field col s12 m6">
          <input id="count_container" type="number" min="1" max="99" value="1" v-model="REQUEST_PROCCESSING.containerCount" />
          <label for="count_container">Количество контейнеров</label>
        </div>
        <div class="col s12 m6">
          <p>
            <label>
              <input type="checkbox" v-model="REQUEST_PROCCESSING.emptyReturning" />
              <span>Возврат порожнего контейнера</span>
            </label>
          </p>
        </div>
      </div>
      <div class="row" v-show="REQUEST_PROCCESSING.cargoType < 4">
        <div class="input-field col s12">
          <select v-model="REQUEST_PROCCESSING.containerOwner" ref="owner">
            <option value="" disabled selected>Выберете собственника контейнера</option>
            <option value="1">КМП (COC)</option>
            <option value="0">Контрагент (SOC)</option>
            <option value="41390">ФИТ</option>
            <option value="713">Трансконтейнер</option>
            <option value="43891">Аренда</option>
          </select>
          <label>Собственник контейнера</label>
        </div>
      </div>
      <div class="row" v-show="REQUEST_PROCCESSING.cargoType > 3">
        <div class="input-field col s12">
          <select v-model="REQUEST_PROCCESSING.generalCargoType" ref="typeGeneral">
            <option value="" disabled selected>Выберете тип генерального груза</option>
            <option value="0">Обычный груз</option>
            <option value="1">Прокат черных металлов, арматура, трубы металлические (МД до 159 мм)</option>
            <option value="2">Трубы металлические СД (от 159.1 мм. до 400 мм.)</option>
            <option value="3">Трубы металлические БД (от 400.1 мм.)</option>
          </select>
          <label>Тип генерального груза</label>
        </div>
      </div>
      <div class="row" v-show="REQUEST_PROCCESSING.cargoType < 4 && REQUEST_PROCCESSING.emptyReturning">
        <div class="input-field col s12">
          <input type="text" id="disclaimerEmptyReturning" class="autocomplete" v-model="REQUEST_PROCCESSING.disclaimerEmptyReturning" />
          <label for="disclaimerEmptyReturning">Отговорка на возврат порожнего контейнера</label>
        </div>
      </div>
      <div class="row" v-show="REQUEST_PROCCESSING.cargoType < 4 && REQUEST_PROCCESSING.emptyReturning">
        <div class="col s12">
          <port-autocomplete label="Порт возврата порожнего" v-model="REQUEST_PROCCESSING.portReturn" ref="portReturn" />
        </div>
      </div>
      <div class="row" v-show="REQUEST_PROCCESSING.cargoType == 1">
        <div class="input-field col s6 m6">
          <input type="text" id="temperature" v-model.number="REQUEST_PROCCESSING.temperature" />
          <label for="temperature">Температура</label>
        </div>
        <div class="input-field col s6 m6">
          <input type="text" id="ventilation" v-model.number="REQUEST_PROCCESSING.ventilation" />
          <label for="ventilation">Вентиляция</label>
        </div>
      </div>
      <div class="row" v-show="REQUEST_PROCCESSING.cargoType == 1">
        <div class="input-field col s6 m6">
          <input type="text" id="sendPortConnectionMode" v-model="REQUEST_PROCCESSING.sendPortConnectionMode" />
          <label for="sendPortConnectionMode">В порту отправления</label>
        </div>
        <div class="input-field col s6 m6">
          <input type="text" id="destinationPortConnectionMode" v-model="REQUEST_PROCCESSING.destinationPortConnectionMode" />
          <label for="destinationPortConnectionMode">В порту назначения</label>
        </div>
      </div>
      <!-- <hr /> -->
      <div class="row" v-show="REQUEST_PROCCESSING.cargoType < 4">
        <div class="col s12 m6">
          <cargo-autocomplete label="Груз" v-model="REQUEST_PROCCESSING.containerCargo" ref="cargo" />
        </div>
        <div class="input-field col s12 m6">
          <input id="cargoTitleAdd" type="text" v-model="REQUEST_PROCCESSING.containerCargoAdd" class="validate" />
          <label for="cargoTitleAdd">Дополнительное наименование груза</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '../app/Loading.vue'
import MyClients from '../app/MyClients.vue'
import CargoAutocomplete from '../CargoAutocomplete.vue'
import ClientAutocomplete from '../ClientAutocomplete.vue'
import PortAutocomplete from '../PortAutocomplete.vue'

export default {
  components: { Loading, MyClients, ClientAutocomplete, PortAutocomplete, CargoAutocomplete },
  computed: {
    ...mapGetters(['REQUEST_PROCCESSING']),
    shipperAsClient: {
      get() {
        if (this.REQUEST_PROCCESSING) {
          if (this.REQUEST_PROCCESSING.shipper === this.REQUEST_PROCCESSING.client) {
            return true
          }
        }
        return false
      },
      set(value) {
        if (value) {
          this.REQUEST_PROCCESSING.shipper = this.REQUEST_PROCCESSING.client
          this.$refs.shipper.updateText(this.REQUEST_PROCCESSING.client)
        }
      },
    },
    consigneeAsClient: {
      get() {
        if (this.REQUEST_PROCCESSING) {
          if (this.REQUEST_PROCCESSING.consignee === this.REQUEST_PROCCESSING.client) {
            return true
          }
        }
        return false
      },
      set(value) {
        if (value) {
          this.REQUEST_PROCCESSING.consignee = this.REQUEST_PROCCESSING.client
          this.$refs.consignee.updateText(this.REQUEST_PROCCESSING.client)
        }
      },
    },
  },
  data: () => ({
    typeContainer: null,
    typeGeneral: null,
    owner: null,
  }),
  methods: {
    ...mapActions(['getRequestByNumber']),
    asClient(el) {
      this.REQUEST_PROCCESSING[el] = this.REQUEST_PROCCESSING.client
    },
  },
  async mounted() {
    this.owner = M.FormSelect.init(this.$refs.owner, {})
    this.typeGeneral = M.FormSelect.init(this.$refs.typeGeneral, {})
    this.typeContainer = M.FormSelect.init(this.$refs.typeContainer, {})
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  beforeDestroy() {
    if (this.owner && this.owner.destroy) {
      this.owner.destroy()
    }
    if (this.typeGeneral && this.typeGeneral.destroy) {
      this.typeGeneral.destroy()
    }
    if (this.typeContainer && this.typeContainer.destroy) {
      this.typeContainer.destroy()
    }
  },
}
</script>

<style></style>
