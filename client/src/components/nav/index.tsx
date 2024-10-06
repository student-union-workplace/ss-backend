import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import {RoutesName} from "../../enums/routes";

export const Navbar = () => {
    return(
        <Box>
            <Link to={RoutesName.Main}>Главная</Link>
            <Link to={RoutesName.Login}>Логин</Link>
            <Link to={RoutesName.Register}>Регистрация</Link>
        </Box>
    )
}