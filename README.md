# string-comparison
This is an implementation of string comparison using the string-similarity node package

## Files
### packageCode.mjs
- This file contains the string-similarity functions. 
- There in are 3 functions:
    1. compareTwoFunctions() - makes a comparison 
    2. findBestMatch() - checks similarity of a string against an array of strings and picks the best match
    3. areArgsValid() - check if the passed arguments are strings

### implementation.mjs
- In this file, the actual string comparison is done using two functions:
    1. **comparison()** - Takes two arguments, which should be objects and does the string comparison using the functions specified in packageCode.mjs.
    The function returns two variables: sum probability and average score
    2. **grading()** - It does grading based on the probability and score values passed to it 

