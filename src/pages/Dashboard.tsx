import Navbar from '../components/Navbar';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkouts } from '../context/useWorkouts';

export default function Dashboard() {
  const { workouts, removeWorkout } = useWorkouts();

  return (
    <>
      <Navbar />
      <div>
        <h1>Dashboard</h1>
        <div>
          {workouts.map((workout) => (
            <div key={workout.id}>
              <p> {workout.date}</p>
              <p>{workout.type}</p>
              <button
                onClick={() => removeWorkout(workout.id)}
                className="text-red-500"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <WorkoutForm />
      </div>
    </>
  );
}
