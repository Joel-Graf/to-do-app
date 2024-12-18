export type TaskDTO = {
  id?: number;
  description: string;
  checked: boolean;
  createdAt: Date;
  updatedAt?: Date;
};
