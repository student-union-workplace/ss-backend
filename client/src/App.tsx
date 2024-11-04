import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/auth/LoginPage";
import {RegisterPage} from "./pages/auth/RegisterPage";
import {RoutesName} from "./enums/routes";
import {Navbar} from "./components/nav";
import {MainPage} from "./pages/main";
import {AuthRouter} from "./utils/routes/AuthRouter.tsx";
import {NotAuthRouter} from "./utils/routes/NotAuthRouter.tsx";

function App() {
    const auth = false

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={RoutesName.Main} element={<AuthRouter isAuth={auth}><MainPage/></AuthRouter>}/>
                <Route path={RoutesName.Login} element={<NotAuthRouter isAuth={auth}><LoginPage/></NotAuthRouter>}/>
                <Route path={RoutesName.Register} element={<NotAuthRouter isAuth={auth}><RegisterPage/></NotAuthRouter>}/>
            </Routes>
        </>
    )
}

export default App
