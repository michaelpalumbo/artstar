
leaderboard = [
  {portrait: "A", score: 123},
  {portrait: "B", score: 65},

]

leaderboard = leaderboard.filter(function (el) {
  return el.portrait != "A"
});
console.log(leaderboard);