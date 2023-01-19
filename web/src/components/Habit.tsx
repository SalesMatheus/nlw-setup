interface HabitProps {
  completed: string;
}

export function Habit(props: HabitProps) {
  return (
    <div>
      <h1 className="bg-zinc-900 w-10 h-10 text-white rounded m-2 text-center flex items-center justify-center">
        {props.completed}
      </h1>
    </div>
  );
}
