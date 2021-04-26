# A Simple Calculator

Now made with React!

## Known Issues

2. Some operations like 4^2^2 would be resolve as normal when in reality this shouldnt be possible. 
3. Also it's no possible to make a multiplication or division between two negative numbers.
4. Sometimes after a result displayed the '+/-' button doesn't work.
5. Sliders lack compatibility in most browsers.
6. Calculator must be able to recognize high numbers expressed with e (number * 10^x).
7. A number with multiple periods results in a NaN, which is okay, but it should display 'Syntax error'.
8. When trying to get a result from a single number, the display will show a 0.

## Future Updates / Improvements

- After the obtantion of a result, if an operator is pressed it will be added, but if it's another number it will be added as a new count. ??? (Maybe this isn't necessary).
- Needed a button to let mobile users delete 1 by 1. 
- Calculator needs to be responsive.
- Can / should I disabled zoom function on mobiles?
- When only a number is displayed, and I want to do its square root, the square root should be add before the number, not as it's now (after).
- Addition of new buttons -> AC, ^x, xroot, (, ), log, ln, pi. Optionals -> Ans, e, x!.
- Add support for Mac paste -> cmd + v.
- Enable mobile pasting.
- Fixing of Known Issues.
