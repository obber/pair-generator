var makePairsEven = function(students) {
  var results = [];
  var alreadyPaired = {}; // hash map to track who has already paired
  var alreadySoloed = {}; // hash map to track who has already solo-ed
  var temp = []; // temp array for possible solution

  var recurse = function(avail) {
    // base case: if there are no more students to choose from,
    //            and all pairs have not paired yet
    //            and the solo student has not soloed already
    if (avail.length === 0 && temp.every(function(pair) { return !alreadyPaired[pair] })) {
      
      // store pairs as alreadyPaired:
      temp.forEach(function(pair) {
        alreadyPaired[pair] = true;
      });

      results.push(temp.slice());
      return;
    }

    // try to find a pair for the last student
    var student = avail.pop();

    // loop through available options
    avail.forEach(function(partner, position) {
      var pair = [student, partner].sort().join(" | ");
      
      // check if they still haven't paired
      if (alreadyPaired[pair] === undefined) {
        temp.push(pair);

        recurse([].concat(avail.slice(0, position), avail.slice(position+1)));

        // remove pair from joined before moving on
        temp.pop();
      } 

    });

    // add the student back as an option before we return out of recursive call
    avail.push(student);
  };

  recurse(students);

  return results;

}

var makePairsOdd = function(students) {
  var results = [];
  var alreadySoloed = {};
  var alreadyPaired = {};
  var temp = []; // our temporary store of potential pairs
  var foundCombination = false;

  var recurse = function(avail) {
    if (foundCombination) {
      return;
    }

    // base case: 
    if (avail.length === 0 && temp.every(function(pair) { return !alreadyPaired[pair] })) {
      // store pairs as alreadyPaired:
      temp.forEach(function(pair) {
        alreadyPaired[pair] = true;
      });

      // toggle flag
      foundCombination = true;

      results.push(temp.slice());
      return;
    }

    // try to find a pair for the last student
    var student = avail.pop();

    // loop through available options
    avail.forEach(function(partner, position) {
      var pair = [student, partner].sort().join(" | ");
      
      // check if they still haven't paired
      if (alreadyPaired[pair] === undefined) {
        temp.push(pair);

        recurse([].concat(avail.slice(0, position), avail.slice(position+1)));

        // remove pair from joined before moving on
        temp.pop();
      } 

    });

    // add the student back as an option before we return out of recursive call
    avail.push(student);
  };

  students.forEach(function(student, position) {
    // toggle our flag
    foundCombination = false;

    // push each student into temp as a solo student
    temp.push("SOLO: " + student);

    // recurse with a copy of array excluding the solo student
    // we apply our even pair logic for the rest
    recurse([].concat(students.slice(0, position), students.slice(position+1)));

    // remove the student from temp
    temp.pop();
  });

  return results;
};
