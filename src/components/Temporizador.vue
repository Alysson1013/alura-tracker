<template lang="">
   <div class="is-flex is-align-items-center is-justify-content-space-between">
          <Cronometro :tempo-em-segundos="tempoEmSegundos" />
          <button class="button" @click="iniciar">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>play</span>
          </button>
          <button class="button" @click="finalizar">
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
  components: {
    Cronometro
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0
    }
  },
  methods: {
    iniciar() {
      this.tempoEmSegundos = 0

      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1
      }, 1000)
    },
    finalizar() {
      clearInterval(this.cronometro)
    }
  }
})
</script>
<style lang="">
  
</style>