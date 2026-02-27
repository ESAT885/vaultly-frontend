<script setup lang="ts">
interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  modelValue: string;
  options: Option[];
  required?: boolean;
}

withDefaults(defineProps<Props>(), { required: false });

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <label class="form-control mb-3 w-full">
    <div class="label">
      <span class="label-text">{{ label }}</span>
    </div>
    <select
      :value="modelValue"
      :required="required"
      class="select select-bordered w-full"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="" disabled>Select</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>
