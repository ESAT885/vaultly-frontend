<script setup lang="ts">
import { onMounted } from "vue"
import { RouterLink } from 'vue-router';
import BaseButton from '../../../shared/components/form/BaseButton.vue';
import { useMachineCrud } from '../composables/useMachineCrud';

const { machines, deleteMachine,fetchAllMachine } = useMachineCrud();
onMounted(() => {
  fetchAllMachine();
})
</script>

<template>
  <section class="p-6 bg-base-100 min-h-screen">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h1 class="text-3xl font-bold text-base-content">Machines</h1>
      <RouterLink to="/machines/create">
        <BaseButton class="btn-primary shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Machine
        </BaseButton>
      </RouterLink>
    </div>

    <div class="card bg-base-200 shadow-xl overflow-hidden border border-base-300">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead class="bg-base-300">
            <tr>
              <th class="text-sm uppercase font-semibold">Name</th>
              <th class="text-sm uppercase font-semibold">Model</th>
              <th class="text-sm uppercase font-semibold">Date</th>
              <th class="text-sm uppercase font-semibold">Serial</th>
              <th class="text-sm uppercase font-semibold text-center">Status</th>
              <th class="text-sm uppercase font-semibold text-right px-10">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="machine in machines" :key="machine.id" class="hover transition-colors">
              <td class="font-medium">{{ machine.name }}</td>
              <td>{{ machine.model }}</td>
                 <td>{{ machine.installDate }}</td>
              <td>
                <span class="font-mono text-xs">{{ machine.serialNumber }}</span>
              </td>
              <td class="text-center">
                <!-- <span
                  class="badge font-semibold"
                  :class="{
                    'badge-success': machine?.status == 'active',
                    'badge-warning': machine?.status == 'maintenance',
                    'badge-ghost': !['active', 'maintenance'].includes(machine?.status ?? '')
                  }"
                > -->
                  {{ machine.status }}
                <!-- </span> -->
              </td>
              <td class="flex justify-end gap-2 px-6">
                <RouterLink :to="`/machines/${machine.id}/edit`">
                  <BaseButton variant="ghost" class="btn-sm btn-outline btn-info">Edit</BaseButton>
                </RouterLink>
                <BaseButton
                  variant="danger"
                  class="btn-sm btn-outline btn-error"
                  @click="deleteMachine(machine.id ?? '');"
                >
                  Delete
                </BaseButton>
              </td>
            </tr>

            <tr v-if="machines.length === 0">
              <td colspan="5" class="text-center py-12">
                <div class="flex flex-col items-center opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p class="text-lg font-semibold">No machines found.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
