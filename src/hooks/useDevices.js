import { fetchDevices } from "@/api/devices";
import { useQuery } from "@tanstack/react-query";

export const useDevices = () => useQuery({ queryKey: ["devices"], queryFn: fetchDevices, refetchInterval: 30_000 });
