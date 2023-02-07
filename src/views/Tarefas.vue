<template>
  <Formulario />
  <div class="lista">
    <Box v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </Box>
    <Tarefa :tarefa="tarefa" v-for="(tarefa, index) in tarefas" :key="index" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Formulario from '..//components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue'
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { OBTER_TAREFAS } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box
  },
  methods: {

  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  setup () {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS)

    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  }
});
</script>