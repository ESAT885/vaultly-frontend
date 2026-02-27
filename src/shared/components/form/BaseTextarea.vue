<script setup lang="ts">
interface Props {
  label: string;
  modelValue: string;
  required?: boolean;
  rows?: number;
}

withDefaults(defineProps<Props>(), {
  required: false,
  rows: 4
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <label class="form-control mb-3 w-full">
    <div class="label">
      <span class="label-text">{{ label }}</span>
    </div>
    <textarea
      :value="modelValue"
      :required="required"
      :rows="rows"
      class="textarea textarea-bordered w-full"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </label>
</template>
