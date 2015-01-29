var detect = require("../src/detect-rename.js");

module.exports.testDetect = function(test) {
    test.expect(2);
    var renames = detect({
        "abc": "Lorem ipsum sit desc",
        "cde": "Lorem ipsum sit incro",
        "qwertz": "poiu",
        "cdeg": "Lorem ipsum sit incroa"
    },{
        "abcd": "Lorem ipsum sit desca",
        "cdef": "Lorem ipsum sit incro",
        "qwertz": "poiu"
    });
    console.log(renames);
    test.deepEqual(renames['cdef'],{ from: 'cde', sim: 1 });
    test.deepEqual(renames['abcd'],{ from: 'abc', sim: 0.9629629629629629 });
    test.done();
};
