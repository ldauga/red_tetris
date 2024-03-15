import { useState } from "react"
import { useNavigate } from "react-router-dom"

const GameSelector = () => {
    const navigate = useNavigate()

    const [room, setRoom] = useState('')
    const [username, setUsername] = useState('')

    const onGo = () => {
        if (room && username) {
            navigate(`/#${room}[${username}]`)
        }
    }



    return (<>
    <input type="text" onChange={e => setRoom(e.currentTarget.value)} placeholder="room name" />
    <input type="text" onChange={e => setUsername(e.currentTarget.value)} placeholder="username"/>
    <button onClick={onGo}>Go</button>
    </>)



}

export default GameSelector