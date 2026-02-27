<script setup lang="ts">
interface Props {
  label: string;
  modelValue: string | number;
  type?: string;
  required?: boolean;
  placeholder?: string;
  maxlength?: string | number;
  min?: string | number;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  placeholder: '',
  maxlength: undefined,
  min: undefined
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
    <input
      :type="type"
      :value="modelValue"
      :required="required"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :min="min"
      class="input input-bordered w-full"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </label>
</template>
