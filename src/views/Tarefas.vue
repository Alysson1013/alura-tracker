<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </Box>
    <Tarefa :tarefa="tarefa" v-for="(tarefa, index) in tarefas" :key="index" />
    <div class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Formulario from '..//components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue'
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { OBTER_TAREFAS, CADASTRAR_TAREFAS, OBTER_PROJETOS } from '@/store/tipo-acoes';
import ITarefa from '@/interfaces/ITarefa'

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFAS, tarefa)
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  setup() {
    const store = useStore();

    store.dispatch(OBTER_PROJETOS)
    store.dispatch(OBTER_TAREFAS)

    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  }
});
</script>