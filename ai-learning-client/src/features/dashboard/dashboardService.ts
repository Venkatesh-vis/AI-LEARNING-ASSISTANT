import { requestWithRetry } from "../../api/apiRequest";
import type { DashboardData } from "./dashboardType";

export const getDashboardState = () => {
    return requestWithRetry<DashboardData>({
        url: "/progress",
        method: "GET",
    });
};