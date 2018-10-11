
const scoresUrl = "//www.nfl.com/liveupdate/scorestrip/ss.json"; //./test.json for debugging
let games;

// use fetch to retrieve scores data from url
// format as JSON using response.json() and run init()
fetch(scoresUrl).then(function(response) {
  if (response.ok) {
    response.json().then(function(json) {
      data = json;
      games = data.gms;
      init();
    });
  } else {
    console.log(
      "Request for scores.json failed with response " +
        response.status +
        ": " +
        response.statusText
    );
  }
});

// set up logic, declares variables, contain functions
init = () => {
  // grab the UI elements to manipulate
  let searchInput = document.getElementById("search");
  let searchBtn = document.getElementById("btn-search");
  let resultsEl = document.getElementById("results");
  let noSearch = "";

  // on click invoke calcScore() and pass the searched
  // input's value
  searchBtn.addEventListener("click", function() {
    calcScore(searchInput.value);
  });

  // loop through games data, set home/away variables to determine winner/loser/tie
  // return a result
  calcScore = (team) => {
    let result;
    for (let i = 0; i < games.length; i++) {
      let homeTeam = games[i].hnn;
      let awayTeam = games[i].vnn;
      let homeTeamScore = games[i].hs;
      let awayTeamScore = games[i].vs;

      if (team === homeTeam && homeTeamScore > awayTeamScore) {
        result = `The ${team} won.`;
      } else if (team === awayTeam && awayTeamScore < homeTeamScore) {
        result = `The ${team} lost.`;
      } else if (team === awayTeam || (team === awayTeam && awayTeamScore === homeTeamScore)) {
        result = `The ${team} tied.`;
      }
      resultsEl.innerHTML = result;
    }
  };

}; //init()
