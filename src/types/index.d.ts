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
  costSoFar: Map<Node, number>;
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

export interface IVisualiseProps {
  grid: Node[][] | null;
  // startNodeCoords: ICoordinates | null;
  // endNodeCoords: ICoordinates | null;
  startNodeCoords: any;
  endNodeCoords: any;
  myRefs: React.MutableRefObject<any>;
  currentRun: any;
  setCurrentRun: React.Dispatch<any>;
  setPrevRun: React.Dispatch<any>;
  setCosts: any;
  currentPathFinder?: string | null;
}
