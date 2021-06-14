<template>
  <div class="app-main-layout">
    <navbar />
    <sidebar />
    <!-- <filterbar /> -->

    <main class="app-content">
      <div class="app-page" :class="{ container: !is_mobile }">
        <router-view></router-view>
      </div>
    </main>

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
}
</script>

<style></style>
