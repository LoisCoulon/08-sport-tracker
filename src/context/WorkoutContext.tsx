import { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { useAuth } from './useAuth';
import type { Workout } from '../types/Workout';
import { WorkoutContext } from './WorkoutContextInstance';

interface WorkoutProviderProps {
  children: React.ReactNode;
}

export default function WorkoutProvider({ children }: WorkoutProviderProps) {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  async function addWorkout(newWorkout: Omit<Workout, 'id'>) {
    const { data, error } = await supabase
      .from('workouts')
      .insert([newWorkout]);
    if (error) {
      throw error;
    }
    if (data) {
      setWorkouts([...workouts, data[0]]);
    }
  }

  async function updateWorkout(updatedWorkout: Workout) {
    const { error } = await supabase
      .from('workouts')
      .update(updatedWorkout)
      .eq('id', updatedWorkout.id);
    if (error) {
      throw error;
    }
    setWorkouts(
      workouts.map((workout) =>
        workout.id === updatedWorkout.id ? updatedWorkout : workout,
      ),
    );
  }

  async function removeWorkout(id: number) {
    const { error } = await supabase.from('workouts').delete().eq('id', id);
    if (error) {
      throw error;
    }

    setWorkouts(workouts.filter((workout) => workout.id !== id));
  }

  useEffect(() => {
    async function fetchWorkouts() {
      if (!user) return;
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.log(error);
        return;
      }
      setWorkouts(data);
    }
    fetchWorkouts();
  }, [user]);

  return (
    <WorkoutContext.Provider
      value={{ addWorkout, updateWorkout, removeWorkout, workouts }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}
