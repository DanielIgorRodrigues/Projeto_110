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

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const database = await getDatabase();
  const row = await database.getFirstAsync<WorkoutRow>(
    `
      SELECT id, name, is_active, created_at, updated_at
      FROM workouts
      WHERE id = ?
      LIMIT 1
    `,
    [id],
  );

  return row ? mapWorkoutRow(row) : null;
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

export async function updateWorkoutName(id: string, name: string): Promise<Workout> {
  const normalizedName = normalizeWorkoutName(name);

  if (!validateWorkoutName(normalizedName)) {
    throw new Error('O nome do treino e obrigatorio.');
  }

  const database = await getDatabase();
  const now = new Date().toISOString();

  await database.runAsync(
    `
      UPDATE workouts
      SET name = ?, updated_at = ?
      WHERE id = ? AND is_active = 1
    `,
    [normalizedName, now, id],
  );

  const workout = await getWorkoutById(id);

  if (!workout || !workout.isActive) {
    throw new Error('Treino nao encontrado.');
  }

  return workout;
}

export async function deactivateWorkout(id: string): Promise<void> {
  const database = await getDatabase();
  const now = new Date().toISOString();

  await database.runAsync(
    `
      UPDATE workouts
      SET is_active = 0, updated_at = ?
      WHERE id = ? AND is_active = 1
    `,
    [now, id],
  );
}
