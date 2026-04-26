export type WorkoutExercise = {
  id: string;
  workoutId: string;
  name: string;
  muscleGroup: string | null;
  equipment: string | null;
  plannedSets: number | null;
  plannedReps: string | null;
  plannedWeight: number | null;
  restSeconds: number | null;
  notes: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateWorkoutExerciseInput = {
  workoutId: string;
  name: string;
  muscleGroup?: string;
  equipment?: string;
  plannedSets?: number;
  plannedReps?: string;
  plannedWeight?: number;
  restSeconds?: number;
  notes?: string;
};
