export type MachineStatus = 'Active' | 'Inactive' | 'UnderMaintenance';

export interface MachineDto {
  id: string;
  name: string;
  serialNumber: string;
  model: string;
  installDate: string;
  status: MachineStatus;
}

export type CreateMachinePayload = Partial<Omit<MachineDto, 'id'>> & { id: string };
export interface UpdateMachinePayload extends Partial<Omit<MachineDto, 'id'>> {
  id: string;
}
