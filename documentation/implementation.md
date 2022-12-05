# Project structure

The whole project is implemented client-side.

Algorithms are found in the src/algorithms directory and data structures on the src/data structures directory.

Test files are co-located with their respective algorithm or data structure.

All of the UI files live in a src/components folder.

Component test files live within the component's folder.

# Implemented time and space complexities (big-O complexity analysis of (pseudo)code)

The time complexities of the implementations are as they've been laid out in the [specification](https://github.com/Nurou/pathfinder-vis/blob/master/documentation/specification.md)

# Comparative performance and complexity analysis if applicable

A rudimentary performance analysis can be monitored in the application's UI.

# Possible flaws and improvements

The are at least two known major flaws in the current implementation:

## UI performance

The grid and its constituent nodes are represented as HTML div elements - these are clunky and do not scale performance wise. A better approach would be to use SVGs or the HTML Canvas API.

## Muddling of UI with algorithmic logic

The pathfinders will determine operations based on a HTML DOM node's internal state. For example, a wall node is marked as such in the underlying DOM node representation through appending to/deducting from its class list. This is not optimal since it means that the algorithms logic is mixed with UI state.
