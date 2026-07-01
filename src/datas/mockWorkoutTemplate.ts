import type { WorkoutTemplate } from '../types/WorkoutTemplate';

export const mockWorkoutTemplates: WorkoutTemplate[] = [
  {
    type: 'lowerBody',
    warmup: [
      { name: 'Air Squats', reps: 20 },
      { name: 'Walking Lunges', reps: 20 },
      { name: 'Jumping Jacks', duration: 60 },
    ],
    skills: [
      { name: 'Back Squat', sets: 5, reps: 5, weight: 60 },
      { name: 'Deadlift', sets: 5, reps: 3, weight: 80 },
    ],
    wod: [
      { name: 'Front Squat', sets: 4, reps: 8, weight: 40 },
      { name: 'Box Jumps', sets: 4, reps: 12 },
      { name: 'Wall Balls', sets: 4, reps: 15, weight: 9 },
    ],
  },
  {
    type: 'upperBody',
    warmup: [
      { name: 'Arm Circles', duration: 30 },
      { name: 'Push-ups', reps: 15 },
      { name: 'Band Pull-Aparts', reps: 20 },
    ],
    skills: [
      { name: 'Strict Press', sets: 5, reps: 5, weight: 30 },
      { name: 'Pull-ups', sets: 5, reps: 5 },
    ],
    wod: [
      { name: 'Push Press', sets: 4, reps: 10, weight: 35 },
      { name: 'Ring Dips', sets: 4, reps: 10 },
      { name: 'Kettlebell Swings', sets: 4, reps: 15, weight: 16 },
    ],
  },
  {
    type: 'fullBody',
    warmup: [
      { name: 'Rowing', duration: 300 },
      { name: 'Air Squats', reps: 15 },
      { name: 'Push-ups', reps: 10 },
    ],
    skills: [
      { name: 'Clean & Jerk', sets: 5, reps: 3, weight: 40 },
      { name: 'Snatch', sets: 5, reps: 3, weight: 30 },
    ],
    wod: [
      { name: 'Burpees', sets: 5, reps: 10 },
      { name: 'Thrusters', sets: 5, reps: 10, weight: 30 },
      { name: 'Toes to Bar', sets: 5, reps: 10 },
    ],
  },
  {
    type: 'cardio',
    warmup: [
      { name: 'Jump Rope', duration: 180 },
      { name: 'High Knees', duration: 60 },
    ],
    skills: [
      { name: 'Double Unders', sets: 3, reps: 30 },
      { name: 'Shuttle Runs', sets: 3, reps: 1 },
    ],
    wod: [
      { name: 'Running', duration: 600 },
      { name: 'Assault Bike', duration: 300 },
      { name: 'Burpees', sets: 5, reps: 15 },
    ],
  },
];
