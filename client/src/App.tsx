import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/auth/LoginPage";
import {RegisterPage} from "./pages/auth/RegisterPage";
import {RoutesName} from "./enums/routes";
import {MainPage} from "./pages/main";
import {AuthRouter} from "./utils/routes/AuthRouter.tsx";
import {NotAuthRouter} from "./utils/routes/NotAuthRouter.tsx";
import {Header} from "./components/header";
import {AddEvent} from "./pages/events/addEvent";
import {Event} from "./pages/events/event";
import {Events} from "./pages/events/events";

function App() {
    const auth = true

    return (
        <>
            {auth && <Header/>}
            <Routes>
                <Route path={RoutesName.Main} element={<AuthRouter isAuth={auth}><MainPage/></AuthRouter>}/>
                <Route path={RoutesName.Login} element={<NotAuthRouter isAuth={auth}><LoginPage/></NotAuthRouter>}/>
                <Route path={RoutesName.Register} element={<NotAuthRouter isAuth={auth}><RegisterPage/></NotAuthRouter>}/>
                <Route path={RoutesName.AddEvent} element={<AuthRouter isAuth={auth}><AddEvent /></AuthRouter>}/>
                <Route path={`${RoutesName.Event}:id`} element={<AuthRouter isAuth={auth}><Event /></AuthRouter>}/>
                <Route path={RoutesName.Events} element={<AuthRouter isAuth={auth}><Events /></AuthRouter>}/>
            </Routes>
        </>
    )
}

export default App
