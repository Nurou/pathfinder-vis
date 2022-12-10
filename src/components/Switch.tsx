import * as SwitchPrimitive from '@radix-ui/react-switch';
import cx from 'classnames';
import React from 'react';

type Props = {
  onChange: (checked: boolean) => void;
  checked: boolean;
};

export const Switch = ({ onChange, checked }: Props) => {
  return (
    <form>
      <div className="flex items-center mt-4">
        <label className="pr-4" htmlFor="display-movement-costs">
          Show movement costs
        </label>
        <SwitchPrimitive.Root
          id="display-movement-costs"
          className={cx(
            'group',
            'aria-checked:bg-polar3',
            'bg-snow2',
            'relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
            'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
          )}
          checked={checked}
          onCheckedChange={(value) => {
            onChange(value);
          }}
        >
          <SwitchPrimitive.Thumb
            className={cx(
              'group-aria-checked:translate-x-5',
              'group-aria-unchecked:translate-x-0',
              'pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
            )}
          />
        </SwitchPrimitive.Root>
      </div>
    </form>
  );
};
