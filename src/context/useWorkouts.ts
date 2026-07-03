import { useContext } from 'react';
import { WorkoutContext } from './WorkoutContextInstance';

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (context === null) {
    throw new Error('useWorkouts doit être utilisé dans un WorkoutProvider');
  }
  return context;
}
