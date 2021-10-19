<template>
  <div>
    <div class="page-title hide-on-large-only">
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
        <tr v-for="user in userList" :key="user.code">
          <td :class="{ 'grey-text': !user.activated }">{{ user.surname }} {{ user.name }} {{ user.secondname }}</td>
          <td class="hide-on-med-and-down">{{ user.email }}</td>
          <td class="hide-on-med-and-down"></td>
          <td class="hide-on-med-and-down">{{ user.post }}</td>
          <td nowrap>
            <a href="#!" class="btn waves-effect white" :class="{ 'blue-text text-darken-3': user.activated, 'grey-text': !user.activated }"
              ><i class="material-icons">edit</i></a
            >
            <a
              href="#!"
              class="btn waves-effect white hide-on-med-and-down"
              :class="{ 'blue-text text-darken-3': user.activated, 'grey-text': !user.activated }"
              ><i class="material-icons">delete</i></a
            >
          </td>
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
  metaInfo: {
    title: 'Пользователи',
  },
  computed: {
    ...mapGetters(['USER_LIST']),
    isMobile() {
      return utils.isMobile()
    },
    userList() {
      return this.USER_LIST.sort((a, b) => {
        return b.activated - a.activated
      })
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

<style>
.btn {
  margin-left: 0.5rem;
}
</style>
