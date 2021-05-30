<template>
  <div class="row">
    <div class="col s12">
      <div class="row search-table-input">
        <div class="input-field col s12">
          <i class="material-icons prefix">search</i>
          <input id="icon_prefix" type="search" v-model="searchString" class="validate" autocomplete="off" />
          <label for="icon_prefix">Поиск по таблице</label>
        </div>
      </div>
      <table class="highlight">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.title" class="center">
              <i class="material-icons tiny pointer align-right" :class="header.sclass" v-if="header.sort" @click="sortArray(header)">{{ header.sicon }}</i
              >&nbsp; {{ header.title }}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td v-for="(cell, index) in headers" :key="index" :class="cell.class">
              <cell-table-fsp :row="row" :cell="cell" @switch-change="switchChange" />
            </td>
            <td class="text-right">
              <a v-for="btn in buttons" :key="btn.result" class="btn-flat waves-effect" v-show="!row.hideEditButtons" v-tooltip-left="btn.tooltip" @click.prevent="$emit('button-click', { button: btn.result, el: row })">
                <i class="material-icons tiny pointeralign-right">{{ btn.icon }}</i></a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col s2 center">
          <p>Всего записей: {{ total }}</p>
        </div>
        <div class="col s4 center">
          <div class="input-field rpp col s12">
            <select v-model="countRows" ref="select">
              <option v-for="rpp in rowsPerPage" :key="rpp" :value="rpp"> {{ rpp }} - Записей на странице </option>
            </select>
          </div>
        </div>
        <div class="col s6 center">
          <ul class="pagination" v-show="countPages > 1">
            <li
              :class="{
                disabled: activePage == 1,
                'waves-effect': activePage > 1,
              }"
            >
              <a href="#!" @click.prevent="activePage = 1"><i class="material-icons">first_page</i></a>
            </li>
            <li
              :class="{
                disabled: activePage == 1,
                'waves-effect': activePage > 1,
              }"
            >
              <a href="#!" @click.prevent="activePage = activePage - 1 < 1 ? 1 : activePage - 1"><i class="material-icons">chevron_left</i></a>
            </li>
            <li
              v-for="p in pages"
              :key="p"
              :class="{
                active: activePage == p,
                'waves-effect': activePage != p,
              }"
            >
              <a href="#!" @click.prevent="activePage = p">{{ p }}</a>
            </li>

            <li
              :class="{
                disabled: activePage == countPages,
                'waves-effect': activePage < countPages,
              }"
            >
              <a href="#!" @click.prevent="activePage = activePage + 1 > countPages ? countPages : activePage + 1"><i class="material-icons">chevron_right</i></a>
            </li>
            <li
              :class="{
                disabled: activePage == countPages,
                'waves-effect': activePage < countPages,
              }"
            >
              <a href="#!" @click.prevent="activePage = countPages"><i class="material-icons">last_page</i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CellTableFsp from '@/components/app/CellTableFsp'
export default {
  components: { CellTableFsp },
  props: {
    headers: Array,
    arrayData: Array,
    buttons: Array,
  },
  computed: {
    pages() {
      let arr = []
      this.countPages = Math.ceil(this.filterRows.length / this.countRows)
      if (this.activePage > this.countPages) {
        this.activePage = 1
      }
      let startPage = 1
      let finishPage = this.countPages
      if (this.countPages > 7) {
        startPage = this.activePage - 3 < 1 ? 1 : this.activePage - 3
        finishPage = startPage + 6 > this.countPages ? this.countPages : startPage + 6
      }
      for (let i = startPage; i <= finishPage; i++) {
        arr.push(i)
      }
      return arr
    },
    filterRows() {
      if (this.searchString == '') {
        this.total = this.arrayData.length

        return this.arrayData
      }
      let arr = []
      this.arrayData.filter((f) => {
        let isContain = false
        this.headers.forEach((cell) => {
          cell['obj-name'].forEach((c) => {
            if (
              f[c] &&
              cell.find &&
              f[c]
                .toString()
                .toUpperCase()
                .includes(this.searchString.toUpperCase())
            ) {
              isContain = true
            }
          })
        })
        if (isContain) {
          arr.push(f)
        }
      })
      this.activePage = 1
      this.total = arr.length
      return arr
    },
    rows() {
      return this.filterRows.slice(this.activePage * this.countRows - this.countRows, this.activePage * this.countRows)
    },
  },
  data: () => ({
    select: null,
    rowsPerPage: [10, 25, 50, 75, 100, 200, 500],
    searchString: '',
    activePage: 1,
    countPages: 0,
    countRows: 200,
    total: 0,
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select, {})
    this.sortArray(null)
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    switchChange(e) {
      if(e.cell.event !== '') {
        this.$emit(e.cell.event, { el: e.cell, obj: e.obj })
      }
    },
    sortArray(cell) {
      this.headers.forEach((c) => {
        if (c != cell) {
          c.sclass = 'grey-text'
          c.sicon = 'sort'
          c.dir = 0
        }
      })
      if (cell == null) {
        return
      }
      switch (cell.dir) {
        case 0:
          cell.dir = 1
          cell.sicon = 'arrow_drop_down'
          cell.sclass = 'black-text'
          break
        case 1:
          cell.dir = -1
          cell.sicon = 'arrow_drop_up'
          cell.sclass = 'black-text'
          break
        case -1:
          cell.dir = 1
          cell.sicon = 'arrow_drop_down'
          cell.sclass = 'black-text'
          break
      }
      this.arrayData.sort((a, b) => {
        let a_sort
        let b_sort
        let res

        if (cell.type == 'number') {
          a_sort = a[cell['obj-name'][0]]
          b_sort = b[cell['obj-name'][0]]
          res = a_sort - b_sort
        } else if (cell.type == 'date') {
          a_sort = Date.parse(a[cell['obj-name'][0]])
          b_sort = Date.parse(b[cell['obj-name'][0]])
          res = a_sort - b_sort
        } else {
          cell['obj-name'].forEach((n) => {
            a_sort += a[n]
            b_sort += b[n]
          })
          if (a_sort.toString().toLowerCase() > b_sort.toString().toLowerCase()) {
            res = 1
          }
          if (a_sort.toString().toLowerCase() < b_sort.toString().toLowerCase()) {
            res = -1
          }
        }
        return res * cell.dir
      })
    },
  },
}
</script>

<style>
.rpp {
  margin-top: 6px;
  margin-bottom: 0;
}
.search-table-input {
  margin-bottom: -20px;
}
tr .btn-flat {
  color: #00000010;
}
tr:hover .btn-flat {
  color: #9e9e9e;
}
</style>
