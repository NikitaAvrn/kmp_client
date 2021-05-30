<template>
  <autocomplete-input v-model="value" icon="public" :label="label" :array="PORT_LIST" find-field="title" @return-obj="$emit('input', $event)" />
</template>

<script>
import AutocompleteInput from '@/components/app/AutocompleteInput'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { AutocompleteInput },
  computed: mapGetters(['PORT_LIST']),
  props: ['value', 'label'],
  methods: mapActions(['fetchPortList']),
  mounted() {
    this.fetchPortList()
  },
}
</script>
