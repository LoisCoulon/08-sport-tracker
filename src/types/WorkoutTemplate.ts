import type { Exercise } from './Exercise';

export interface WorkoutTemplate {
  type: 'lowerBody' | 'upperBody' | 'fullBody' | 'cardio';
  warmup: Exercise[];
  skills: Exercise[];
  wod: Exercise[];
}
