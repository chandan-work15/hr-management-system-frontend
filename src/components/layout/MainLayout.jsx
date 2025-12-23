import { Outlet } from "react-router-dom"


const MainLayout = ({ children }) => {
    return (
        <div>
            <h1>header</h1>
            <main><Outlet /></main> 
            <h1>footer</h1>
        </div>
    )
}

export default MainLayout