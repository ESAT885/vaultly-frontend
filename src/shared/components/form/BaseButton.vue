<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit';
  variant?: 'primary' | 'ghost' | 'danger';
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  fullWidth: false
});

const variantClass: Record<NonNullable<Props['variant']>, string> = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  danger: 'btn-error'
};
</script>

<template>
  <button
    :type="props.type"
    class="btn"
    :class="[variantClass[props.variant], { 'btn-block': props.fullWidth }]"
  >
    <slot />
  </button>
</template>
