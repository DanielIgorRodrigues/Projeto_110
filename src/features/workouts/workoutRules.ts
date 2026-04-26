export function normalizeWorkoutName(name: string) {
  return name.trim();
}

export function validateWorkoutName(name: string) {
  return normalizeWorkoutName(name).length > 0;
}
