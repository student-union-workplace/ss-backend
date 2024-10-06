import {ReactNode} from "react";
import {RoutesName} from "../../enums/routes";
import {Navigate} from "react-router-dom";

type AuthRouterProps = {
    isAuth: boolean,
    children?: ReactNode
}

export const NotAuthRouter = ({isAuth, children}: AuthRouterProps) => {
    return isAuth ? <Navigate to={RoutesName.Main}/> : (children)
}