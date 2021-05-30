<template>
  <autocomplete-input icon="textsms" :label="label" v-model="value" :array="PACKAGING_LIST" find-field="title" @return-obj="$emit('input', $event)" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AutocompleteInput from '@/components/app/AutocompleteInput'

export default {
  components: { AutocompleteInput },
  computed: mapGetters(['PACKAGING_LIST']),
  props: ['value', 'label'],
  methods: mapActions(['getPackagingActiveList']),
  async mounted() {
    await this.getPackagingActiveList()
  },
}
</script>
