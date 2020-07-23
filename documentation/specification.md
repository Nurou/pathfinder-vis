# Data Structures and Algorithms Used

The goal is to implement and compare the execution of some common pathfinder algorithms. The pathfinders operate on a graph of interconnected nodes. The graph in this project is represented by a 2D array that forms a grid.

As for the traversal of nodes and figuring out the shortest path, implementations of a queue and priority queue are used since these are more performant in comparison to using a regular array.

JavaScript maps and arrays will be used throughout the program to hold variables and mappings. Built in array methods may eventually be replaced by custom ones if necessary.

The algorithms were chosen due to their prevalence and my personal familiarity with them.

## Data Structures

- Arrays
- Maps
- Objects
- Queue/Priority Queue

## Algorithms

- Breadth-first Search (BFS)
- Uniform-Cost Search (Variant of Dijkstra's Algorithm)
- Heuristic Search (Greedy Best-First Search)
- A\*

## Program Input

The program input will consist of options selected on the user interface. All of the pathfinders work on the same grid based on the start and end nodes selected and other options that the UI provides.

The user also selects the algorithm they wish to see perform.

## Expected Time Complexities

| Algorithm                | Big-O (Worst-case performance) | Description                                                                                        |
| ------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| BFS                      | **O(b^d)**                     | Every vertex and every edge will be explored in the worst case.                                    |
| Uniform-Cost Search      | **O(b^(1 + floor(C/e))**       | There are 1 + C / e layers needed to expand. The exponent follows from the sum of geometric series |
| Greedy Best-First Search | **O(b^d)**                     | The number of nodes expanded is exponential in the depth of the solution (the shortest path).      |
| A\*                      | **O(b^d)**                     | The number of nodes expanded is exponential in the depth of the solution (the shortest path)       |

where:
**|V|** is the number of vertices and
**|E|** is the number of edges in the graph
**C** is the cost of the optimal solution
**e** is the least cost of an edge
**b** is the maximum branching factor (number of children nodes at each step)
**d**is the maximum depth of the search tree

## Sources

https://www.redblobgames.com/pathfinding/a-star/introduction.html
https://en.wikipedia.org/wiki/Breadth-first_search#Time_and_space_complexity
https://stackoverflow.com/questions/19204682/time-complexity-of-uniform-cost-search
https://en.wikipedia.org/wiki/A*_search_algorithm#Complexity
