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

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Formulario",
  props: {
    id: {
      type: String
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.dispatch(ALTERAR_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        })
          .then(() => this.lidarComSucesso())
      } else {
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.lidarComSucesso())
      }
    },
    lidarComSucesso() {
      this.nomeDoProjeto = '';
      this.$router.push('/projetos');
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O Projeto foi cadastrado com sucesso!');
    }
  },
  setup(props) {
    const store = useStore();

    const { notificar } = useNotificador();

    const nomeDoProjeto = ref("")

    if(props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
      nomeDoProjeto.value = projeto?.nome || ''
    }

    return {
      store,
      notificar,
      nomeDoProjeto
    }
  },
})
</script>
<style lang="css" scoped>

</style>