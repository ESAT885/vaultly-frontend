<script setup lang="ts">
import { reactive, watch } from 'vue';
import BaseInput from '../../../shared/components/form/BaseInput.vue';
import BaseSelect from '../../../shared/components/form/BaseSelect.vue';
import BaseButton from '../../../shared/components/form/BaseButton.vue';
import type { MachineDto } from '../types/machine.types';

interface Props {
  initialValue?: MachineDto | null;
  submitLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: null,
  submitLabel: 'Save Machine'
});

const emit = defineEmits<{
  (event: 'submit', payload: MachineDto): void;
}>();

const form = reactive<MachineDto>({
  id: '',
  name: '',
  serialNumber: '',
  model: '',
  installDate: '',
  status: 'Active'
});

watch(
  () => props.initialValue,
  (value) => {
    if (value) {
      form.id = value.id ?? '';
      form.name = value.name ?? '';
      form.serialNumber = value.serialNumber ?? '';
      form.model = value.model ?? '';
      form.installDate = value.installDate ?? '';
      form.status = value.status ?? 'Active';
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit('submit', { ...form });
};
</script>

<template>
  <div class="mx-auto mt-8 ">
    <form class="card border border-base-300 bg-base-100 shadow-xl" @submit.prevent="handleSubmit">
      <div class="card-body gap-6">


        <div class="grid ">
          <BaseInput v-model="form.name" label="Machine Name" placeholder="e.g. CNC Router X1" required />

          <BaseInput v-model="form.model" label="Model" placeholder="e.g. 2024-Pro" required />

          <BaseInput
            v-model="form.serialNumber"
            label="Serial Number"
            placeholder="SN-000-X"
            required
          />

          <BaseInput v-model="form.installDate" type="date" label="Install Date" required />

          <div >
            <BaseSelect
              v-model="form.status"
              label="Current Status"
              :options="[
                { label: 'Active', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' },
                { label: 'Under Maintenance', value: 'UnderMaintenance' }
              ]"
              required
            />
          </div>
        </div>

        <div class="card-actions mt-6 justify-end border-t border-base-200 pt-4">
          <BaseButton variant="ghost" @click="$router.back()">Cancel</BaseButton>
          <BaseButton type="submit">{{ submitLabel }}</BaseButton>
        </div>
      </div>
    </form>
  </div>
</template>
