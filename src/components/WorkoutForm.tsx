import { useState } from 'react';
import type { WorkoutTemplate } from '../types/WorkoutTemplate';
import { mockWorkoutTemplates } from '../datas/mockWorkoutTemplate';
import type { Exercise } from '../types/Exercise';
import { useAuth } from '../context/useAuth';
import { useWorkouts } from '../context/useWorkouts';
import type { Workout } from '../types/Workout';

export default function WorkoutForm() {
  const [selectedType, setSelectedType] = useState<
    WorkoutTemplate['type'] | null
  >();
  const [editableWorkout, setEditableWorkout] =
    useState<WorkoutTemplate | null>(null);
  const [newExercise, setNewExercise] = useState<string>('');
  const [isCreating, setIsCreating] = useState<
    'warmup' | 'skills' | 'wod' | null
  >(null);
  const { user } = useAuth();
  const { addWorkout } = useWorkouts();

  //handles the selected type of training to display custom exercises
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

  //create a new exercise in the warmup section
  function addExerciseToWarmup(name: string) {
    if (!editableWorkout) return;
    const newExercise: Exercise = { name: name };
    setEditableWorkout({
      ...editableWorkout,
      warmup: [...editableWorkout.warmup, newExercise],
    });
  }

  //create a new exercise in the skills section
  function addExerciseToSkills(name: string) {
    if (!editableWorkout) return;
    const newExercise: Exercise = { name: name };
    setEditableWorkout({
      ...editableWorkout,
      skills: [...editableWorkout.skills, newExercise],
    });
  }

  //create a new exercise in the wod section
  function addExerciseToWod(name: string) {
    if (!editableWorkout) return;
    const newExercise: Exercise = { name: name };
    setEditableWorkout({
      ...editableWorkout,
      wod: [...editableWorkout.wod, newExercise],
    });
  }

  //Updates the exercises array when a new exercise is added
  function handleNewExerciseForm(e: React.ChangeEvent<HTMLInputElement>) {
    setNewExercise(e.target.value);
  }

  async function handleSaveWorkout() {
    if (!editableWorkout || !user) return;

    const newWorkout: Omit<Workout, 'id'> = {
      user_id: user.id,
      date: new Date().toISOString().split('T')[0], //YYYY-MM-DD format
      type: editableWorkout.type,
      warmup: editableWorkout.warmup,
      skills: editableWorkout.skills,
      wod: editableWorkout.wod,
    };

    await addWorkout(newWorkout);

    //clears the form
    setEditableWorkout(null);
    setSelectedType(null);
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
          <button onClick={() => setIsCreating('warmup')}>
            Ajouter un exercice
          </button>
          {isCreating === 'warmup' && (
            <div>
              <input
                onChange={handleNewExerciseForm}
                type="text"
                placeholder="nouvel exercice"
              />
              <button
                onClick={() => {
                  addExerciseToWarmup(newExercise);
                  setIsCreating(null);
                  setNewExercise('');
                }}
              >
                Ajouter
              </button>
            </div>
          )}
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
          <button onClick={() => setIsCreating('skills')}>
            Ajouter un exercice
          </button>
          {isCreating === 'skills' && (
            <div>
              <input
                onChange={handleNewExerciseForm}
                type="text"
                placeholder="nouvel exercice"
              />
              <button
                onClick={() => {
                  addExerciseToSkills(newExercise);
                  setIsCreating(null);
                  setNewExercise('');
                }}
              >
                Ajouter
              </button>
            </div>
          )}
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
          <button onClick={() => setIsCreating('wod')}>
            Ajouter un exercice
          </button>
          {isCreating === 'wod' && (
            <div>
              <input
                onChange={handleNewExerciseForm}
                type="text"
                placeholder="nouvel exercice"
              />
              <button
                onClick={() => {
                  addExerciseToWod(newExercise);
                  setIsCreating(null);
                  setNewExercise('');
                }}
              >
                Ajouter
              </button>
            </div>
          )}
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
          <button onClick={handleSaveWorkout}>Enregistrer la séance</button>
        </div>
      )}
    </div>
  );
}
