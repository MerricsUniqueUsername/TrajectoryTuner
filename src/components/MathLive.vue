<template>
  <div class="math-input">
    <math-field
      v-model="expression"
      @input="handleInput"
      class="w-full p-3 border rounded-lg shadow-sm text-lg"
    ></math-field>
  </div>
</template>

<script>
import { ref } from 'vue'
import 'mathlive'

export default {
  name: 'MathInput',
  emits: ['change'],
  setup() {
    const expression = ref('')
    const convertedExpression = ref('')

    const handleInput = () => {
      const mathField = document.querySelector('math-field')
      convertedExpression.value = mathField.getValue('ascii-math')
    }

    return {
      expression,
      convertedExpression,
      handleInput
    }
  },
}
</script>

<style>
math-field {

  /* Colors */
  --contains-highlight-background-color: rgba(244, 244, 244, 0.153);
  --selection-background-color: rgba(64, 144, 249, 0.626);
  --selection-color: white;

  margin: 17px;
  padding: 0px;
  font-size: 18px;
  border: none;
  width: 200px;
  outline: none;
  color: rgba(255, 255, 255, 0.781);

  background-color: transparent;
  border-bottom: rgba(255, 255, 255, 0.534) 1px solid;
  transition: 0.3s ease;
}
math-field:focus {
  transition: 0.3s ease;
  color: white;
  border-bottom: rgba(255, 255, 255, 1)  1px solid;
}

math-field::part(virtual-keyboard-toggle),
math-field::part(menu-toggle),
math-field::part(virtual-keyboard) {
  display: none;
}

.output {
  margin-top: 1rem;
}
</style>
