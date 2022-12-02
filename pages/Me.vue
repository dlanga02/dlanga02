<template>
  <q-page>
    <div>
<div>
  <p></p>
</div>
<p></p>
<p></p>
<p></p>
    </div>
      <p class="col-12 text-h5 text-center"> Bem Vindo ao SEIUNISAVE (Sistema electrónico de informação  da UniSave)</p>
      <div>
        <q-img
      :src="url"
      spinner-color="white"
      style="height: 140px; max-width: 150px"
    ></q-img>
      </div>
      <p class="col-12 text-h5 text-center"> O Sistema Eletrônico de Informações da UniSave (SeiUnisave), é uma ferramenta de </p>
      <p class="col-12 text-h5 text-center"> gestão de documentos e processos eletrônicos e tem como objetivo promover a  efi- </p>
      <p class="col-12 text-h5 text-center"> ciência , O SeiUnisave integra diversas funcionalidades, uma iniciativa conjunta  </p>
      <p class="col-12 text-h5 text-center"> de órgãos e entidades de diversas aeras da administração pública, com o  intuito  </p>
      <p class="col-12 text-h5 text-center"> de construir uma infraestrutura pública de processose documentos administrativos  </p>
      <p class="col-12 text-h5 text-center"> eletrônico  </p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'PageMe',

  setup () {
    const { user } = useAuthUser()

    return {
      user
    }
  }
})
</script>
