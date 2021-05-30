<template>
  <autocomplete-input :icon="icon" v-model="value" :label="label" find-field="number" :array="CONTAINER_LIST" @return-obj="$emit('input', $event)" />
</template>

<script>
import { mapGetters } from 'vuex'
import AutocompleteInput from '@/components/app/AutocompleteInput'

export default {
  components: { AutocompleteInput },
  props: ['value', 'icon', 'label'],
  computed: mapGetters(['CONTAINER_LIST']),
  data: () => ({
  }),
}
</script>

<style></style>
