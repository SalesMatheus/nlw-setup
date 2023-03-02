import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";

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
      What days do you want to do this habit?
    </label>

    <div className="flex flex-col gap-2 mt-3">
      <Checkbox.Root className="flex items-center gap-3 group">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
          <Checkbox.Indicator>
            <Check size={20} className="text-white" />
          </Checkbox.Indicator>
        </div>

        <span className="text-white leading-tight">Monday</span>
      </Checkbox.Root>
    </div>

    <button
      type="submit"
      className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
    >
      <Check size={20} weight="bold" />
      Save
    </button>
  </form>
);
