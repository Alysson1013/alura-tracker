import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as VuexUseStore } from 'vuex'
import { INotificacao } from '@/interfaces/INotificacao';
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from "./tipo-acoes";
import http from "@/http";

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
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get('projetos')
        .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return http.post("projetos", {
        nome: nomeDoProjeto
      })
    },
    [ALTERAR_PROJETO](contexto, projeto: IProjeto){
      return http.put(`projetos/${projeto.id}`, projeto)
    },
    [REMOVER_PROJETO](context, id: string){
      return http.delete(`projetos/${id}`)
    }
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
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(item => item.id != novaNotificacao.id);
      }, 3000)
    },
  }
})

export function useStore(): Store<Estado> {
  return VuexUseStore(key)
}