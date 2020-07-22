# Project structure

The project is a purely client-side implementation.

The major algorithms and data structures are situated in their own respective folders, and are imported by the UI code for use.

UI files (React components and styling) are live in a 'components' folder.

Component test files live within the component's folder.

# Implemented time and space complexities (big-O complexity analysis of (pseudo)code)

TODO

# Comparative performance and complexity analysis if applicable

TODO

# Possible flaws and improvements

The are at least two flaws in implementing the project this way:

## UI performance

The grid and its constituent nodes are represented as HTML div elements - these are clunky and do not scale performance wise. A better approach would be to use SVGs or the HTML canvas API, possibly with the help of third-party libraries.

## Muddling of UI with algorithmic logic

The pathfinders will determine operations based on a DOM node's state. For example, a wall node is marked as such in the underlying DOM node representation. This is not optimal, but was opted for to lighten the burden on the browser's rendering engine.

# Sources
