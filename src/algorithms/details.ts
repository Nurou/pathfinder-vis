export interface IDetails {
  [k: string]: unknown;
}

export const details: IDetails = {
  Bfs: {
    title: 'Breadth-first Search',
    description: 'Explores equally in all directions (all about the breadth)',
    weighted: false,
    guarantee: false
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
      'Explores by expanding the most promising node (hence the greed) chosen according to a specified rule.',
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
