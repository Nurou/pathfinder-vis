import { Node } from './../data_structures/Node';
export interface ICoordinates {
  row: number;
  col: number;
}

export interface IGridDimensions {
  rows: number;
  cols: number;
}

interface IReturnedStats {
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
