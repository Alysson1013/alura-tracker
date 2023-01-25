import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as VuexUseStore } from 'vuex'
import { INotificacao, TipoNotificacao } from '@/interfaces/INotificacao';
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";

interface Estado {
  projetos: IProjeto[]
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: []
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as IProjeto

      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex(proj => projeto.id === proj.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter(item => item.id !== id)
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push;
    },
  }
})

export function useStore(): Store<Estado> {
  return VuexUseStore(key)
}