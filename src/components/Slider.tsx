import * as SliderPrimitive from '@radix-ui/react-slider';
import cx from 'classnames';
import React from 'react';

interface Props {
  onChangeCb: (value: number) => void;
  value: number;
}

export const Slider = (props: Props) => {
  return (
    <SliderPrimitive.Root
      defaultValue={[props.value]}
      max={100}
      step={1}
      className="relative flex h-5 w-64 touch-none items-center"
      onValueChange={(value: [number]) => {
        props.onChangeCb(value[0]);
      }}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-snow2">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-polar3" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label="visualisation speed slider"
        className={cx(
          'block h-5 w-5 rounded-full bg-polar3',
          'focus:outline-none focus-visible:ring focus-visible:ring-polar2 focus-visible:ring-opacity-75'
        )}
      />
    </SliderPrimitive.Root>
  );
};
