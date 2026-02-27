<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MachineForm from '../components/MachineForm.vue';
import { useMachineCrud } from '../composables/useMachineCrud';
import type { UpdateMachinePayload } from '../types/machine.types';


const route = useRoute();
const router = useRouter();
const { getMachineById, updateMachine } = useMachineCrud();

const currentMachine = computed(() => getMachineById(route.params.id as string));

const onSubmit = async (payload: UpdateMachinePayload) => {
  payload.id = route.params.id as string;
  updateMachine(payload.id, payload);
  await router.push('/machines');
};
</script>

<template>
  <section>
    <MachineForm :initial-value="currentMachine" submit-label="Update" @submit="onSubmit" />
  </section>
</template>
