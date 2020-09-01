import { CustomMap } from './../data_structures/Map/index';
import { Node } from './../data_structures/Node';
export interface ICoordinates {
  row: number;
  col: number;
}

export interface IGridDimensions {
  rows: number;
  cols: number;
}

export interface IReturnedStats {
  visitedNodesInOrder: Node[];
  shortestPath: Node[];
  timer: number;
  costSoFar: Map<Node, number> | CustomMap<Node, number>;
}

export interface IDynFunctions {
  [key: string]: () => IReturnedStats;
  [key: string]: () => IReturnedStats;
  [key: string]: () => IReturnedStats;
  [key: string]: () => IReturnedStats;
}

export interface IStatItems {
  pathfinder: string;
  shortestPathLength: number;
  timeTaken: number;
  totalMovementCost: number;
}

export interface IStatProps {
  previous?: IStatItems;
  current?: IStatItems;
  children?: any;
}

export type TAnimationSpeed = 'fast' | 'medium' | 'slow';

export interface IDetailsArray {
  [k: string]: IDetails;
}

export interface IDetails {
  title: string;
  description: string;
  weighted: boolean;
  guarantee: boolean;
}

//TODO: add proper types in place of any
export interface IVisualiserProps {
  grid: Node[][] | null;
  startNodeCoords: React.MutableRefObject<ICoordinates | null>;
  endNodeCoords: React.MutableRefObject<ICoordinates | null>;
  myRefs: any;
  currentRun: any;
  setCurrentRun: React.Dispatch<any>;
  setPrevRun: React.Dispatch<any>;
  setCosts: React.Dispatch<
    React.SetStateAction<Map<Node, number> | CustomMap<Node, number> | null>
  >;
  currentPathFinder?: string | null;
}
