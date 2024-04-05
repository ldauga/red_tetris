import './GameSeletor.css'
import { useNavigate } from "react-router-dom"
import { Room, UserIcon } from './Icons'
import { useFormik } from "formik"
import GameSelectorSchemas from "./GameSelectorSchemas"


const GameSelector = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        validationSchema: GameSelectorSchemas(),
        initialValues: {
            room: '',
            username: '',
        },
        onSubmit: () => onGo(),
    });


    const onGo = () => {
        navigate(`/#${formik.values.room}[${formik.values.username}]`)
    }



    return (
        <form onSubmit={formik.handleSubmit}>

        <div className="container">
            <div className="list">
                <div>
                    <div className="loginInput">
                        <input
                            {...formik.getFieldProps('room')}
                            placeholder='Room'
                            autoFocus
                            />
                        <label>Room</label>
                        <div className="icon">
                            <Room />
                        </div>
                    </div>
                    {!!formik.errors.room && formik.touched.room && <div className='error'>{formik.errors.room}</div>}
                </div>
                <div>
                    <div className="loginInput">
                        <input
                            placeholder='Username'
                            {...formik.getFieldProps('username')}
                            />
                        <label>Username</label>
                        <div className="icon">
                            <UserIcon />
                        </div>
                    </div>
                    {!!formik.errors.username && formik.touched.username && <div className='error'>{formik.errors.username}</div>}
                </div>
            </div>

            <button type='submit' onClick={onGo}>Go</button>
        </div>


                            </form>
    )



}

export default GameSelector