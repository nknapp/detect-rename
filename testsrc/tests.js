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
    test.deepEqual(renames["cde"],{ to: 'cdef', sim: 1 });
    test.deepEqual(renames["abc"],{ to: 'abcd', sim: 0.9629629629629629 });
    test.done();
};
