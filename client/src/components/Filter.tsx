/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Props {
  options: Array<string>;
  onChange?: (selected: string) => void;
}

const Filter: React.FC<Props> = ({ options, onChange }) => {
  const [selected, setSelected] = React.useState(options[0]);

  return (
    <div>
      <Menu as="div" className="relative inline-block z-40 w-52 text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm 
                                  font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 
                                  focus-visible:ring-white focus-visible:ring-opacity-75 justify-between"
          >
            {selected}
            <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-white" />
          </Menu.Button>
        </div>

        <Menu.Items className="absolute right-0 mt-2 w-full rounded-lg border border-white border-opacity-10 bg-gray-900 bg-opacity-80 p-1 backdrop-blur backdrop-filter focus-visible:outline-none focus-visible:ring">
          <div className="px-1 py-1 ">
            {options.map((option) => {
              return (
                <Menu.Item key={option}>
                  {({ active }) => (
                    <button
                      className={`${
                        active || selected === option
                          ? "bg-gray-700 text-white"
                          : "text-white"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                      onClick={() => {
                        setSelected(option);
                        onChange?.(option);
                      }}
                    >
                      {option}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default Filter;
