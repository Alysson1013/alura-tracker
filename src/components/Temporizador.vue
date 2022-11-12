<template lang="">
   <div class="is-flex is-align-items-center is-justify-content-space-between">
          <Cronometro :tempoEmSegundos="tempoEmSegundos" />
          <button class="button" :disabled="cronometroRodando" @click="iniciar">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>play</span>
          </button>
          <button class="button" :disabled="!cronometroRodando" @click="finalizar">
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
          </button>
        </div>
</template>
<script>
import { defineComponent } from 'vue';
import Cronometro from '@/components/Cronometro.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Temporizador",
  emits: [
    'aoTemporizadorFinalizado'
  ],
  components: {
    Cronometro
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false
    }
  },
  methods: {
    iniciar() {
      this.cronometroRodando = true
      this.tempoEmSegundos = 0

      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1
      }, 1000)
    },
    finalizar() {
      this.cronometroRodando = false
      clearInterval(this.cronometro)
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
      this.tempoEmSegundos = 0
    }
  }
})
</script>
<style lang="">
  
</style>