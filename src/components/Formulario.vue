<!-- eslint-disable vue/valid-v-on -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <!-- v-model linka o valor do input ao estado de data  -->
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Temporizador from '@/components/Temporizador.vue'
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Formulario",
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador
  },
  setup(_, { emit }) {
    const store = useStore(key)

    const descricao = ref('')
    const idProjeto = ref('')

    const projetos = computed(() => store.state.projeto.projetos)

    const finalizarTarefa = (tempoDecorrido: number): void => {
      emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find(prj => prj.id === idProjeto.value)
      })
      descricao.value = ''
    }

    return {
      projetos: computed(() => store.state.projeto.projetos),
      descricao,
      idProjeto,
      finalizarTarefa
    }
  }
})
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>