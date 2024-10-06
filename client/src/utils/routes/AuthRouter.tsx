import {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {RoutesName} from "../../enums/routes";

type AuthRouterProps = {
    isAuth: boolean,
    children?: ReactNode
}

export const AuthRouter = ({isAuth, children}: AuthRouterProps) => {
    return isAuth ? (children) : <Navigate to={RoutesName.Login}/>
}