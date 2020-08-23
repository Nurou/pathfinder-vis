import React from 'react';
import { TAnimationSpeed } from '../../types';
import { Box } from '../Shared';

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
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mb={3}>
      <p>Select speed:</p>
      <div onChange={handleRadioChange}>
        <input type="radio" id="fast" value="fast" name="speed" />
        <label htmlFor="fast">fast</label>
        <input type="radio" id="medium" value="medium" name="speed" defaultChecked />
        <label htmlFor="medium">medium</label>
        <input type="radio" id="slow" value="slow" name="speed" />
        <label htmlFor="slow">slow</label>
      </div>
    </Box>
  );
};

export default SpeedSelector;
