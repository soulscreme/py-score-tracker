import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/display">
            <Display />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/edit/:game">
            <EditGame />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Display() {
  const [topScores, setTopScores] = useState(0)
  const [singleGameAreas, setSingleGameAreas] = useState(1)

  var currentlyDisplayed = 0;

  function flipDisplay() {
    var mainPanels = document.getElementsByClassName("main")

    for (var i = 0; i < mainPanels.length; i++) {
      if (i == currentlyDisplayed) {
       mainPanels[i].style.display = "block"
       mainPanels[i].style.backgroundImage = "url('/api/v1/image/" + mainPanels[i].getAttribute("game") + "')"
       mainPanels[i].style.backgroundSize = "cover"
       mainPanels[i].style.backgroundRepeat = "no-repeat"
      } else {
       mainPanels[i].style.display = "none"
      }
    }

    currentlyDisplayed++

    if (currentlyDisplayed >= mainPanels.length) {
      currentlyDisplayed = 0
    }

    setTimeout(flipDisplay.bind(), 5000)
  }

  setTimeout(flipDisplay.bind(), 500)


  useEffect(() => {
    fetch('/api/v1/score/all/top').then(res => res.json()).then(data => {
      setTopScores(data.map((score) => <tr><td>{score.game}</td><td>{score.name}</td><td>{score.score}</td></tr>))
    })

    fetch('/api/v1/score/all').then(res => res.json()).then(data => {
      setSingleGameAreas(data.map((game) => {
        console.log("Setting background for " + game.game)
        return (<div game={game.game} className="main {game.game}"><table><tr className="header-row"><th colspan="2" className="title">{game.game}</th></tr><tr className="header-row"><th>Player</th><th>Score</th></tr>{game['scores'].map((score) => <tr><td>{score.name}</td><td>{score.score}</td></tr>)}</table></div>)
      }))
    })
  }, ['URL'])

  return (
    <div id="scoreDisplay">
      <div className="main all-games">
          <table>
            <tr className="header-row">
              <th colspan="3" className="title">Best of the Best</th>
            </tr>
            <tr className="header-row">
              <th>Game</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
            {topScores}
          </table>
      </div>
      {singleGameAreas}
    </div>
  );
}

function Admin() {
  const [topScores, setTopScores] = useState(0)

  useEffect(() => {
    fetch('/api/v1/score/all/top').then(res => res.json()).then(data => {
      setTopScores(data.map((score) => <tr><td><a href={"/edit/" + score.game}>{score.game}</a></td></tr>))
    })
  }, ['URL'])

  return (
    <div id="scoreDisplay">
      <div className="main all-games">
          <table>
            <tr className="header-row">
              <th className="title">Games</th>
            </tr>
            {topScores}
          </table>
      </div>
    </div>
  );
}

function EditGame() {
  let { game } = useParams()
  
  const [scores, setScores] = useState(0)
  const [selectedFile, setSelectedFile] = useState();

  const refreshData = () => {
    fetch('/api/v1/score/' + game + '/top/100').then(res => res.json()).then(data => {
      setScores(data.map((score) => <tr><td width="5%"><button game={game} name={score.name} score={score.score} onClick={deleteScore}>Delete</button></td><td>{score.name}</td><td>{score.score}</td></tr>))
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  refreshData();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append('file', selectedFile);
    console.log("Uploading file...")

    fetch(
      '/api/v1/image/' + game,
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((result) => {
        console.log('Success:', result);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteScore = (event) => {
    fetch('/api/v1/score/' + event.target.getAttribute("game") + '/delete?name=' + event.target.getAttribute("name") + '&score=' + event.target.getAttribute("score"),
      {
        method: 'DELETE'
      })

    refreshData();
  }

  const addScore = () => {
    fetch('/api/v1/score', 
    {
      method: 'POST',
      body: JSON.stringify({
        'name': document.getElementById("playerNameInput").value,
        'score': document.getElementById("scoreInput").value,
        'game': game
      })
    });
    refreshData();
  }

  return (<div>
    <table>
      <tr>
      <td colspan="3"><a href="/admin">&lt;&lt; Back</a></td>
      </tr>
      <tr className="header-row">
        <td colspan="3">{game}</td>
      </tr>
      <tr>
        <td>Background Image</td>
        <td colspan="2">
          <img src={"/api/v1/image/"+game} name="bgImage" width="400px"></img>
          <br></br>
          <input type="file" id="file" name="file" onChange={changeHandler}></input>
          <br></br>
          <button onClick={handleSubmission}>Submit</button>
        </td>
      </tr>
      <tr>
        <td colspan="3">Scores</td>
      </tr>
      {scores}
      <tr>
        <td><button onClick={addScore}>Add</button></td>
        <td><input id="playerNameInput"></input></td>
        <td><input id="scoreInput"></input></td>
      </tr>
    </table>
  </div>)
}


export default App;
