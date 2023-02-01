interface HabitDayProps {
  type: "completed" | "missed" | "empty";
}

export function HabitDay({ type }: HabitDayProps) {
  if (type === "empty") {
    return (
      <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
    );
  }
  if (type === "completed") {
    return (
      <div className="w-10 h-10 bg-lime-600 border-2 border-zinc-800 rounded-lg" />
    );
  }
  return (
    <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg " />
  );
}
