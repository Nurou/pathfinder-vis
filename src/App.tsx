import React, { useState, useRef, useLayoutEffect } from 'react';
import Node from './data_structures/Node';
import { Box, Span } from './components/Shared';
import { Button } from './components/Visualiser/styles';
import { IGridDimensions } from './types';
import InfoDisplay from './components/InfoDisplay';
import { setNodeNeighbors, populateGrid, clear, createMaze } from './components/Graph/util';
import { useStickyState } from './hooks/useStickyState';
import Description from './components/Description';
import { details } from './algorithms/details';
import ControlPanel from './components/ControlPanel';
import Checkbox from './components/Checkbox';
import { PathFinderSelector } from './components/PathFinderSelector';
import { Graph } from './components/Graph/Graph';
import Visualiser from './components/Visualiser';
import { CustomMap } from './data_structures/Map';

const availablePathfinders = [
  { value: 'Bfs', label: 'Breadth-First Search' },
  { value: 'Ucs', label: 'Dijkstras (Uniform-Cost Search)' },
  { value: 'Gbfs', label: 'Greedy Best-First Search' },
  { value: 'aStar', label: 'A*' }
];

const App = () => {
  const [grid, setGrid] = useState<Node[][] | null>([]);
  const startNodeCoords = useRef(null);
  const endNodeCoords = useRef(null);
  const [gridDimensions] = useState<IGridDimensions>({
    rows: 25,
    cols: 65
  });
  const [mazeGenerated, setMazeGenerated] = useState<boolean>(false);
  const [costs, setCosts] = useState<Map<Node, number> | CustomMap<Node, number> | null>(null);
  const [currentPathFinder, setCurrentPathFinder] = useState<string | null>(
    availablePathfinders[0].value
  );
  // this is here (and not in checkbox component) so that it can be unchecked when the grid is cleared
  const [checked, setChecked] = useState<boolean>(false);

  const myRefs = useRef({});
  const conversionType = useRef('');

  // local storage items
  const [prevRun, setPrevRun] = useStickyState(null, 'previous_run');
  const [currentRun, setCurrentRun] = useStickyState(null, 'current_run');

  // grid initialised after visual is rendered
  useLayoutEffect(() => {
    const grid = populateGrid(gridDimensions);
    // update state
    setGrid(grid);
    // neighbors can be set once grid has been populated
    setNodeNeighbors(grid);
  }, []);

  const handleClick = () => {
    createMaze(
      mazeGenerated,
      grid,
      myRefs,
      gridDimensions,
      conversionType,
      startNodeCoords,
      endNodeCoords,
      setMazeGenerated
    );
  };

  /**
   *
   * @param all - if flag is present, the graph is completely cleared
   */
  const clearGraph = (all?: true) => {
    setChecked(false);
    clear(grid, myRefs, all);
  };

  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <InfoDisplay previous={prevRun} current={currentRun} />
      {grid && (
        <Graph
          grid={grid}
          conversionType={conversionType}
          startNodeCoords={startNodeCoords}
          endNodeCoords={endNodeCoords}
          myRefs={myRefs}
        />
      )}
      {currentPathFinder && (
        <Description details={details[currentPathFinder]}>
          <PathFinderSelector
            currentPathfinder={currentPathFinder}
            setCurrentPathfinder={setCurrentPathFinder}
            availablePathfinders={availablePathfinders}
          />
        </Description>
      )}
      <ControlPanel
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        p={5}
        bg="#E2E8F0"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={handleClick}>{mazeGenerated ? 'Regenerate' : 'Generate'} Maze </Button>
          <Button onClick={() => (conversionType.current = 'start')}>Start </Button>
          <Button onClick={() => (conversionType.current = 'end')}>Finish</Button>
          <Button onClick={() => (conversionType.current = 'wall')}>Add Walls </Button>
          <Button onClick={() => (conversionType.current = 'grass')}>Add Grass</Button>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Visualiser
            grid={grid}
            startNodeCoords={startNodeCoords}
            endNodeCoords={endNodeCoords}
            myRefs={myRefs}
            currentPathFinder={currentPathFinder!}
            currentRun={currentRun}
            setCurrentRun={setCurrentRun}
            setPrevRun={setPrevRun}
            setCosts={setCosts}
          />
          <Box as="label" display="flex" justifyContent="center" alignItems="center" mt={3}>
            <label>
              <Checkbox costs={costs} myRefs={myRefs} checked={checked} setChecked={setChecked} />
              <Span fontSize={[2, 3, 4]} ml={1}>
                Show Distances
              </Span>
            </label>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={() => clearGraph()}>Reset Pathfinder</Button>
          <Button onClick={() => clearGraph(true)}>Clear All</Button>
        </Box>
      </ControlPanel>
    </Box>
  );
};

export default App;
