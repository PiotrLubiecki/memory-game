import React from 'react';
import './styles/Scoreboard.css';

function Scoreboard(props) {
  return (
    <div id="scoreboard">
      <div className="scoreboard-display">
        <p>Score:</p> {props.currentScore}
      </div>
      <div className="scoreboard-display">
        <p>Top Score:</p> {props.topScore}
      </div>
    </div>
  );
}

export default Scoreboard;
