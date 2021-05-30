<template>
  <div>
    <div class="page-title">
      <h3>{{ $route.name }}</h3>
    </div>

    <table-fsp
      :headers="headers"
      :array-data="USER_LIST"
      :buttons="[
        { icon: 'edit', tooltip: 'Редактировать', result: 'edit' },
        { icon: 'delete', tooltip: 'Удалить', result: 'delete' },
      ]"
      @button-click="btnClick"
      @change-activity="changeActivity"
    />

    <action-button
      :action="{
        icon: 'person_add',
        class: 'indigo darken-1',
        tooltip: 'Создать нового пользователя',
        result: true,
      }"
      @click="addNewUser"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import TableFsp from '@/components/app/TableFsp'
import ActionButton from '@/components/app/ActionButton'

export default {
  components: { TableFsp, ActionButton },
  computed: mapGetters(['USER_LIST', 'EDIT_USER']),
  data: () => ({
    headers: [
      {
        title: 'Активность',
        'obj-name': ['active'],
        edit: true,
        event: 'change-activity',
        type: 'bool',
        class: 'center',
      },
      {
        title: 'Фамилия Имя Отчество',
        'obj-name': ['surname', 'name', 'patronymic'],
        sort: true,
        find: true,
        type: 'string',
        class: 'center',
      },
      {
        title: 'Электронная почта',
        'obj-name': ['email'],
        sort: true,
        find: true,
        type: 'string',
        class: 'center',
      },
      {
        title: 'Телефон',
        'obj-name': ['phone'],
        sort: true,
        find: true,
        type: 'string',
        class: 'center',
      },
      {
        title: 'Права доступа',
        'obj-name': ['access'],
        sort: true,
        find: true,
        type: 'string',
        class: 'center',
      },
    ],
    editUser: 0,
  }),
  beforeMount() {
    this.CLR_EDIT_USER()
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    ...mapActions(['getUserList', 'putUserById', 'postUser', 'getUserById', 'putUserActivityById']),
    ...mapMutations(['CLR_EDIT_USER']),
    async modalResult(result) {
      if (result) {
        let resultRequest
        if (this.editUser == 0) {
          resultRequest = await this.postUser(this.EDIT_USER)
        } else {
          resultRequest = await this.putUserById({ userId: this.editUser, dataObject: this.EDIT_USER })
        }
        if (resultRequest) {
          this.$refs.userModal.close()
        }
      }
    },
    async changeActivity(e) {
      await this.putUserActivityById({ userId: e.obj._id, dataObject: e.obj })
    },
    async btnClick(result) {
      switch (result.button) {
        case 'edit':
          this.editUser = result.el._id
          if (await this.getUserById(result.el._id)) {
            //this.editClient = result.el._id
            this.$refs.userModal.open()
          }
          break
        case 'delete':
          break
      }
    },

    addNewUser() {
      this.CLR_EDIT_USER()
      this.editUser = 0
      this.$refs.userModal.open()
    },
  },
}
</script>

<style></style>
