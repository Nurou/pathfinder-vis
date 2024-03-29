import { CustomMap } from './../data_structures/Map/index';
import { GridNode } from './../data_structures/Node';
export interface Coordinates {
  row: number;
  col: number;
}

export type CoordToNodeDOMElementMap = Record<string, HTMLTableCellElement>;

export type CellType = 'source' | 'destination' | 'wall' | 'grass';

export interface GridDimensions {
  rows: number;
  cols: number;
}

export interface ReturnedStats {
  visitedNodesInOrder: GridNode[];
  shortestPath: GridNode[];
  timer: number;
  costSoFar: CustomMap<GridNode, number>;
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
  sourceNodeCoords: Coordinates,
  destinationNodeCoords: Coordinates,
  gridCellDOMElementRefs: React.MutableRefObject<CoordToNodeDOMElementMap | null>
];
