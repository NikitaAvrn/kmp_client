<template>
  <div class="app-main-layout">
    <navbar />

    <sidebar />
    <filterbar />

    <main class="app-content">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <footbar />
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import Filterbar from '../components/app/Filterbar.vue'
import Footbar from '../components/app/Footbar.vue'

export default {
  components: { Sidebar, Navbar, Filterbar, Footbar },
}
</script>

<style></style>
