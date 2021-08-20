<template>
  <div>
    <h6 class="center">{{ table.title }}</h6>
    <table class="highlight striped centered">
      <thead>
        <tr>
          <th rowspan="2" class="hide-on-small-only">Судно</th>
          <th colspan="2">{{ table.home }}</th>
          <th colspan="2">{{ table.guest }}</th>
        </tr>
        <tr>
          <th>Приход (ETA*)</th>
          <th>Отход (ETD*)</th>
          <th>Приход (ETA*)</th>
          <th>Отход (ETD*)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(flyght, inx) in table.line.flyght"
          :key="inx"
        >
          <td class="hide-on-small-only">{{ flyght.ship }}</td>
          <td>{{ flyght.home.in }}</td>
          <td>{{ flyght.home.out }}</td>
          <td>{{ flyght.guest.in }}</td>
          <td>{{ flyght.guest.out }}</td>
        </tr>
      </tbody>
    </table>
    <p v-html="table.description"></p>
  </div>
</template>

<script>
export default {
  props: ['table'],
}
</script>
