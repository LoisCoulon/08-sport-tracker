import { useState } from 'react';
import type { WorkoutTemplate } from '../types/WorkoutTemplate';
import { mockWorkoutTemplates } from '../datas/mockWorkoutTemplate';
import type { Exercise } from '../types/Exercise';
import { useAuth } from '../context/useAuth';
import { useWorkouts } from '../context/useWorkouts';
import type { Workout } from '../types/Workout';

type ExerciseCategory = 'warmup' | 'skills' | 'wod';

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

  //creates a new exercise in the selected category
  function addExercise(category: ExerciseCategory, name: string) {
    if (!editableWorkout) return;
    const newExercise: Exercise = { name: name };
    setEditableWorkout({
      ...editableWorkout,
      [category]: [...editableWorkout[category], newExercise],
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

  //removes exercise from the selected category
  function removeExercise(category: ExerciseCategory, index: number) {
    if (!editableWorkout) return;

    const newList = editableWorkout[category].filter(
      (exercise, i) => i !== index,
    );
    setEditableWorkout({
      ...editableWorkout,
      [category]: newList,
    });
  }

  return (
    <div>
      <select
        onChange={handleSelectedType}
        name="types"
        id="types"
        className="bg-[#2a2a2a] border border-[#3a3a3a] text-white text-sm rounded px-4 py-2.5 focus:border-[#E50914] w-full mb-6"
      >
        <option value="">Choisir un type d'exercice</option>
        <option value="lowerBody">lowerBody</option>
        <option value="upperBody">upperBody</option>
        <option value="fullBody">fullBody</option>
        <option value="cardio">cardio</option>
      </select>
      {editableWorkout && (
        <div>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">Warmup</h3>
              <button
                onClick={() => setIsCreating('warmup')}
                className="text-[#E50914] hover:text-white text-sm font-medium transition-colors"
              >
                + Ajouter un exercice
              </button>
            </div>

            {isCreating === 'warmup' && (
              <div className="flex gap-2 mb-3">
                <input
                  onChange={handleNewExerciseForm}
                  type="text"
                  placeholder="Nom de l'exercice"
                  className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-[#E50914]"
                />
                <button
                  onClick={() => {
                    addExercise('warmup', newExercise);
                    setIsCreating(null);
                    setNewExercise('');
                  }}
                  className="bg-[#E50914] hover:bg-[#f6121d] text-white text-sm font-medium px-4 py-2 rounded transition-colors"
                >
                  Ajouter
                </button>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {editableWorkout.warmup.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a2a] rounded px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-white font-medium">
                      {exercise.name}
                    </span>
                    {exercise.sets && <span>· {exercise.sets} sets</span>}
                    {exercise.reps && <span>· {exercise.reps} reps</span>}
                    {exercise.duration && <span>· {exercise.duration}s</span>}
                    {exercise.weight && <span>· {exercise.weight}kg</span>}
                  </div>
                  <button
                    onClick={() => removeExercise('warmup', index)}
                    className="text-gray-500 hover:text-[#E50914] transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">Skills</h3>
              <button
                onClick={() => setIsCreating('skills')}
                className="text-[#E50914] hover:text-white text-sm font-medium transition-colors"
              >
                + Ajouter un exercice
              </button>
            </div>

            {isCreating === 'skills' && (
              <div className="flex gap-2 mb-3">
                <input
                  onChange={handleNewExerciseForm}
                  type="text"
                  placeholder="Nom de l'exercice"
                  className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-[#E50914]"
                />
                <button
                  onClick={() => {
                    addExercise('skills', newExercise);
                    setIsCreating(null);
                    setNewExercise('');
                  }}
                  className="bg-[#E50914] hover:bg-[#f6121d] text-white text-sm font-medium px-4 py-2 rounded transition-colors"
                >
                  Ajouter
                </button>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {editableWorkout.skills.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a2a] rounded px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-white font-medium">
                      {exercise.name}
                    </span>
                    {exercise.sets && <span>· {exercise.sets} sets</span>}
                    {exercise.reps && <span>· {exercise.reps} reps</span>}
                    {exercise.duration && <span>· {exercise.duration}s</span>}
                    {exercise.weight && <span>· {exercise.weight}kg</span>}
                  </div>
                  <button
                    onClick={() => removeExercise('skills', index)}
                    className="text-gray-500 hover:text-[#E50914] transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">WOD</h3>
              <button
                onClick={() => setIsCreating('wod')}
                className="text-[#E50914] hover:text-white text-sm font-medium transition-colors"
              >
                + Ajouter un exercice
              </button>
            </div>

            {isCreating === 'wod' && (
              <div className="flex gap-2 mb-3">
                <input
                  onChange={handleNewExerciseForm}
                  type="text"
                  placeholder="Nom de l'exercice"
                  className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] text-white text-sm rounded px-3 py-2 focus:outline-none focus:border-[#E50914]"
                />
                <button
                  onClick={() => {
                    addExercise('wod', newExercise);
                    setIsCreating(null);
                    setNewExercise('');
                  }}
                  className="bg-[#E50914] hover:bg-[#f6121d] text-white text-sm font-medium px-4 py-2 rounded transition-colors"
                >
                  Ajouter
                </button>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {editableWorkout.wod.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a2a] rounded px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-white font-medium">
                      {exercise.name}
                    </span>
                    {exercise.sets && <span>· {exercise.sets} sets</span>}
                    {exercise.reps && <span>· {exercise.reps} reps</span>}
                    {exercise.duration && <span>· {exercise.duration}s</span>}
                    {exercise.weight && <span>· {exercise.weight}kg</span>}
                  </div>
                  <button
                    onClick={() => removeExercise('wod', index)}
                    className="text-gray-500 hover:text-[#E50914] transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleSaveWorkout}
            className="w-full bg-[#E50914] hover:bg-[#f6121d] text-white font-bold py-3 rounded transition-colors"
          >
            Enregistrer la séance
          </button>{' '}
        </div>
      )}
    </div>
  );
}
