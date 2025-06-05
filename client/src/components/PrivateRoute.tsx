

// This will prevent non-authenticated users from accessing this route
import { Navigate } from "react-router-dom"
import { useStore } from "../store"

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const token = useStore((state) => state.token)

    if (token !== null) {
        return children
    } else {
        return <Navigate to="/" />
    }
}

export default PrivateRoute