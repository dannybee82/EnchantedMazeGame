# EnchantedMazeGame

Angular 20 (with [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2)  and Bootstrap 5 - HTML game.

Enchanted Maze Game. Based on a board game with the same name. 

Find treasures in a maze. Play against computers.

See example images in root directory.

## Installation + run app

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

_June 2025_

\- Upgrade to Angular 20. 

\- Using the keyword **protected** for properties that are only accessible in the template.

\- Using the keyword **readonly** for properties initialized by Angular (input(), output(), model()).

\- Removed unnecessary package _@angular/platform-browser-dynamic_

\- Various minor changes.

\- Suppressing deprecation warnings of _Bootstrap_ in _angular.json_ with the code:

`"stylePreprocessorOptions": {`  
`"sass": {`  
`"silenceDeprecations": ["mixed-decls", "color-functions", "global-builtin", "import"]`  
`}`  
`},`