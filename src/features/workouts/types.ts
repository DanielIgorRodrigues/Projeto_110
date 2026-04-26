export type Workout = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateWorkoutInput = {
  name: string;
};
