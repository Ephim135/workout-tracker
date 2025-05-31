import { useActiveWorkout } from "../../context/useActiveWorkout.tsx";

export default function MoveCardUpDownButtons({ name }: { name: string }) {
  const { swapExercises, activeWorkout } = useActiveWorkout();

  const index = activeWorkout.exerciseEntries.findIndex(
    (exercise) => exercise.name === name,
  );

  const handleUp = () => {
    swapExercises(index, index - 1);
  };

  const handleDown = () => {
    swapExercises(index, index + 1);
  };

  return (
    <>
      <button className="btn btn-square" onClick={handleUp}>
        Up
      </button>
      <button className="btn btn-square" onClick={handleDown}>
        Down
      </button>
    </>
  );
}
