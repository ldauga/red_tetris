import { useEffect, useState } from "react";
import useHashRouter from "./hooks/useHashRouter.tsx";
import { useDispatch } from "react-redux";
import { SocketActionTypes } from "./middleware/socketMiddleware.ts";

import './index.css'

import { store } from "./store";
import GameSelector from "./GameSelector.tsx";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const [hash] = useHashRouter();
  const dispatch = useDispatch();
  const [gameSelector, setGameSelector] = useState<null | boolean>(null)
  const [grid, setGrid] = useState([])
  const [nextPiece, setNextPiece] = useState([])
  const [nextPieceTag, setNextPieceTag] = useState('')
  const [score, setScore] = useState('')

  const [previewOtherPlayers, setPreviewOtherPlayers] = useState<any[]>([])

  const [isOwner, setIsOwner] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isVictory, setIsVictory] = useState(false)

  useEffect(() => {
    const regex = /#(\w+)\[(\w+)]/;
    const matches = hash.match(regex);

    if (matches) {
      setGameSelector(false)

      if (store.getState().rootReducer.socket !== null) {
        dispatch({ type: SocketActionTypes.DISCONNECT });
      }
      dispatch({ type: SocketActionTypes.CONNECT, data: { room: matches[1], username: matches[2] } });
    } else {
      setGameSelector(true)
    }
  }, [hash, dispatch]);


  const handleKeyDown = (e: DocumentEventMap["keydown"]) => {
    const key = e.key;
    switch (key) {
      case "ArrowUp":
        dispatch({ type: SocketActionTypes.EMIT, event: "rotate", data: {} });
        break;
      case "ArrowDown":
        dispatch({ type: SocketActionTypes.EMIT, event: "moveDown", data: {} });
        break;
      case "ArrowLeft":
        dispatch({ type: SocketActionTypes.EMIT, event: "moveLeft", data: {} });
        break;
      case "ArrowRight":
        dispatch({ type: SocketActionTypes.EMIT, event: "moveRight", data: {} });
        break;
      case " ":
        dispatch({ type: SocketActionTypes.EMIT, event: "drop", data: {} });
        break;
      case "-":
        dispatch({ type: SocketActionTypes.EMIT, event: "remove_line", data: {} });
        break;
    }
  }

  useEffect(() => {
    // if (isWinner || isGameOver) {
    document.addEventListener("keydown", handleKeyDown);
    // }
  }, []);

  useEffect(() => {
    console.log(previewOtherPlayers)
  }, [previewOtherPlayers])


  if (gameSelector) return <GameSelector />

  if (store.getState().rootReducer.socket === null) {
    return (
      <div style={
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }
      }>
        <div>Connecting...</div>
      </div>
    );
  }



  dispatch({ type: SocketActionTypes.ON, event: 'main_player', callback: () => { setIsOwner(true) } })

  dispatch({ type: SocketActionTypes.ON, event: 'update', callback: ({ grid, next_piece, next_piece_tag, preview_other_players, score }: any) => { setGrid(grid); setNextPiece(next_piece); setNextPieceTag(next_piece_tag); setPreviewOtherPlayers(preview_other_players); setScore(score) } })


  dispatch({ type: SocketActionTypes.ON, event: 'error', callback: ({ msg }: any) => { alert(msg); navigate('/') } })



  dispatch({ type: SocketActionTypes.ON, event: 'started', callback: () => { setIsStarted(true); setIsGameOver(false); setIsVictory(false) } })
  dispatch({ type: SocketActionTypes.ON, event: 'game_over', callback: () => { setIsStarted(false); setIsGameOver(true) } })
  dispatch({ type: SocketActionTypes.ON, event: 'victory', callback: () => { setIsStarted(false); setIsVictory(true) } })





  const onStartGame = () => {
    dispatch({ type: SocketActionTypes.EMIT, event: 'start' })
  }





  return (
    <>


      {isGameOver && !isVictory &&
        <div className="container">
          <div className="main_message">Game Over</div>
          <div className="main_message">Score: {score}</div>
        </div>
      }
      {isVictory &&
        <div className="container">
          <div className="main_message">Victory</div>
          <div className="main_message">Score: {score}</div>
        </div>
      }

      {!isOwner && !isStarted &&
        <div className="container">
          <div className="main_message">Wait for the Owner {isGameOver || isVictory ? 'to restart the game' : 'to start the game'}</div>
        </div>
      }

{isOwner && !isStarted &&
        <div className="container">
          <button onClick={onStartGame}>{isGameOver || isVictory ? 'Restart the game' : 'Start the game'}</button>
        </div>
      }

      {isStarted && !isGameOver && !isVictory &&
        grid.length >= 1 &&
        <div className="mainGrid">
          <div className="grid">
            {grid.map((row: []) => (
              <div className="row">
                {row.map((cell) => (
                  <div className={`cell ${cell}`}></div>
                ))}
              </div>
            ))}
          </div>
          <div className="next">

            <div className="next_piece">
              <div className="nextgrid">
                {nextPiece.map((row: []) => (
                  <div className="nextrow">
                    {row.map((cell) => (
                      <div className={`nextcell ${cell == 1 ? nextPieceTag : '0'}`}></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="score">Score: {score}</div>
          </div>

          <div className="preview">
          {previewOtherPlayers.map(({ grid, name, next_piece, next_piece_tag }) => (
              <div className="previewgrid">
                <div className="flex">
                  <div className="nextgrid">
                    {grid.map((row: []) => (
                      <div className="nextrow">
                        {row.map((cell) => (
                          <div className={`minicell ${cell}`}></div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="next">
                    <div className="next_piece">
                      <div className="nextgrid">
                        {next_piece.map((row: []) => (
                        <div className="nextrow">
                            {row.map((cell) => (
                              <div className={`minicell ${cell == 1 ? next_piece_tag : '0'}`}></div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="miniscore">Score: {score}</div>
                  </div>
                </div>
                <div className="name">{name}</div>

              </div>
            ))}
          </div>
        </div>
      }











      {/* {
        grid.length > 0 && grid.map((row: string[]) => <div>
          {''.concat(...row)}
        </div>
        )
      } */}
    </>
  );
}

export default Home;
