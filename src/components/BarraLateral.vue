<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="">
    </h1>
    <button class="button" @click="aoAlterarTema">
      {{ textoBotao }}
    </button>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "BarraLateral",
    emits: ['aoTemaAlterado'],
    data () {
      return {
        modoEscuroAtivo: false
      }
    },
    methods: {
      aoAlterarTema () {
        this.$emit('aoTemaAlterado', !this.modoEscuroAtivo)
        this.modoEscuroAtivo = !this.modoEscuroAtivo
      }
    },
    computed: {
      textoBotao () {
        if (this.modoEscuroAtivo) return "Desativar modo escuro"
        return "Ativar modo escuro"
      }
    }
  })
</script>

<style scoped="">
  header {
    background-color: #0d3b66;
    width: 100%;
    height: 100vh;
    padding: 1rem;
    
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (max-width: 768) {
    header {
      padding: 2.5rem;
      height: auto;
    }
  }
</style>