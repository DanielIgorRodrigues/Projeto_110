import { normalizeWorkoutName, validateWorkoutName } from '../workoutRules';

describe('workoutRules', () => {
  it('normalizes workout name by trimming spaces', () => {
    expect(normalizeWorkoutName('  Treino A  ')).toBe('Treino A');
  });

  it('validates a filled workout name', () => {
    expect(validateWorkoutName('Treino B')).toBe(true);
  });

  it('rejects an empty workout name', () => {
    expect(validateWorkoutName('   ')).toBe(false);
  });
});
