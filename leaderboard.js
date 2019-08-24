const path = require('path');
const Max = require('max-api');
const lodash = require('lodash')

// our leaderboard!
let leaderboard = []
// receive a portrait score update
Max.addHandler("tally", (portrait, score) => {
  // prepare an entry
  let entry = {"portrait": portrait, "score": score}
  // if leaderboard has no entries, add one
  if (score === 'remove'){
    // here we update an entry by first removing it...
    leaderboard = leaderboard.filter(function (el) {
      return el.portrait != portrait
    })
  }
  else if (leaderboard.length === 0){
    leaderboard.push(entry)
    Max.post('\n', leaderboard);
  } else {
    // here we update an entry by first removing it...
    leaderboard = leaderboard.filter(function (el) {
      return el.portrait != portrait
    });
    // ...and then replace it with updated value
    leaderboard.push(entry)
  }
// sort the leaderboard by top score
leaderboard = lodash.orderBy(leaderboard, ['score'],['desc']); 
// post the updated leaderboard to the Max Console
Max.post('sorted', leaderboard)

Max.outlet('leaderboard', leaderboard) // ['alpha', 'beta'] 

});

