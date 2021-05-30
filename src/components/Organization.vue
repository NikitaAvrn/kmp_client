<template>
  <div class="row">
    <div class="input-field col s12">
      <i class="material-icons prefix">business</i>
      <input :id="'organization-' + this._uid" type="text" class="autocomplete" v-model="query" @input="findOrg" autocomplete="off" ref="autocomplete" />
      <label :for="'organization-' + this._uid">{{ label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'defquery'],
  data: () => ({
    query: '',
    autocomplete: null,
    lastFindArray: null,
  }),
  mounted() {
    this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
      minLength: 4,
      onAutocomplete: this.onSelect,
    })
    if (this.defquery) {
      this.query = this.defquery
    }
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  destroyed() {
    if (this.autocomplete && this.autocomplete.destroy) {
      this.autocomplete.destroy()
    }
  },
  methods: {
    getSchemaOrganization(organization) {
      if (!organization) {
        return null
      }
      let newOrg = {}

      if (organization.data) {
        newOrg.kpp = organization.data.kpp
        newOrg.ogrn = organization.data.ogrn
        newOrg.inn = organization.data.inn
        newOrg.ogrn_date = organization.data.ogrn_date
        newOrg.okato = organization.data.okato
        newOrg.okfs = organization.data.okfs
        newOrg.okogu = organization.data.okogu
        newOrg.okpo = organization.data.okpo
        newOrg.oktmo = organization.data.oktmo
        newOrg.okved = organization.data.okved
      }

      if (organization.data.address.value) {
        newOrg.address = organization.data.address.value
      }

      if (organization.data.address.data) {
        newOrg.zip_code = organization.data.address.data.postal_code
        newOrg.geo_lat = organization.data.address.data.geo_lat
        newOrg.geo_lon = organization.data.address.data.geo_lon
      }
      if (organization.data.name) {
        newOrg.full = organization.data.name.full
        newOrg.full_with_opf = organization.data.name.full_with_opf
        newOrg.short = organization.data.name.short
        newOrg.short_with_opf = organization.data.name.short_with_opf
      }

      if (organization.data.management) {
        newOrg.name = organization.data.management.name
        newOrg.post = organization.data.management.post
      }

      return newOrg
    },
    onSelect(e) {
      const result = this.lastFindArray.find((f) => {
        const str = f.value + ' (' + f.data.name.full + ', ИНН: ' + f.data.inn + ', КПП: ' + (f.data.kpp == undefined ? 'Нет данных' : f.data.kpp) + ')'
        if (str == e) {
          return f
        }
      })
      this.$emit('input', this.getSchemaOrganization(result))
    },
    async findOrg() {
      if (this.query.length < 4) {
        return
      }
      this.autocomplete.updateData({})
      const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
      const token = '2a2d3b4a0cf3e461fe8a75176c26beb67a942fb8'
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + token,
        },
        body: JSON.stringify({
          query: this.query,
          count: 20,
        }),
      }).then((r) => r.json())
      let autodata = new Object()
      response.suggestions.forEach((r) => {
        const str = r.value + ' (' + r.data.name.full + ', ИНН: ' + r.data.inn + ', КПП: ' + (r.data.kpp == undefined ? 'Нет данных' : r.data.kpp) + ')'
        autodata[str] = null
      })
      this.lastFindArray = response.suggestions
      this.autocomplete.updateData(autodata)
      this.autocomplete.open()
    },
  },
  watch: {
    value() {
      if (this.value) {
        this.query = this.value.short_with_opf + ' (' + this.value.full + ', ИНН: ' + this.value.inn + ', КПП: ' + (this.value.kpp == undefined ? 'Нет данных' : this.value.kpp) + ')'
      }
      if (!this.value) {
        this.query = ''
      }
    },
  },
}
</script>
