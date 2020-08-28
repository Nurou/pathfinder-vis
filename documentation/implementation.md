# Project structure

The project is a purely client-side implementation.

Algorithms are found in the src/algorithms directory, data structures on the src/data structures directory. Units from both of these imported by the UI code for use.

Test files can be found in the same folder as the respective algorithm/data structure

All of the UI files (components and styling) live in a src/components folder.

Component test files live within the component's folder.

# Implemented time and space complexities (big-O complexity analysis of (pseudo)code)

The time complexities of the implementations are as they've been laid out in the [specification](https://github.com/Nurou/pathfinder-vis/blob/master/documentation/specification.md)

# Comparative performance and complexity analysis if applicable

A rudimentary performance analysis can be monitored in the application's UI.

# Possible flaws and improvements

The are at least two flaws in implementing the project this way:

## UI performance

The grid and its constituent nodes are represented as HTML div elements - these are clunky and do not scale performance wise. A better approach would be to use SVGs or the HTML canvas API, possibly with the help of third-party libraries.

## Muddling of UI with algorithmic logic

The pathfinders will determine operations based on a HTML DOM node's internal state. For example, a wall node is marked as such in the underlying DOM node representation through appending to/deducting from its class list. This is not optimal since it means that the algorithms logic is mixed with UI state, but was opted for to lighten the burden on the browser's rendering engine.
