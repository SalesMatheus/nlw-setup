import { Check } from "phosphor-react";

export const NewHabitForm = () => (
  <form className=" w-full flex flex-col mt-6">
    <label htmlFor="title" className="font-semibold leading-tight">
      What is the habit you want to do?
    </label>

    <input
      type="text"
      id="title"
      placeholder="I will do this habit"
      autoFocus
      className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
    />

    <label htmlFor="" className="font-semibold leading-tight mt-4">
      How many times per week do you want to do this habit?
    </label>

    <button
      type="submit"
      className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
    >
      <Check size={20} weight="bold" />
      Save
    </button>
  </form>
);
