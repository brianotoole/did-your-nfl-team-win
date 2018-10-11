
const scoresUrl = "//www.nfl.com/liveupdate/scorestrip/ss.json"; //./test.json for debugging
let games;
let result;

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

// set up, declares variables, contain functions
init = () => {
  // grab the UI elements to manipulate
  let searchInput = document.getElementById("search");
  let searchBtn = document.getElementById("btn-search");
  let resultsEl = document.getElementById("results");

  // onclick call calcScore() and pass the searched input's value (team name)
  searchBtn.addEventListener("click", function() {
    if (searchInput.value === '') {
      resultsEl.innerHTML = 'Enter an NFL team name.';
    } else {
      calcScore(searchInput.value.toLowerCase());
    }
  });

  // loop through games data, set home/away variables to determine winner/loser/tie
  // return a result
  calcScore = (team) => {
    for (let i = 0; i < games.length; i++) {
      let homeTeam = games[i].hnn.toLowerCase();
      let awayTeam = games[i].vnn.toLowerCase();
      let homeTeamScore = games[i].hs;
      let awayTeamScore = games[i].vs;

      if (team === homeTeam && homeTeamScore > awayTeamScore) {
        result = `The ${team} won.`;
      } else if (team === awayTeam && awayTeamScore < homeTeamScore) {
        result = `The ${team} lost.`;
      } else if (team === awayTeam && awayTeamScore === homeTeamScore || team === homeTeam && homeTeamScore == awayTeamScore) {
        result = `The ${team} tied.`;
      }
      resultsEl.innerHTML = result;
    }
  };

}; //init()
