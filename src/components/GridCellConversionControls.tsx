import React from 'react';
import { CellType } from '../types';
import { TooltipWrapper } from './TooltipWrapper';

type Props = {
  selectedCellConversionType: React.MutableRefObject<CellType | null>;
  internalSelectedCellConversionType: CellType | null;
  setInternalSelectedCellConversionType: React.Dispatch<React.SetStateAction<CellType | null>>;
};

export const GridCellConversionControls = ({
  selectedCellConversionType,
  internalSelectedCellConversionType,
  setInternalSelectedCellConversionType
}: Props) => {
  // selects if type not selected
  // deselects otherwise
  const handleClick = (type: CellType) => {
    if (internalSelectedCellConversionType !== type) {
      setInternalSelectedCellConversionType(type);
      selectedCellConversionType.current = type;
    } else {
      setInternalSelectedCellConversionType(null);
      selectedCellConversionType.current = null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-baseline gap-4">
      <span className="pr-3 font-bold">Add to grid:</span>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => handleClick('source')}
          className={`flex items-start justify-start bg-snow0 hover:bg-snow1 text-black p-3 rounded ${
            internalSelectedCellConversionType === 'source'
              ? 'border-2 border-source'
              : 'border-2 border-transparent'
          }`}
        >
          <span className="before:content-['con'] before:text-source  before:inline before:bg-source before:rounded before:mx-3" />
          <span>source</span>
        </button>
        <button
          onClick={() => handleClick('destination')}
          className={`flex items-start justify-start bg-snow0 hover:bg-snow1 text-black p-3 rounded ${
            internalSelectedCellConversionType === 'destination'
              ? 'border-2 border-destination'
              : 'border-2 border-transparent'
          }`}
        >
          <span className="before:content-['con'] before:text-destination  before:inline before:bg-destination before:rounded before:mx-3" />
          <span>destination</span>
        </button>
        <button
          onClick={() => handleClick('wall')}
          className={`flex items-start justify-start bg-snow0 hover:bg-snow1 text-black p-3 rounded ${
            internalSelectedCellConversionType === 'wall'
              ? 'border-2 border-polar1'
              : 'border-2 border-transparent'
          }`}
        >
          <span className="before:content-['con'] before:text-polar1  before:inline before:bg-polar1 before:rounded before:mx-3" />
          <span>wall</span>
        </button>
        <TooltipWrapper tooltipText={'The movement cost of grass is 5x that of regular terrain.'}>
          <button
            onClick={() => handleClick('grass')}
            className={`flex items-start justify-start bg-snow0 hover:bg-snow1 text-black p-3 rounded ${
              internalSelectedCellConversionType === 'grass'
                ? 'border-2 border-grass'
                : 'border-2 border-transparent'
            }`}
          >
            <span className="before:content-['con'] before:text-grass  before:inline before:bg-grass before:rounded before:mx-3" />
            <span>grass</span>
          </button>
        </TooltipWrapper>
      </div>
    </div>
  );
};
