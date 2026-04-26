import { getDatabase } from '../../database/database';
import type { CreateWorkoutInput, Workout } from './types';
import { normalizeWorkoutName, validateWorkoutName } from './workoutRules';

type WorkoutRow = {
  id: string;
  name: string;
  is_active: number;
  created_at: string;
  updated_at: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function mapWorkoutRow(row: WorkoutRow): Workout {
  return {
    id: row.id,
    name: row.name,
    isActive: row.is_active === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createWorkout(input: CreateWorkoutInput): Promise<Workout> {
  const name = normalizeWorkoutName(input.name);

  if (!validateWorkoutName(name)) {
    throw new Error('O nome do treino e obrigatorio.');
  }

  const database = await getDatabase();
  const now = new Date().toISOString();
  const workout: Workout = {
    id: createId(),
    name,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };

  await database.runAsync(
    `
      INSERT INTO workouts (id, name, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `,
    [
      workout.id,
      workout.name,
      workout.isActive ? 1 : 0,
      workout.createdAt,
      workout.updatedAt,
    ],
  );

  return workout;
}

export async function listActiveWorkouts(): Promise<Workout[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<WorkoutRow>(
    `
      SELECT id, name, is_active, created_at, updated_at
      FROM workouts
      WHERE is_active = 1
      ORDER BY created_at DESC
    `,
  );

  return rows.map(mapWorkoutRow);
}
