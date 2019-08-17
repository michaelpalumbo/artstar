const path = require('path');
const Max = require('max-api');

// This will be printed directly to the Max console
Max.post(`Loaded the ${path.basename(__filename)} script`);

// Use the 'addHandler' function to register a function for a particular message
let leaderboard = []
Max.addHandler("tally", (portrait, score) => {
  let entry = {"portrait": portrait, "score": score}
  //Max.post('incoming', portrait, score)
  if (leaderboard.length === 0){
    leaderboard.push(entry)
    Max.post('\n', leaderboard);

  } else {
    Max.post('pre-remove')
    // remove existing entry
    leaderboard = leaderboard.filter(function (el) {
      return el.portrait != portrait
    });
    Max.post('post-remove')

    // replace it with updated value
    leaderboard.push(entry)
    Max.post('post add')


  }

  Max.post(leaderboard)
  // function compare( a, b ) {
  //   if ( a.last_nom < b.last_nom ){
  //     return -1;
  //   }
  //   if ( a.last_nom > b.last_nom ){
  //     return 1;
  //   }
  //   return 0;
  // }
  
  // leaderboard.sort( compare );

//   var projects = {
//     jqueryUi : {
//        value:  'lol1',
//        desc:   'lol2'
//     }
//  };
 
 //projects.jqueryUi.desc = 'new string';

});

// Use the 'outlet' function to send messages out of node.script's outlet
Max.addHandler("echo", (msg) => {
	Max.outlet(msg);
});
