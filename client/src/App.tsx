import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/auth/LoginPage";
import {RegisterPage} from "./pages/auth/RegisterPage";
import {RoutesName} from "./enums/routes";
import {KanbanPage} from "./pages/kanban";
import {AuthRouter} from "./utils/routes/AuthRouter.tsx";
import {NotAuthRouter} from "./utils/routes/NotAuthRouter.tsx";
import {Header} from "./components/header";
import {AddEvent} from "./pages/events/addEvent";
import {Event} from "./pages/events/event";
import {Events} from "./pages/events/events";
import {CalendarPage} from "./pages/calendar";
import {UserPage} from "./pages/users/user";
import {UsersPage} from "./pages/users/users";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

function App() {
    const auth = !!localStorage.getItem('token')

    return (
        <>
            {auth && <Header/>}
            <QueryClientProvider client={queryClient}><Routes>
                <Route path={RoutesName.Kanban} element={<AuthRouter isAuth={auth}><KanbanPage/></AuthRouter>}/>
                <Route path={RoutesName.Calendar} element={<AuthRouter isAuth={auth}><CalendarPage/></AuthRouter>}/>
                <Route path={RoutesName.Login} element={<NotAuthRouter isAuth={auth}><LoginPage/></NotAuthRouter>}/>
                <Route path={RoutesName.Register} element={<NotAuthRouter isAuth={auth}><RegisterPage/></NotAuthRouter>}/>
                <Route path={RoutesName.AddEvent} element={<AuthRouter isAuth={auth}><AddEvent /></AuthRouter>}/>
                <Route path={`${RoutesName.Event}:id`} element={<AuthRouter isAuth={auth}><Event /></AuthRouter>}/>
                <Route path={RoutesName.Events} element={<AuthRouter isAuth={auth}><Events /></AuthRouter>}/>
                <Route path={`${RoutesName.User}:id`} element={<AuthRouter isAuth={auth}><UserPage /></AuthRouter>}/>
                <Route path={RoutesName.Users} element={<AuthRouter isAuth={auth}><UsersPage /></AuthRouter>}/>
            </Routes></QueryClientProvider>
        </>
    )
}

export default App
