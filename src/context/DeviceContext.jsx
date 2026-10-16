import { useDevices } from "@/hooks/useDevices";
import { createContext, useContext, useEffect, useState } from "react";

const DeviceContext = createContext(null);

export function DeviceProvider({ children }) {
    const { data: devices = [], isLoading, error } = useDevices();
    const [selectedId, setSelectedId] = useState(null);

    // Pilih device pertama secara otomatis saat data tiba
    useEffect(() => {
        if (!selectedId && devices.length) setSelectedId(devices[0].id);
    }, [devices, selectedId]);

    const selected = devices.find(d => d.id === selectedId) ?? null;

    return (
        <DeviceContext.Provider value={{ devices, selected, selectedId, setSelectedId, isLoading, error }}>
            {children}
        </DeviceContext.Provider>
    );
}

export const useDevice = () => useContext(DeviceContext);
