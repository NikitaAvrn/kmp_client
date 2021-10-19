<template>
  <div>
    <div class="page-title hide-on-large-only">
      <h3>{{ $route.name }}</h3>
    </div>
    <loading v-if="loading" />
    <div v-else>
      <h5 class="center">Здравствуйте, {{ USER.name }} {{ USER.secondname }}</h5>
      <schedule-table v-for="(table, inx) in SCHEDULE" :key="inx" :table="table" />
      <p>
        Примечания:<br />* ETA (Estimated Time of Arrival) — ожидаемая дата прибытия<br />* ETD (Estimated Time of Departure) — ожидаемая дата отправки<br />Расписание
        может быть изменено Перевозчиком без предварительного уведомления.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from '../components/app/Loading.vue'
import ScheduleTable from '../components/ScheduleTable.vue'

export default {
  metaInfo: {
    title: 'Информация',
  },
  computed: {
    ...mapGetters(['SCHEDULE', 'USER']),
  },
  components: {
    Loading,
    ScheduleTable,
  },
  data: () => ({
    collapsible: null,
    loading: true,
  }),
  async mounted() {
    this.loading = true
    await this.getHomeSchedule()
    this.loading = false
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(['getHomeSchedule']),
  },
}
</script>
