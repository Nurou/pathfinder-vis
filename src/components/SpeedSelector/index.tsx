import React from 'react';
import { TAnimationSpeed } from '../../types';
import { Box, Span } from '../Shared';

export const SpeedSelector = ({
  setVisualisationSpeed
}: {
  setVisualisationSpeed: React.Dispatch<React.SetStateAction<TAnimationSpeed>>;
}) => {
  /**
   * update animation speed to suit user preference
   * @param event - radio button selection
   */
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setVisualisationSpeed(value as TAnimationSpeed);
  };

  return (
    <Box>
      <Span p={4}>Select speed:</Span>
      <Box onChange={handleRadioChange} style={{ transform: 'scale(1)' }}>
        <input type="radio" id="fast" value="fast" name="speed" defaultChecked />
        <label htmlFor="fast">fast</label>
        <input type="radio" id="medium" value="medium" name="speed" />
        <label htmlFor="medium">medium</label>
        <input type="radio" id="slow" value="slow" name="speed" />
        <label htmlFor="slow">slow</label>
      </Box>
    </Box>
  );
};

export default SpeedSelector;
