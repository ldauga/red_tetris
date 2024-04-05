import { object, string } from "yup";

const GameSelectorSchemas = () =>
    object().shape({
        room: string()
            .max(50, "Room's name length must be less than 50 long.")
            .required("Room's name is required."),
        username: string()
            .max(50, "Room's name length must be less than 50 long.")
            .required("Username is required."),
    })

export default GameSelectorSchemas;