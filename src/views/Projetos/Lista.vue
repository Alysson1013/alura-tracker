<template>
  <section>
    <h1 class="title">
      Projetos
    </h1>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>
            ID
          </th>
          <th>
            Nome
          </th>
          <th>
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>
            {{ projeto.id }}
          </td>
          <td>
            {{ projeto.nome }}
          </td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { notificacaoMixin } from '@/mixins/notificar'
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo-acoes'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Lista",
  mixins: [
    notificacaoMixin
  ],
  methods: {
    excluir(id: string) {
      this.store.dispatch(REMOVER_PROJETO, id)
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O Projeto foi deleteado com sucesso!');
      this.store.dispatch(OBTER_PROJETOS)
    },
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_PROJETOS)

    return {
      projetos: computed(() => store.state.projeto.projetos),
      store
    }
  }
})
</script>
<style lang="css" scoped>

</style>