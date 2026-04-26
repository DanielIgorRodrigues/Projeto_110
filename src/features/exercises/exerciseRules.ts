export function normalizeExerciseName(name: string) {
  return name.trim();
}

export function validateExerciseName(name: string) {
  return normalizeExerciseName(name).length > 0;
}

export function normalizeOptionalText(value?: string) {
  const normalizedValue = value?.trim();

  return normalizedValue ? normalizedValue : null;
}

export function normalizeOptionalNumber(value?: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}
