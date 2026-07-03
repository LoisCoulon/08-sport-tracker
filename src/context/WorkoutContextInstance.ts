import { createContext } from 'react';
import type { Workout } from '../types/Workout';

export interface WorkoutContextType {
  workouts: Workout[];
  addWorkout: (newWorkout: Omit<Workout, 'id'>) => Promise<void>;
  removeWorkout: (id: number) => Promise<void>;
  updateWorkout: (updatedWorkout: Workout) => Promise<void>;
}

export const WorkoutContext = createContext<WorkoutContextType | null>(null);
