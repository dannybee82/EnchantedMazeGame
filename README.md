# EnchantedMazeGame

Angular 20 (with [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2) and Bootstrap 5 - HTML game.

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

**Command to run the tests with Vitest:**

_npm run test_

To see the _code coverage_ of the tests:

_npm run coverage_

When the command above is finished, the report is generated at: _/coverage/index.html_

### **Changelog:**

_September 2025_

\- Updated packages.

\_ Installed **Vitest** for tests. (removed _Karma_ which is **deprecated**).

\- Changes in speficication files (_toBeTrue_ to _toBeTruthy_, _toBeFalse_ to _toBeFalsy_, etc.).

\- Using _fixture.componentRef.setInput()_ to test _InputSignals_.

  
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