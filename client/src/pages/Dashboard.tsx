import { EngineerDashboard } from "../components/EngineerDashboard";
import { ManagerDashboard } from "../components/ManagerDashboard";
import { useStore } from "../store";

export function Dashboard() {
    const user = useStore((state) => state.user);
    
    return(
        <>
            {user?.role === "Engineer" ? <EngineerDashboard /> : <ManagerDashboard />}
        </>
    )
}