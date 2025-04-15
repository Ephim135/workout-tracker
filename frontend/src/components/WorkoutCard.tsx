type WorkoutCardProps = {
  name: string;
};

function WorkoutCard({ name }: WorkoutCardProps) {
  return (
    <div className="w-96 rounded border bg-gray-400 p-4 shadow">
      <h1 className="text-xl font-bold text-black">{name}</h1>
      <input
        type="text"
        className="mt-2 w-full rounded border-3 border-black px-2 py-1 text-xl font-bold text-black placeholder-black placeholder:text-xl placeholder:font-bold focus:border-blue-500 focus:shadow-md focus:outline-none"
        placeholder="Notes"
      />
      <div className="mt-3 grid grid-cols-[1fr_2fr_1fr_1fr] gap-2">
        <h3>Sets</h3>
        <h3>Previous Workout</h3>
        <h3>Reps</h3>
        <h3>Weight</h3>
      </div>
    </div>
  );
}

export default WorkoutCard;
