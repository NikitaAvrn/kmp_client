export default {
  data: () => ({
    modal: null
  }),
  mounted() {
    this.modal = M.Modal.init(this.$refs.modal, {
      dismissible: true,
      preventScrolling: false,
      onOpenEnd: this.updateForm,
    })
  },
  destroyed() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy()
    }
  },
  methods: {
    open() {
      this.modal.open()
    },
    close() {
      this.modal.close()
    },
    updateForm() {
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
  }
}