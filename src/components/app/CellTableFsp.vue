<template>
  <div>
    <div v-if="cell.type == 'bool'" class="switch">
      <label v-for="(i, index) in cell['obj-name']" :key="index">
        <input type="checkbox" v-model="row[i]" :disabled="!cell.edit" @change="switchChange({cell, row})" />
        <span class="lever"></span>
      </label>
    </div>

    <div v-else-if="cell.type == 'tooltip-right'">
      <i v-for="i in cell['obj-name']" :key="row[i]" class="material-icons tiny pointer" v-show="row[i]" v-tooltip-right="row[i]">{{ cell.icon }}</i>
    </div>

    <div v-else-if="cell.type == 'tooltip-left'">
      <i v-for="i in cell['obj-name']" :key="row[i]" class="material-icons tiny pointer" v-show="row[i]" v-tooltip-left="row[i]">{{ cell.icon }}</i>
    </div>

    <div v-else-if="cell.type == 'tooltip-top'">
      <i v-for="i in cell['obj-name']" :key="row[i]" class="material-icons tiny pointer" v-show="row[i]" v-tooltip-top="row[i]">{{ cell.icon }}</i>
    </div>

    <div v-else-if="cell.type == 'tooltip-bottom'">
      <i v-for="i in cell['obj-name']" :key="row[i]" class="material-icons tiny pointer" v-show="row[i]" v-tooltip-bottom="row[i]">{{ cell.icon }}</i>
    </div>

    <div v-else-if="cell.type == 'date'">
      <span v-for="(i, index) in cell['obj-name']" :key="index">
        {{ row[i] | date('dateshort') }}
      </span>
    </div>

    <div v-else>
      <span v-for="(i, index) in cell['obj-name']" :key="index">
        {{ row[i] }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    row: Object,
    cell: Object,
  },
  methods: {
    switchChange(e) {
      if(e.cell.event) {
        this.$emit('switch-change', { cell: e.cell, obj: e.row })
      }
    }
  }
}
</script>

<style></style>
