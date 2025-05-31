type WorkoutCardHeaderProps = {
  name: string;
  handleRemoveCard: () => void;
};

export default function WorkoutCardHeader({
  name,
  handleRemoveCard,
}: WorkoutCardHeaderProps) {
  return (
    <div className="flex">
      <h1 className="text-2xl font-bold text-black">{name}</h1>
      <button
        className="btn-xs btn ml-auto border-none bg-transparent text-2xl text-black shadow-none"
        onClick={handleRemoveCard}
      >
        x
      </button>
    </div>
  );
}
