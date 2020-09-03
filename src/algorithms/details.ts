import { IDetailsArray } from './../types/index.d';

export const details: IDetailsArray = {
  Bfs: {
    title: 'Breadth-first Search',
    description: 'Explores equally in all directions',
    weighted: false,
    guarantee: true
  },
  Ucs: {
    title: 'Uniform-cost Search',
    description: 'Explores by taking movement cost into account',
    weighted: true,
    guarantee: true
  },
  Gbfs: {
    title: 'Greedy Best-First Search',
    description:
      'Explores by expanding the most promising node (hence greedy) chosen according to a specified rule.',
    weighted: true,
    guarantee: false
  },
  aStar: {
    title: 'A*',
    description:
      'Explores by taking into account both the heuristic and the movement cost. Best of both worlds',
    weighted: true,
    guarantee: true
  }
};
