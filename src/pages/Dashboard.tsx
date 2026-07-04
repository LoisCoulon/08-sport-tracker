import Navbar from '../components/Navbar';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkouts } from '../context/useWorkouts';

export default function Dashboard() {
  const { workouts, removeWorkout } = useWorkouts();

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Mes séances</h1>

        <div className="mb-12">
          {workouts.length === 0 ? (
            <p className="text-gray-400 text-sm">
              Aucune séance enregistrée pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="group relative bg-[#1f1f1f] rounded-md overflow-hidden hover:scale-105 hover:z-10 transition-transform duration-300 cursor-pointer"
                >
                  <div className="h-24 bg-linear-to-br from-[#E50914]/30 to-[#1f1f1f] flex items-center justify-center">
                    <span className="text-4xl">🏋️</span>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-white">{workout.type}</p>
                    <p className="text-gray-400 text-xs mt-1">{workout.date}</p>
                  </div>
                  <button
                    onClick={() => removeWorkout(workout.id)}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-[#E50914] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-[#1f1f1f] rounded-md p-6 border border-[#2a2a2a]">
          <h2 className="text-xl font-bold mb-4">+ Nouvelle séance</h2>
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
}
