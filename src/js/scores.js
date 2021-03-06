const scoresUrl = "//www.nfl.com/liveupdate/scorestrip/ss.json";
// './test-data.json';

let games;
let result;

// hide the loading el
let loader = document.getElementById("loading");
loader.style.display = 'none';

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

  // loop through games data, set home/away variables to determine winner/loser/tie
  // return a result
  calcScore = (team) => {
    for (let i = 0; i < games.length; i++) {
      let homeTeamScore = games[i].hs;
      let awayTeamScore = games[i].vs;
      let homeTeam = games[i].hnn.toLowerCase();
      let awayTeam = games[i].vnn.toLowerCase();
      let isHomeTeam;
      let winnerHome;
      let tied;

      if (team === homeTeam) {
        isHomeTeam = true;
        winner = homeTeamScore > awayTeamScore;
        tied = homeTeamScore === awayTeamScore;
      } else if (team === awayTeam) {
        isHomeTeam = false;
        winner = homeTeamScore < awayTeamScore;
        tied = homeTeamScore === awayTeamScore;
      }

      if (isHomeTeam === true && winner === true) {
        result = `The ${team} won.`;
      } else if (isHomeTeam === true && winner === false) {
        result = `The ${team} lost.`;
      } else if (isHomeTeam === false && winner === true) {
        result = `The ${team} won.`;
      } else if (isHomeTeam === false && winner === false) {
        result = `The ${team} lost.`;
      } else if (isHomeTeam === true && tied === true && isHomeTeam === false && tied === true) {
        result = `The ${team} tied.`;
      }
      resultsEl.innerHTML = result;
    }

  };

  // test the search input's value; if not empty, run calcScore()
  // for use within event handler
  testInput = () => {
    if (searchInput.value === '') {
      resultsEl.innerHTML = 'Enter an NFL team name.';
    } else {
      // show the loading el
      loader.style.display = 'block';
      resultsEl.style.display = 'none';
      setTimeout(function(){
        // after timeout, hide the loading el
        loader.style.display = 'none';
        resultsEl.style.display = 'block';
        // afer timeout, run calcScore() on search input value
        calcScore(searchInput.value.toLowerCase());
      }, 1500);
    }
  };

  // onclick call calcScore() and pass the searched input's value (team name)
  searchBtn.addEventListener("click", function() {
    testInput();
  });

  // same thing, but for the enter key
  searchInput.addEventListener("keyup", function(e) {
    e.preventDefault();
    if (event.keyCode === 13) {
      // simulate click
      searchBtn.click();
      testInput();
    }
  });

}; //init()
