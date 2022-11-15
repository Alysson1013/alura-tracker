<!-- eslint-disable vue/multi-word-component-names -->
<template lang="">
    <div class="box has-text-weight-bold">
      <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Box"  
})
</script>
<style lang="css" scoped>
  .box {
    background-color: #FAF0CA;
  }
</style>