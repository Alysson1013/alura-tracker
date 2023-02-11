<template>
  <section>
    <h1 class="title">
      Projetos
    </h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">
          Nome do Projeto
        </label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
      </div>
      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { ALTERAR_PROJETO } from '@/store/tipo-acoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import { CADASTRAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Formulario",
  props: {
    id: {
      type: String
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore();

    const { notificar } = useNotificador();

    const nomeDoProjeto = ref("")

    if(props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
      nomeDoProjeto.value = projeto?.nome || ''
    }

    const lidarComSucesso = () => {
      nomeDoProjeto.value = '';
      router.push('/projetos');
      notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O Projeto foi cadastrado com sucesso!');
    }

    const salvar = () => {
      if (props.id) {
        store.dispatch(ALTERAR_PROJETO, {
          id: props.id,
          nome: nomeDoProjeto.value,
        })
          .then(() => lidarComSucesso())
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => lidarComSucesso())
      }
    }

    return {
      nomeDoProjeto,
      salvar
    }
  },
})
</script>
<style lang="css" scoped>

</style>