import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as VuexUseStore } from 'vuex'
import { INotificacao } from '@/interfaces/INotificacao';
import { ADICIONA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from "./tipo-mutacoes";
import { OBTER_TAREFAS, CADASTRAR_TAREFAS, ALTERAR_TAREFA } from "./tipo-acoes";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projetos";

export interface Estado {
  notificacoes: INotificacao[];
  tarefas: ITarefa[];
  projeto: EstadoProjeto;
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projeto: {
      projetos: []
    },
    notificacoes: [],
    tarefas: []
  },
  actions: {
    [OBTER_TAREFAS]({ commit }) {
      http.get('tarefas')
        .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
    },
    [CADASTRAR_TAREFAS]({ commit }, tarefa: ITarefa){
      return http.post("tarefas", tarefa)
        .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa){
      return http.put(`tarefas/${tarefa.id}`, tarefa)
       .then(() => commit(ALTERAR_TAREFA, tarefa))
    }
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(item => item.id != novaNotificacao.id);
      }, 3000)
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]){
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa){
      state.tarefas.push(tarefa)
    },
    [ALTERAR_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(t => tarefa.id === t.id);
      state.tarefas[index] = tarefa;
    },
  },
  modules: {
    projeto
  }
})

export function useStore(): Store<Estado> {
  return VuexUseStore(key)
}