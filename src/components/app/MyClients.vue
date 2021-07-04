<template>
  <div class="row">
    <div class="input-field col s12">
      <select ref="client" v-model="selected" @change="$emit('input', selected)" v-if="CLIENT_LIST">
        <option value="" disabled>Выберете клиента</option>
        <option v-for="c in CLIENT_LIST" :key="c.code" :value="c.code">{{ c.title }}</option>
      </select>
      <label>Клиент</label>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['value'],
  computed: {
    ...mapGetters(['CLIENT_LIST']),
  },
  data: () => ({
    client: null,
    selected: null,
  }),
  beforeMount() {
    this.selected = this.value
  },
  async mounted() {
    if (!this.CLIENT_LIST.length) {
      await this.getMyClients()
    }
    this.client = M.FormSelect.init(this.$refs.client, {})
  },
  beforeDestroy() {
    if (this.client && this.client.destroy) {
      this.client.destroy()
    }
  },
  methods: {
    ...mapActions(['getMyClients']),
  },
}
</script>

<style></style>
