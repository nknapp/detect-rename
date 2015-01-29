Introduction
------------

The goal of this package is, to detect file renames based on the file contents, similar to the way `git` does it.
Files and contents are provided as javascript object, so this module should not need to access file system and
may even work in a browser.


Example
-------

```js
var detect = require("detect-rename.js");

console.log(detect({
   "abc": "Lorem ipsum sit desc",
   "cde": "Lorem ipsum sit incro",
   "qwertz": "poiu",
   "cdeg": "Lorem ipsum sit incroa"
},{
   "abcd": "Lorem ipsum sit desca",
   "cdef": "Lorem ipsum sit incro",
   "qwertz": "poiu"
}));
```

Output:
```js
{
cdef: { from: 'cde', sim: 1 },
abcd: { from: 'abc', sim: 0.9629629629629629 }
}
```

*See the jsdoc comment for options*


Changes
--------

####0.0.1
  * Initial checkin

####0.1.0
  * Changed the output to use the target file as object key. This is more useful, because this is what the target file is like in the
    currently.



*Please note that this api is still experimental until version 1.0. Feedback is welcome, although I cannot guarantee any response times at the moment.*
