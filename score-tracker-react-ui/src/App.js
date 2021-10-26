import React, { useState, useEffect } from 'react';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import "react-widgets/styles.css";
import './App.css';
import Combobox from "react-widgets/Combobox"
import NumberPicker from "react-widgets/NumberPicker";

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
          <Route path="/public_post">
            <PublicPost />
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

  function refreshData() {
    fetch('/api/v1/score/all/top').then(res => res.json()).then(data => {
      setTopScores(data.map((score) => <tr><td>{score.game}</td><td>{score.name}</td><td>{score.score}</td></tr>))
    })

    fetch('/api/v1/score/all').then(res => res.json()).then(data => {
      setSingleGameAreas(data.map((game) => {
        return (<div game={game.game} className="main {game.game}"><table><tr className="header-row"><th colspan="2" className="title">{game.game}</th></tr><tr className="header-row"><th>Player</th><th>Score</th></tr>{game['scores'].map((score) => <tr><td>{score.name}</td><td>{score.score}</td></tr>)}</table></div>)
      }))
    })
  }

  function flipDisplay() {
    console.log("Flipping display...")
    var mainPanels = document.getElementsByClassName("main")

    for (var i = 0; i < mainPanels.length; i++) {
      if (i == currentlyDisplayed) {
       mainPanels[i].style.display = "block"
       mainPanels[i].style.backgroundImage = "url('http://" + window.location.hostname + ":5000/api/v1/image/" + mainPanels[i].getAttribute("game") + "')"
       mainPanels[i].style.backgroundSize = "cover"
       mainPanels[i].style.backgroundRepeat = "no-repeat"
      } else {
       mainPanels[i].style.display = "none"
      }
    }

    currentlyDisplayed++

    if (currentlyDisplayed >= mainPanels.length) {
      refreshData()
      currentlyDisplayed = 0
    }

    setTimeout(flipDisplay.bind(), 5000)
  }

  useEffect(() => {
    refreshData();
    setTimeout(flipDisplay.bind(), 5000)
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
  const [games, setGames] = useState(0)
  const [game, setGame] = useState(0)
  const [score, setScore] = useState(0)
  const [name, setName] = useState(0)

  function refreshData() {
    fetch('http://' + window.location.hostname + ':5000/api/v1/score/all/top').then(res => res.json()).then(data => {
      setTopScores(data.map((score) => <tr style={{fontSize: '1.5em'}} className="highlight-row"><td colspan="4"><a href={"/edit/" + score.game}>{score.game}</a></td></tr>))
      setGames(data.map((score) => score.game))
    });
  }

  useEffect(() => {
    refreshData();
  }, ['URL'])

  const addScore = () => {
    fetch('http://' + window.location.hostname + ':5000/api/v1/score', 
    {
      method: 'POST',
      body: JSON.stringify({
        'name': name,
        'score': score,
        'game': game
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
          refreshData();
    });
  }

  return (
    <div id="scoreDisplay">
      <div className="main all-games default-bg">
          <table>
            <tr className="header-row">
              <th colspan="4" className="title">Games</th>
            </tr>
            {topScores}
            <tr>
              <td><Combobox style={{fontSize: '1em'}} onChange={value => setGame(value)} data={games} placeholder="Search for a game."></Combobox></td>
              <td><Combobox style={{fontSize: '1em'}} id="playerNameInput" onChange={value => setName(value)} hideCaret hideEmptyPopup placeholder="Player name."></Combobox></td>
              <td><NumberPicker id="scoreInput" onChange={value => setScore(value)} placeholder="Player score."></NumberPicker></td>          
              <td><button className="style-button" onClick={addScore}>Add</button></td>
            </tr>
          </table>
      </div>
    </div>
  );
}

function PublicPost() {
  const [games, setGames] = useState(0)
  const [game, setGame] = useState()
  const [name, setName] = useState()
  const [score, setScore] = useState()


  useEffect(() => {
    fetch('http://'+window.location.hostname+':5000/api/v1/score/all/top').then(res => res.json()).then(data => {
      setGames(data.map((score) => score.game))
    })
  }, [])

  const addScore = () => {
    fetch('http://' + window.location.hostname + ':5000/api/v1/score', 
    {
      method: 'POST',
      body: JSON.stringify({
        'name': name,
        'score': score,
        'game': game
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
          window.location.href = '/display'
    });
  }

  return(<div className="public default-bg">
    <div className="public-inner">
      <Combobox onChange={value => setGame(value)} data={games} placeholder="Search for a game."></Combobox>
      <br/>
      <Combobox onChange={value => setName(value)} hideCaret hideEmptyPopup placeholder="Player name."></Combobox>
      <br/>
      <NumberPicker onChange={value => setScore(value)} placeholder="Your score."></NumberPicker>
      <br/>
      <button className="style-button" onClick={addScore}>ADD SCORE</button>
    </div>
  </div>)
}

function EditGame() {
  let { game } = useParams()
  
  const [scores, setScores] = useState(0)
  const [selectedFile, setSelectedFile] = useState();
  const [name, setName] = useState()
  const [score, setScore] = useState()

  function refreshData() {
    fetch('http://' + window.location.hostname + ':5000/api/v1/score/' + game + '/top/100').then(res => res.json()).then(data => {
      setScores(data.map((score) => <tr style={{fontSize: '1.5em'}}><td width="5%"><button className="style-button" game={game} name={score.name} score={score.score} onClick={deleteScore}>Delete</button></td><td style={{width: '10%'}}>{score.name}</td><td>{score.score}</td></tr>))
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  useEffect(() => {
    refreshData();
  }, []);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append('file', selectedFile);
    console.log("Uploading file...")

    fetch(
      'http://' + window.location.hostname + ':5000/api/v1/image/' + game,
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
    fetch('http://' + window.location.hostname + ':5000/api/v1/score/' + event.target.getAttribute("game") + '/delete?name=' + event.target.getAttribute("name") + '&score=' + event.target.getAttribute("score"),
      {
        method: 'DELETE'
      })

    window.location.reload();
  }

  const addScore = () => {
    fetch('http://' + window.location.hostname + ':5000/api/v1/score', 
    {
      method: 'POST',
      body: JSON.stringify({
        'name': name,
        'score': score,
        'game': game
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
          window.location.reload();
    });
  }

  return (<div className="default-bg console-font">
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
        <td><button onClick={addScore} className="style-button">Add</button></td>
        <td><Combobox id="playerNameInput" onChange={value => setName(value)} hideCaret hideEmptyPopup placeholder="Player name."></Combobox></td>
        <td><NumberPicker id="scoreInput" onChange={value => setScore(value)} placeholder="Player score."></NumberPicker></td>
      </tr>
    </table>
  </div>)
}


export default App;
