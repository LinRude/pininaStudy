import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const update = () => count.value++;
  const asyncUpdate = () =>{
    setTimeout(()=>{
      count.value ++
    },1000)
  }

  return { count, doubleCount, update,asyncUpdate }
})
