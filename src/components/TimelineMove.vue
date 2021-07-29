<template>
  <li>
    <div class="collapsible-header">
      <i class="material-icons">navigate_next</i>{{ document.conosament }} <span v-show="document.container">&nbsp;&mdash;&nbsp;{{ document.container }}</span>
    </div>
    <div class="collapsible-body">
      <p>Заявка: {{ document.request }}</p>
      <p>Статус текущий: {{ document.status }}</p>
      <p>Груз: {{ document.cargo }}</p>
      <p>Упаковка: {{ document.packaging }}</p>
      <p>Всего мест: {{ document.place }}</p>
      <p>Вес груза: {{ document.weight | decimal }}</p>
      <p v-show="document.ship">Судно, рейс: {{ document.ship }}; {{ document.flight }}</p>
      <p>Порт отправления: {{ document.portOut }}</p>
      <p>Порт назначения: {{ document.portIn }}</p>
      <ul class="sessions-timeline">
        <li
          v-for="move in document.move"
          :key="move.date"
        >
          <div class="time-timeline">{{ move.date }}</div>
          <p class="p-timeline"
            v-for="(comment,index) in move.comment"
            :key="index"
          >{{ comment }}</p>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  props: ['document']
}
</script>

<style scoped>
  @import '../assets/timeline.css';
  p {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>