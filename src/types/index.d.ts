import { CustomMap } from './../data_structures/Map/index';
import { GridNode } from './../data_structures/Node';
export interface Coordinates {
  row: number;
  col: number;
}

export type CoordToNodeDOMElementMap = Record<string, HTMLTableCellElement>;

export type GridCellConversionTypes = 'start' | 'end' | 'wall' | 'grass';

export interface GridDimensions {
  rows: number;
  cols: number;
}

export interface ReturnedStats {
  visitedNodesInOrder: GridNode[];
  shortestPath: GridNode[];
  timer: number;
  costSoFar: Map<GridNode, number> | CustomMap<GridNode, number>;
}

export type DynamicFunctions = Record<string, () => ReturnedStats>;
export interface PathfinderRunStatistics {
  pathfinder: string;
  shortestPathLength: number;
  timeTaken: number;
  totalMovementCost: number;
}

export type AnimationSpeed = 'fast' | 'medium' | 'slow';

export interface DetailsArray {
  [k: string]: Details;
}

export type PathfinderArgsTuple = [
  grid: GridNode[][],
  startNodeCoords: Coordinates,
  endNodeCoords: Coordinates,
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>
];
