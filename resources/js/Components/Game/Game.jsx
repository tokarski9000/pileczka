import React, { createContext, useContext } from 'react';
import styles from './Game.module.scss';
import ScoreTable from '@/Components/ScoreTable/ScoreTable.jsx';
import NoTeamList from '@/Components/NoTeamList/NoTeamList.jsx';
import { AuthContext } from '@/Layouts/Layout';

export const GameContext = createContext({ game: null });

export default function Game({ game }) {
  const auth = useContext(AuthContext);
  const team1 = game.players.filter((player) => player.team_id === 1);
  const team2 = game.players.filter((player) => player.team_id === 2);
  const noTeam = game.players.filter((player) => player.team_id === null);

  return (
    <GameContext.Provider value={game}>
      <article className={`${styles.Game} row`}>
        <div className="col-12 col-lg-3 mb-3 text-center text-lg-start">
          <a href={route('game.show', [game.id])}>
            <h2>
              {game.score[1]}
              {' '}
              -
              {' '}
              {game.score[2]}
            </h2>
          </a>
          <h3>
            <a href={route('game.show', [game.id])}>
              {game.place}
            </a>
          </h3>
          <small>{game.date_time}</small>
        </div>
        <div className="col-12 col-lg-9">
          <div className={`${styles.Table} row`}>
            {noTeam.length >= 1 && (
            <div className="mb-3">
              <NoTeamList players={noTeam} />
            </div>
            )}
            <div className="col-6">
              <ScoreTable team={team1} />
            </div>
            <div className="col-6">
              <ScoreTable team={team2} />
            </div>
          </div>
          {auth.user ? (
            <div
              className="mt-5 row justify-content-center justify-content-lg-end gap-4"
            >
              <a
                href={route('game.show', [game.id])}
                className="col-5 col-lg-2"
              >
                <button>Edit</button>
              </a>
            </div>
          ) : null}
        </div>
      </article>
    </GameContext.Provider>
  );
}
