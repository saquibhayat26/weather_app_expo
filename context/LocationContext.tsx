import React, { createContext, useEffect, useMemo, useState } from "react";
import * as Location from "expo-location";
import { useLocationPermission } from "@/hooks/useLocationPermission";

interface LocationContextType {
  location: Location.LocationObject | null;
  errorMsg: string | null;
}

export const LocationContext = createContext<LocationContextType>({
  location: null,
  errorMsg: null,
});

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { requestLocationPermission } = useLocationPermission();

  useEffect(() => {
    (async () => {
      const granted = await requestLocationPermission();
      if (!granted) {
        console.log("Location permission denied");
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [requestLocationPermission]);

  const contextValue = useMemo(
    () => ({ location, errorMsg }),
    [location, errorMsg]
  );

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};
