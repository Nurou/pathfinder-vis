// import { Coordinates } from '../../types';
/**
 * Represents a logical graph/grid node
 */
export class Node {
  row: number;
  col: number;
  neighbors: any;

  /**
   *
   * @param {number} row row number on grid
   * @param {number} col column number on grid
   */
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.neighbors = null;
  }

  /**
   * Registers all the neighbors of a node in the grid prior to any algorithms running
   * Neighbor nodes are those that are located directly to the right, left, above, or below the node in the grid
   * @param {object} grid
   */
  setNeighbors(grid: Node[][]): void {
    const neighbors = [];
    let index = 0;
    if (this.row > 0) {
      neighbors[index] = grid[this.row - 1][this.col];
      index++;
    }
    if (this.row < grid.length - 1) {
      neighbors[index] = grid[this.row + 1][this.col];
      index++;
    }
    if (this.col > 0) {
      neighbors[index] = grid[this.row][this.col - 1];
      index++;
    }
    if (this.col < grid[0].length - 1) {
      neighbors[index] = grid[this.row][this.col + 1];
      index++;
    }

    this.neighbors = neighbors;
  }

  getNeighbors(): Node[] | null {
    return this.neighbors;
  }

  toString() {
    console.log(`row: ${this.row}, col: ${this.col}`);
  }
}

export default Node;
