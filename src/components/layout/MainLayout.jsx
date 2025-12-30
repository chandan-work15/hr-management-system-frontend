import { Outlet } from "react-router-dom"
import Header from "./Header"


const MainLayout = () => {
    return (
        <div className="container-fluid">
            <Header />
            <main><Outlet /></main>
            {/* <h1>footer</h1> */}
        </div>
    )
}

export default MainLayout