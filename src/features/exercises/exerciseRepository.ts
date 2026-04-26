import { getDatabase } from '../../database/database';
import {
  normalizeExerciseName,
  normalizeOptionalNumber,
  normalizeOptionalText,
  validateExerciseName,
} from './exerciseRules';
import type { CreateWorkoutExerciseInput, WorkoutExercise } from './types';

type WorkoutExerciseRow = {
  id: string;
  workout_id: string;
  name: string;
  muscle_group: string | null;
  equipment: string | null;
  planned_sets: number | null;
  planned_reps: string | null;
  planned_weight: number | null;
  rest_seconds: number | null;
  notes: string | null;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function mapWorkoutExerciseRow(row: WorkoutExerciseRow): WorkoutExercise {
  return {
    id: row.id,
    workoutId: row.workout_id,
    name: row.name,
    muscleGroup: row.muscle_group,
    equipment: row.equipment,
    plannedSets: row.planned_sets,
    plannedReps: row.planned_reps,
    plannedWeight: row.planned_weight,
    restSeconds: row.rest_seconds,
    notes: row.notes,
    sortOrder: row.sort_order,
    isActive: row.is_active === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function getNextSortOrder(workoutId: string) {
  const database = await getDatabase();
  const row = await database.getFirstAsync<{ next_sort_order: number | null }>(
    `
      SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_sort_order
      FROM workout_exercises
      WHERE workout_id = ?
    `,
    [workoutId],
  );

  return row?.next_sort_order ?? 0;
}

export async function createWorkoutExercise(
  input: CreateWorkoutExerciseInput,
): Promise<WorkoutExercise> {
  const name = normalizeExerciseName(input.name);

  if (!validateExerciseName(name)) {
    throw new Error('O nome do exercicio e obrigatorio.');
  }

  const database = await getDatabase();
  const now = new Date().toISOString();
  const exercise: WorkoutExercise = {
    id: createId(),
    workoutId: input.workoutId,
    name,
    muscleGroup: normalizeOptionalText(input.muscleGroup),
    equipment: normalizeOptionalText(input.equipment),
    plannedSets: normalizeOptionalNumber(input.plannedSets),
    plannedReps: normalizeOptionalText(input.plannedReps),
    plannedWeight: normalizeOptionalNumber(input.plannedWeight),
    restSeconds: normalizeOptionalNumber(input.restSeconds),
    notes: normalizeOptionalText(input.notes),
    sortOrder: await getNextSortOrder(input.workoutId),
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };

  await database.runAsync(
    `
      INSERT INTO workout_exercises (
        id,
        workout_id,
        name,
        muscle_group,
        equipment,
        planned_sets,
        planned_reps,
        planned_weight,
        rest_seconds,
        notes,
        sort_order,
        is_active,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      exercise.id,
      exercise.workoutId,
      exercise.name,
      exercise.muscleGroup,
      exercise.equipment,
      exercise.plannedSets,
      exercise.plannedReps,
      exercise.plannedWeight,
      exercise.restSeconds,
      exercise.notes,
      exercise.sortOrder,
      exercise.isActive ? 1 : 0,
      exercise.createdAt,
      exercise.updatedAt,
    ],
  );

  return exercise;
}

export async function listExercisesByWorkout(workoutId: string): Promise<WorkoutExercise[]> {
  const database = await getDatabase();
  const rows = await database.getAllAsync<WorkoutExerciseRow>(
    `
      SELECT
        id,
        workout_id,
        name,
        muscle_group,
        equipment,
        planned_sets,
        planned_reps,
        planned_weight,
        rest_seconds,
        notes,
        sort_order,
        is_active,
        created_at,
        updated_at
      FROM workout_exercises
      WHERE workout_id = ? AND is_active = 1
      ORDER BY sort_order ASC, created_at ASC
    `,
    [workoutId],
  );

  return rows.map(mapWorkoutExerciseRow);
}
