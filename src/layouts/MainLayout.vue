<template>
  <div class="app-main-layout">
    <navbar />
    <sidebar />

    <main class="app-content">
      <div class="app-page" :class="{ container: !is_mobile }">
        <router-view></router-view>
      </div>
    </main>

    <div id="modal1" class="modal bottom-sheet" ref="filter">
      <div class="modal-content">
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-red btn-flat">Отмена</a>
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Применить</a>
      </div>
    </div>

    <footbar />
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import Filterbar from '@/components/app/Filterbar'
import Footbar from '@/components/app/Footbar'
import utils from '@/utils/utils'

export default {
  components: { Sidebar, Navbar, Filterbar, Footbar },
  computed: {
    is_mobile() {
      return utils.isMobile()
    },
  },
  data: () => ({
    filter: null
  }),
  mounted() {
    this.filter = M.Modal.init(this.$refs.filter, { })
  },
  beforeDestroy() {
    if (this.filter && this.filter.destroy) {
      this.filter.destroy()
    }
  }
}
</script>

<style></style>
