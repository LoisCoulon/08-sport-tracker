import { useState } from 'react';
import type { WorkoutTemplate } from '../types/WorkoutTemplate';
import { mockWorkoutTemplates } from '../datas/mockWorkoutTemplate';

export default function WorkoutForm() {
  const [selectedType, setSelectedType] = useState<
    WorkoutTemplate['type'] | null
  >();
  const [editableWorkout, setEditableWorkout] =
    useState<WorkoutTemplate | null>(null);

  function handleSelectedType(event: React.ChangeEvent<HTMLSelectElement>) {
    const type = event.target.value as WorkoutTemplate['type'];
    setSelectedType(type);
    const template = mockWorkoutTemplates.find((t) => t.type === type);
    if (template) {
      setEditableWorkout(template);
    }
  }

  function removeExerciseFromWarmup(index: number) {
    if (!editableWorkout) return;
    const newWarmup = editableWorkout.warmup.filter(
      (exercise, i) => i !== index,
    );
    setEditableWorkout({ ...editableWorkout, warmup: newWarmup });
  }

  function removeExerciseFromSkills(index: number) {
    if (!editableWorkout) return;
    const newSkills = editableWorkout.skills.filter(
      (exercise, i) => i !== index,
    );
    setEditableWorkout({ ...editableWorkout, skills: newSkills });
  }

  function removeExerciseFromWod(index: number) {
    if (!editableWorkout) return;
    const newWod = editableWorkout.wod.filter((exercise, i) => i !== index);
    setEditableWorkout({ ...editableWorkout, wod: newWod });
  }

  return (
    <div>
      <select onChange={handleSelectedType} name="types" id="types">
        <option value="">Choisir un type d'exercice</option>
        <option value="lowerBody">lowerBody</option>
        <option value="upperBody">upperBody</option>
        <option value="fullBody">fullBody</option>
        <option value="cardio">cardio</option>
      </select>
      {editableWorkout && (
        <div>
          <h3>Warmup</h3>
          {editableWorkout.warmup.map((exercise, index) => (
            <div key={index}>
              <p>{exercise.name}</p>
              {exercise.sets && <p>{exercise.sets} sets</p>}
              {exercise.reps && <p>{exercise.reps} répétitions</p>}
              {exercise.duration && <p>{exercise.duration} secondes</p>}
              {exercise.weight && <p>{exercise.weight} kg</p>}
              <button
                onClick={() => removeExerciseFromWarmup(index)}
                className="text-red-500"
              >
                X
              </button>
            </div>
          ))}
          <h3>Skills</h3>
          {editableWorkout.skills.map((exercise, index) => (
            <div className="" key={index}>
              <p>{exercise.name}</p>
              {exercise.sets && <p>{exercise.sets} sets</p>}
              {exercise.reps && <p>{exercise.reps} répétitions</p>}
              {exercise.duration && <p>{exercise.duration} secondes</p>}
              {exercise.weight && <p>{exercise.weight} kg</p>}
              <button
                onClick={() => removeExerciseFromSkills(index)}
                className="text-red-500"
              >
                X
              </button>
            </div>
          ))}
          <h3>WOD</h3>
          {editableWorkout.wod.map((exercise, index) => (
            <div key={index}>
              <p>{exercise.name}</p>
              {exercise.sets && <p>{exercise.sets} sets</p>}
              {exercise.reps && <p>{exercise.reps} répétitions</p>}
              {exercise.duration && <p>{exercise.duration} secondes</p>}
              {exercise.weight && <p>{exercise.weight} kg</p>}
              <button
                onClick={() => removeExerciseFromWod(index)}
                className="text-red-500"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
