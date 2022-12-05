import { Box } from './Shared';
import React from 'react';

interface PathFinderProps {
  currentPathfinder: string;
  setCurrentPathfinder: React.Dispatch<React.SetStateAction<string>>;
  availablePathfinders: PathFinderObject[];
}

type PathFinderObject = {
  value: string;
  label: string;
};

/**
 * Component for user to select the pathfinder to run
 * @param props
 */
export const PathFinderSelector = (props: PathFinderProps) => (
  <Box display="flex" flexDirection="column">
    <label htmlFor="algo-select">Choose a pathfinder</label>
    <select
      id="algo-select"
      style={{ height: '3rem' }}
      value={props.currentPathfinder!}
      onChange={(e) => {
        props.setCurrentPathfinder(e.target.value);
      }}
    >
      <option disabled>Choose pathfinder</option>
      {props.availablePathfinders.map((o) => (
        <option value={o.value} key={o.label}>
          {o.label}
        </option>
      ))}
    </select>
  </Box>
);
