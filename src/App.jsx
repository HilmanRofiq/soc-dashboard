import AppLayout from "@/components/layout/AppLayout";
import AnalyticsPage from "@/pages/AnalyticsPage";
import HomePage from "@/pages/HomePage";
import MapPage from "@/pages/MapPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/map" element={<MapPage />} />
            </Route>
        </Routes>
    );
}
