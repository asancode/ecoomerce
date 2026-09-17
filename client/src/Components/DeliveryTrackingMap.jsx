import React, { useState, useCallback, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { BsBicycle } from "react-icons/bs";

// ⚠️ Apni shop/bakery ki actual coordinates .env se lein
const SHOP_LOCATION = {
  lat: Number(import.meta.env.VITE_SHOP_LAT) || 25.2048,
  lng: Number(import.meta.env.VITE_SHOP_LNG) || 55.2708,
};

const containerStyle = { width: "100%", height: "100%" };

// props: agentLocation ({lat,lng}|null), customerLocation ({lat,lng}|null)
const DeliveryTrackingMap = ({ agentLocation, customerLocation }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [directions, setDirections] = useState(null);
  const [eta, setEta] = useState(null);
  const [distance, setDistance] = useState(null);
  const [requested, setRequested] = useState(false);

  const origin = agentLocation?.lat ? agentLocation : SHOP_LOCATION;
  const destination =
    customerLocation?.lat && customerLocation?.lng ? customerLocation : null;

  const directionsCallback = useCallback((result, status) => {
    setRequested(true);
    if (status === "OK" && result) {
      setDirections(result);
      const leg = result.routes?.[0]?.legs?.[0];
      if (leg) {
        setEta(leg.duration?.text || null);
        setDistance(leg.distance?.text || null);
      }
    }
  }, []);

  const center = useMemo(() => origin, [origin?.lat, origin?.lng]);

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center text-red-500 text-sm">
        Map load nahi ho paya. API key check karein.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        Map load ho raha hai...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        <Marker
          position={SHOP_LOCATION}
          label={{ text: "Shop", className: "text-[10px] font-bold" }}
          icon={{
            path: window.google?.maps.SymbolPath.CIRCLE,
            fillColor: "#1e293b",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 9,
          }}
        />

        {agentLocation?.lat && (
          <Marker
            position={agentLocation}
            label={{ text: "Rider", className: "text-[10px] font-bold" }}
            icon={{
              path: window.google?.maps.SymbolPath.CIRCLE,
              fillColor: "#f59e0b",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
              scale: 9,
            }}
          />
        )}

        {destination && (
          <Marker
            position={destination}
            label={{ text: "You", className: "text-[10px] font-bold" }}
            icon={{
              path: window.google?.maps.SymbolPath.CIRCLE,
              fillColor: "#10b981",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
              scale: 9,
            }}
          />
        )}

        {destination && !requested && (
          <DirectionsService
            options={{ origin, destination, travelMode: "DRIVING" }}
            callback={directionsCallback}
          />
        )}

        {directions && (
          <DirectionsRenderer
            options={{
              directions,
              suppressMarkers: true,
              polylineOptions: { strokeColor: "#1e293b", strokeWeight: 4 },
            }}
          />
        )}
      </GoogleMap>

      {(eta || distance) && (
        <div className="absolute bottom-3 left-3 bg-white rounded-lg shadow-md px-4 py-2.5 flex items-center gap-3">
          <BsBicycle className="text-amber-500 text-lg" />
          <div>
            <p className="text-[13px] font-semibold text-gray-800">
              {eta ? `${eta} away` : "Calculating..."}
            </p>
            {distance && <p className="text-[11px] text-gray-500">{distance} remaining</p>}
          </div>
        </div>
      )}

      <div className="absolute top-3 right-3 bg-white rounded-lg shadow-md px-3 py-2 text-[11px] space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block" />
          <span>Shop</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
          <span>Rider</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          <span>You</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTrackingMap;
