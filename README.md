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
```
    { cde: { to: 'cdef', sim: 1 },
     abc: { to: 'abcd', sim: 0.9629629629629629 },
     _possible:
      [ { from: 'cde', to: 'cdef', sim: 1 },
        { from: 'cdeg', to: 'cdef', sim: 0.9655172413793104 },
        { from: 'abc', to: 'abcd', sim: 0.9629629629629629 },
        { from: 'abc', to: 'cdef', sim: 0.7407407407407407 },
        { from: 'cde', to: 'abcd', sim: 0.7142857142857143 },
        { from: 'cdeg', to: 'abcd', sim: 0.6896551724137931 } ] }
```

Changes
--------

####0.0.1
  * Initial checkin