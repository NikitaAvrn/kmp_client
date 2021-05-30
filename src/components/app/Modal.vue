<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <h5>
        <i class="material-icons left small" v-if="icon">{{ icon }}</i>
        {{ title }}
      </h5>
      <component v-model="value" :options="options" :is="form" @return-value="$emit('input', $event)" ref="bodyModal" />
    </div>
    <div class="modal-footer">
      <a v-for="button in buttons" :key="button.title" class="waves-effect btn-flat" :class="button.class" @click.prevent="clickButton(button)">
        {{ button.title }} <i v-if="button.icon" class="material-icons left">{{ button.icon }}</i>
      </a>
    </div>
  </div>
</template>

<script>
import ArrivalModal from '@/components/ArrivalModal'
import OrganizationModal from '@/components/OrganizationModal'

export default {
  components: { ArrivalModal, OrganizationModal },
  props: {
    form: String,
    value: Object,
    title: String,
    buttons: Array,
    icon: String,
    options: String,
  },
  data: () => ({
    modal: null,
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
    updateForm() {
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
    clickButton(button) {
      if (button.close) {
        this.closeModal()
        this.$emit('return-result', button.result)
        return
      }

      if (button.submit) {
        if (this.$refs.bodyModal.submit()) {
          this.$emit('return-result', button.result)
        }
      }
    },
    openModal() {
      this.modal.open()
    },
    closeModal() {
      this.modal.close()
    },
  },
  watch: {
    value() {
      if (this.value == null) {
        return
      }
      Object.keys(this.$refs.bodyModal.value_).forEach((key) => {
        this.$refs.bodyModal.value_[key] = ''
        if (this.value[key]) {
          this.$refs.bodyModal.value_[key] = this.value[key]
        }
      })
    },
  },
}
</script>

<style></style>
