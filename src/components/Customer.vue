<template>
  <autocomplete-input icon="business" :label="label" v-model="value" :array="CUSTOMER_LIST" find-field="short_with_opf" @return-obj="$emit('input', $event)" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AutocompleteInput from '@/components/app/AutocompleteInput'

export default {
  components: { AutocompleteInput },
  computed: mapGetters(['CUSTOMER_LIST']),
  props: ['value', 'label'],
  methods: mapActions(['getCustomerList']),
  mounted() {
    this.getCustomerList()
  },
}
</script>
