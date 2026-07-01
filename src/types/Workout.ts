import type { Exercise } from './Exercise';

export interface Workout {
  id: number;
  user_id: number;
  date: string;
  type: 'lowerBody' | 'upperBody' | 'fullBody' | 'cardio';
  warmup: Exercise[];
  skills: Exercise[];
  wod: Exercise[];
}
