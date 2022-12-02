<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
    <p class="col-12 text-h5 text-center"> Criar Conta </p>
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-lg">
      <q-input
      label="Nome"
      v-model="form.name"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
      />

      <q-input
      label="Email"
      type="email"
      v-model="form.email"
      lazy-rules
       :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório!']"
      />

      <q-input
      label="Senha"
      type="password"
      v-model="form.password"
      lazy-rules
      :rules="[(val) => (val && val.length >= 6) || 'Campo obrigatório (Pelo menos 6 caracteres)!']"
      />
      <div class=" q-pt-sm">
      <q-btn
      label="Criar Conta"
      color="primary"
      class="full-width"
      outline
      rounded
      type="submit"
      />
      <q-btn label="Voltar" color="primary" class="full-width" flat :to="{ name: 'login' }" rounded />
    </div>
    </div>
  </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'RegisterPage',

  setup () {
    const router = useRouter()
    const { register } = useAuthUser()
    const { notifySuccess, notifyError } = useNotify()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        notifySuccess('Registro realizado com sucesso!')
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        // alert(error)
        notifyError(error.message)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
