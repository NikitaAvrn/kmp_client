<template>
  <div>
    <div class="page-title">
      <h3>{{ $route.name }}</h3>
    </div>

    <table class="centered" :class="{ striped: isMobile, highlight: !isMobile }">
      <thead>
        <tr>
          <th>Пользователь</th>
          <th class="hide-on-med-and-down">E-mail</th>
          <th class="hide-on-med-and-down">Активность</th>
          <th class="hide-on-med-and-down">Должность</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in USER_LIST" :key="user.code">
          <td>{{ user.surname }} {{ user.name }} {{ user.secondname }}</td>
          <td class="hide-on-med-and-down">{{ user.email }}</td>
          <td class="hide-on-med-and-down"></td>
          <td class="hide-on-med-and-down">{{ user.post }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <div class="fixed-action-btn">
      <router-link to="/user">
        <a class="btn-floating btn-large waves-effect waves-light blue darken-3">
          <i class="large material-icons">person_add</i>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import utils from '@/utils/utils'

export default {
  computed: {
    ...mapGetters(['USER_LIST']),
    isMobile() {
      return utils.isMobile()
    },
  },
  methods: {
    ...mapActions(['getUsers']),
  },
  mounted() {
    this.getUsers()
  },
}
</script>

<style></style>
