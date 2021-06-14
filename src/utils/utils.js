export default {
  isMobile() {
    const isMobile = window.matchMedia('only screen and (max-width: 760px)')
    return isMobile.matches ? true : false
  },
}
