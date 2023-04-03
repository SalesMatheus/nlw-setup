interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className=" h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        className="h-3 rounded-xl bg-violet-600 transition-all duration-300"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-label="progress"
        aria-valuenow={progress}
      />
    </div>
  );
};
