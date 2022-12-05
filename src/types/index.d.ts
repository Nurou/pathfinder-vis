import { CustomMap } from './../data_structures/Map/index';
import { GridNode } from './../data_structures/Node';
export interface Coordinates {
  row: number;
  col: number;
}

export type CoordToNodeDOMElementMap = Record<string, HTMLElement>;

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
export interface StatItems {
  pathfinder: string;
  shortestPathLength: number;
  timeTaken: number;
  totalMovementCost: number;
}

export interface StatProps {
  previous?: StatItems;
  current?: StatItems;
  children?: JSX.Element;
}

export type AnimationSpeed = 'fast' | 'medium' | 'slow';

export interface DetailsArray {
  [k: string]: Details;
}

export interface Details {
  title: string;
  description: string;
  weighted: boolean;
  guarantee: boolean;
}
