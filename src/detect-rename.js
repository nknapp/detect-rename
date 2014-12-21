var sim = require("string-similarity");

/**
 * @param source object containing the source strings (name -> contents)
 * @param target object containing the target strings (name -> contents)
 * @param options {object} options for the function
 * @param [options.threshold] {number} lower similarity threshold for what is considered "equal".
 *
 */
function detectRenames(source,target,options) {
    options = defaults(options,{
        threshold: 0.5
    });

    // Find added and removed strings
    var removed = Object.keys(source).filter(function(key) {
        return !target.hasOwnProperty(key);
    });
    var added = Object.keys(target).filter(function(key) {
        return !source.hasOwnProperty(key);
    });
    // For each removed key, find an added key with similarity greater than threshold
    var possibleRenames = [];
    removed.forEach(function(removedKey) {
        added.forEach(function(addedKey) {
            var similarity = sim.compareTwoStrings(source[removedKey], target[addedKey]);
            if (similarity>=options.threshold) {
                possibleRenames.push({
                    from: removedKey,
                    to: addedKey,
                    sim: similarity
                });
            }
        });
    });
    var usedTargets = {},
        results = {};

    // Gather actual results by examining renames, starting with the most similar
    possibleRenames.sort(function(a,b) {
        return b.sim - a.sim; // Order descending by "sim"
    });

    possibleRenames.forEach(function(rename) {
        if (!results.hasOwnProperty(rename.from) && !usedTargets.hasOwnProperty(rename.to)) {
            results[rename.from] = {
                to: rename.to,
                sim: rename.sim

            };
            usedTargets[rename.to] = rename.from;
        }
    });
    results._possible = possibleRenames;
    return results;
}

function defaults(options,defaultOptions) {
    var _options = options || {};
    Object.keys(defaultOptions).forEach(function(key) {
        if (_options.hasOwnProperty(key)) {
            defaultOptions[key] = _options[key];
        }
    });
    return defaultOptions;
}

module.exports = detectRenames;
