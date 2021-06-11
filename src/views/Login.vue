<template>
  <div>
    <form @submit.prevent="submitHandler()">
      <div class="row">
        <div class="col s12 offset-m3 m6">
          <div class="card">
            <div class="card-content">
              <span class="card-title center">АСУ «КМП»</span>
              <div class="center">
                <img src="../assets/logo/120.png" alt="KASCO" />
              </div>
              <div class="input-field">
                <input id="email" type="text" v-model.trim="email" :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }" />
                <label for="email">Email</label>
                <small class="helper-text invalid" v-if="$v.email.$dirty && !$v.email.required">Введите email</small>
                <small class="helper-text invalid" v-else-if="$v.email.$dirty && !$v.email.email">Введите корректный email</small>
              </div>
              <div class="input-field">
                <input id="password" type="password" v-model="password" :class="{ invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) }" />
                <label for="password">Пароль</label>
                <small class="helper-text invalid" v-if="$v.password.$dirty && !$v.password.required">Введите пароль</small>
                <small class="helper-text invalid" v-else-if="$v.password.$dirty && !$v.password.minLength"
                  >Пароль должен быть не менее {{ $v.password.$params.minLength.min }} символов, сейчас он {{ password.length }}</small
                >
              </div>
            </div>
            <div class="card-action">
              <div class="center">
                <button class="btn waves-effect waves-light indigo darken-1 auth-submit" type="submit">
                  Войти
                  <i class="material-icons right">send</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  computed: {
    ...mapGetters(['USER', 'SID', 'LOGIN']),
  },
  mounted() {
    this.CLR_SID()
    this.CLR_USER()
  },
  methods: {
    ...mapActions(['login']),
    ...mapMutations(['CLR_SID', 'CLR_USER']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
      }

      const response = await this.login(formData)
      if (this.LOGIN) {
        this.$router.push('/')
      }
    },
  },
}
</script>

<style></style>
