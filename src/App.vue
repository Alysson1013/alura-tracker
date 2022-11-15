<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-fifth">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Box v-if="listaEstaVazia">
          Você não está muito produtivo hoje :(
        </Box>
        <Tarefa :tarefa="tarefa" v-for="(tarefa, index) in tarefas" :key="index"/>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from '@/components/BarraLateral.vue'
import Formulario from './components/Formulario.vue';
import Tarefa from '@/components/Tarefa.vue'
import ITarefa from './interfaces/ITarefa';
import Box from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box
  },
  data () {
    return {
      tarefas: [] as ITarefa[]
    }
  },
  methods: {
    salvarTarefa (tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    }
  },
  computed: {
    listaEstaVazia (): boolean {
      return this.tarefas.length === 0
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
