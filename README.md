# A Simple Calculator

Now made with React!

## Known Issues

1. Sometimes some operators remain in the display. Eg. 567^2^2 -> el resultado a mostrar es 321489^2

## Future Updates / Improvements

- Set a maximum to how many decimals can be displayed ??? (This can be a bad approach but at the same time it is a 'simple' calculator).
- After the obtantion of a result, if an operator is pressed it will be added, but if it's another number it will be added as a new count. ??? (Maybe this isn't necessary).
- Change display colors on click / hover.
- Some operations will not take place, but remains after showing the results. This is cause due to not having the right validations before doing a calculation. See #1 K.I.
  - Error could be due to multiple operators that are equal and 'next' to each other. Because of the deletion of strings and reassignation on the counter probably turns to be higher, then it passes it away.
