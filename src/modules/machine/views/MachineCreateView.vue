<script setup lang="ts">
import { useRouter } from 'vue-router';
import MachineForm from '../components/MachineForm.vue';
import { useMachineCrud } from '../composables/useMachineCrud';
import type { CreateMachinePayload } from '../types/machine.types';

const router = useRouter();
const { createMachine,  fetchAllMachine } = useMachineCrud();

const onSubmit = async (payload: CreateMachinePayload) => {
  payload.id = "BE765AC3-BD89-4DD8-AABF-64A6CB81DD3D";
 await createMachine(payload);
 await   fetchAllMachine();
  await router.push('/machines');
};
</script>

<template>
  <section>
    <MachineForm submit-label="Create" @submit="onSubmit" />
  </section>
</template>
