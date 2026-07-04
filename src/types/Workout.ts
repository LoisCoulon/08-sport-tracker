import type { Exercise } from './Exercise';

export interface Workout {
  id: number;
  user_id: string;
  date: string;
  type: 'lowerBody' | 'upperBody' | 'fullBody' | 'cardio';
  warmup: Exercise[];
  skills: Exercise[];
  wod: Exercise[];
}
