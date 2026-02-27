import { defineStore } from 'pinia';

import type { MachineDto, CreateMachinePayload, UpdateMachinePayload } from '../types/machine.types';
import { machineService } from '../services/machine.service';

interface MachineState {
  machines: MachineDto[];
  loading: boolean;
}

export const useMachineStore = defineStore('machine', {
  state: (): MachineState => ({
    machines: [],
    loading: false
  }),

  getters: {
    getById: (state) => (id: string) => state.machines.find((m) => m.id === id) ?? null
  },

  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        this.machines = await machineService.list();
      } finally {
        this.loading = false;
      }
    },

    async create(payload: CreateMachinePayload) {
      const newItem = await machineService.create(payload);
      return newItem;
    },

    async update(id: string, payload: UpdateMachinePayload) {
      const updatedItem = await machineService.update(id, payload);
      return updatedItem;
    },

    async remove(id: string) {
      await machineService.remove(id);
    }
  }
});
