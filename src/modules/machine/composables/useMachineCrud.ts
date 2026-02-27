import { computed } from 'vue';
import { useMachineStore } from '../store/machine.store';
import type { CreateMachinePayload, UpdateMachinePayload } from '../types/machine.types';

export const useMachineCrud = () => {
  const store = useMachineStore();
  const machines = computed(() => store.machines);
  const createMachine = (payload: CreateMachinePayload) => store.create(payload);
  const fetchAllMachine = () => store.fetchAll();
  const updateMachine = (id: string, payload: UpdateMachinePayload) => store.update(id, payload);
  const deleteMachine = async (id: string) => {
   await store.remove(id);
    await fetchAllMachine();
  };
  const getMachineById = (id: string) => store.getById(id);
  return { machines, createMachine, fetchAllMachine, updateMachine, deleteMachine, getMachineById };
};
