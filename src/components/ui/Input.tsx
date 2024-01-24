import {ChangeEventHandler, HTMLInputTypeAttribute} from "react";
import {FaMagnifyingGlass} from "react-icons/fa6";

export default function Input({id, className, placeholder, type, onChange}: Props) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="text-neutral-400 font-semibold mb-1 flex relative">
        {type === "search" &&
          <FaMagnifyingGlass className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3"/>
        }
        <input id={id}
               name={id}
               placeholder={placeholder}
               type={type}
               className={`w-full rounded-full px-4 py-2 bg-transparent outline outline-1 outline-neutral-200 hover:outline-neutral-300 focus:outline-2 focus:outline-blue-400 dark:focus:outline-blue-400 transition-all placeholder-current ${type === "search" && "pl-10"}`}
               onChange={onChange}
        />
      </label>
    </div>
  )
}

type Props = {
  id: string,
  icon?: any,
  className?: string,
  placeholder?: string,
  type: HTMLInputTypeAttribute,
  onChange?: ChangeEventHandler<HTMLInputElement>
}