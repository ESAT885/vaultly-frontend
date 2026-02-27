import type { ApiPort } from "@/services/api";
import type { MachineDto, CreateMachinePayload, UpdateMachinePayload } from "../types/machine.types";
import api from "@/api/axios";


export type MachineService = ApiPort<MachineDto, CreateMachinePayload, UpdateMachinePayload>;
export const machineService: MachineService = {
async list(): Promise<MachineDto[]> {
    const response = await api.get("/machines");
    return response.data;
  },

  async getById(id: string): Promise<MachineDto> {
    return await api.get(`/machines/${id}`);
  },

  async create(payload: CreateMachinePayload): Promise<MachineDto> {
    return await api.post("/machines", payload);
  },

  async update(id: string, payload: UpdateMachinePayload): Promise<MachineDto> {
    return await api.put(`/machines/${id}`, payload);
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/machines/${id}`);
  }
}
