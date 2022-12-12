import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import cx from 'classnames';

export const TooltipWrapper = ({
  children,
  tooltipText
}: {
  children: JSX.Element;
  tooltipText: JSX.Element | string;
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={350}>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={4}
            className={cx(
              'radix-side-top:animate-slide-down-fade',
              'radix-side-right:animate-slide-left-fade',
              'radix-side-bottom:animate-slide-up-fade',
              'radix-side-left:animate-slide-right-fade',
              'inline-flex items-center rounded-md px-4 py-2.5',
              'bg-polar3',
              'text-white'
            )}
          >
            {tooltipText}
            <Tooltip.Arrow className="fill-current text-white " />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
