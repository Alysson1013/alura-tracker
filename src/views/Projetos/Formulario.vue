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
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { ALTERA_PROJETO } from '@/store/tipo-mutacoes';
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
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id === this.id);
      this.nomeDoProjeto = projeto?.nome || '';
    }
  },
  data() {
    return {
      nomeDoProjeto: ""
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto,
        })
      } else {
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => {
            this.nomeDoProjeto = '';
            this.$router.push('/projetos');
            this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O Projeto foi cadastrado com sucesso!');
          })
      }
    }
  },
  setup() {
    const store = useStore();

    const { notificar } = useNotificador();

    return {
      store,
      notificar
    }
  },
})
</script>
<style lang="css" scoped>

</style>