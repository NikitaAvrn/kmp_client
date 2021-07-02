<template>
  <div>
    <loading v-if="!REQUEST_PROCCESSING" />
    <div v-else>
      <div class="row">{{REQUEST_PROCCESSING}}
        <div class="input-field col s12">
          <select ref="client">
            <option value="" disabled selected>Выберете контрагента</option>
            <option data-icon="./android-chrome-192x192.png" value="1"
              >КМП</option
            >
            <option value="2">ФИТ</option>
            <option value="3">Шамса-Боттлерс</option>
          </select>
          <label>Контрагент</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="row">
            <div class="input-field col s12">
              <input type="text" id="autocomplete-input" class="autocomplete" />
              <label for="autocomplete-input">Грузоотправитель</label>
            </div>
          </div>
        </div>
        <div class="col s12 m6">
          <p>
            <label>
              <input type="checkbox" />
              <span>Контрагент - грузоотправитель</span>
            </label>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="row">
            <div class="input-field col s12">
              <input type="text" id="autocomplete-input" class="autocomplete" />
              <label for="autocomplete-input">Грузоотправитель</label>
            </div>
          </div>
        </div>
        <div class="col s12 m6">
          <p>
            <label>
              <input type="checkbox" />
              <span>Контрагент - грузополучатель</span>
            </label>
          </p>
        </div>
      </div>
      <!-- <hr /> -->
      <div class="row">
        <div class="col s12 m6">
          <div class="row">
            <div class="input-field col s12">
              <input type="text" id="autocomplete-input" class="autocomplete" />
              <label for="autocomplete-input">Порт отправления</label>
            </div>
          </div>
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
          <div class="row">
            <div class="input-field col s12">
              <input type="text" id="autocomplete-input" class="autocomplete" />
              <label for="autocomplete-input">Порт назначения</label>
            </div>
          </div>
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
        <div class="col s12">
          <p>
            <label>
              <input name="transportationType" type="radio" v-model="REQUEST_PROCCESSING.transportationType" />
              <span>Каботаж</span>
            </label>
          </p>
          <p>
            <label>
              <input name="transportationType" type="radio" v-model="REQUEST_PROCCESSING.transportationType" />
              <span>ПСЖВС</span>
            </label>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <p>
            <label>
              <input type="checkbox" />
              <span>Автоперевозка при отправке</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" />
              <span>Автоперевозка при получении</span>
            </label>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input id="first_name" type="text" class="validate" />
              <label for="first_name">Дополнительное ТЭО</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input id="first_name" type="text" class="validate" />
              <label for="first_name">Особые отметки в заявке</label>
            </div>
          </div>
        </div>
      </div>
      <!-- <hr /> -->
      <div class="row">
        <div class="input-field col s12">
          <select ref="typeContainer">
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
      <div class="row">
        <div class="input-field col s12 m2">
          <input
            id="count_container"
            type="number"
            min="1"
            max="99"
            value="1"
            class="validate"
          />
          <label for="count_container">Количество контейнеров</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <p>
            <label>
              <input name="group2" type="radio" checked />
              <span>20-футовый контейнер</span>
            </label>
          </p>
          <p>
            <label>
              <input name="group2" type="radio" />
              <span>40-футовый контейнер</span>
            </label>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <p>
            <label>
              <input type="checkbox" />
              <span>Возврат порожнего контейнера</span>
            </label>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <select ref="owner">
            <option value="" disabled selected
              >Выберете собственника контейнера</option
            >
            <option value="1">КМП (COC)</option>
            <option value="2">Контрагент (SOC)</option>
            <option value="3">ФИТ</option>
            <option value="4">Трансконтейнер</option>
            <option value="5">Аренда</option>
          </select>
          <label>Собственник контейнера</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <select ref="typeGeneral">
            <option value="" disabled selected
              >Выберете тип генерального груза</option
            >
            <option value="1">Обычный груз</option>
            <option value="2"
              >Прокат черных металлов, арматура, трубы металлические (МД до 159
              мм)</option
            >
            <option value="3"
              >Трубы металлические СД (от 159.1 мм. до 400 мм.)</option
            >
            <option value="4">Трубы металлические БД (от 400.1 мм.)</option>
          </select>
          <label>Собственник контейнера</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input"
            >Отговорка на возврат порожнего контейнера</label
          >
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input"
            >Порт назначения порожнего контейнера</label
          >
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 m2">
          <input type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">Температура</label>
        </div>
        <div class="input-field col s6 m2">
          <input type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">Вентиляция</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 m2">
          <input type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">В порту отправления</label>
        </div>
        <div class="input-field col s6 m2">
          <input type="text" id="autocomplete-input" class="autocomplete" />
          <label for="autocomplete-input">В порту назначения</label>
        </div>
      </div>
      <!-- <hr /> -->
      <div class="row">
        <div class="input-field col s12 m6">
          <input id="first_name" type="text" class="validate" />
          <label for="first_name">Груз</label>
        </div>
        <div class="input-field col s12 m6">
          <input id="first_name" type="text" class="validate" />
          <label for="first_name">Дополнительное наименование груза</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '../app/Loading.vue';

export default {
  props: ['number'],
  components: { Loading },
  computed: {
    ...mapGetters(['REQUEST_PROCCESSING']),
  },
  data: () => ({
    client: null,
    typeContainer: null,
    typeGeneral: null,
    owner: null,
  }),
  methods: {
    ...mapActions(['getRequestByNumber']),
  },
  async mounted() {
    if(!await this.getRequestByNumber(this.number)) {
      this.$router.push('/requests')
    }    
    this.client = M.FormSelect.init(this.$refs.client, {});
    this.owner = M.FormSelect.init(this.$refs.owner, {});
    this.typeGeneral = M.FormSelect.init(this.$refs.typeGeneral, {});
    this.typeContainer = M.FormSelect.init(this.$refs.typeContainer, {});
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  beforeDestroy() {
    if (this.client && this.client.destroy) {
      this.client.destroy();
    }
    if (this.owner && this.owner.destroy) {
      this.owner.destroy();
    }
    if (this.typeGeneral && this.typeGeneral.destroy) {
      this.typeGeneral.destroy();
    }
    if (this.typeContainer && this.typeContainer.destroy) {
      this.typeContainer.destroy();
    }
  },
};
</script>

<style></style>
