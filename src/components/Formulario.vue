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
import { computed, defineComponent } from 'vue';
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
  data() {
    return {
      descricao: '',
      idProjeto: ''
    }
  },
  setup() {
    const store = useStore(key)

    return {
      projetos: computed(() => store.state.projetos)
    }
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: this.projetos.find(prj => prj.id === this.idProjeto)
      })
      this.descricao = ''
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