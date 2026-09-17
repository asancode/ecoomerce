import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const defaultCenter = [25.2048, 55.2708];

const createEmojiIcon = (emoji, background) =>
  L.divIcon({
    className: "",
    html: `<div style="width:40px;height:40px;border-radius:50%;background:${background};display:flex;align-items:center;justify-content:center;font-size:20px;border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.25);">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  });

const shopIcon = createEmojiIcon("🏪", "#2563EB");
const pickupIcon = createEmojiIcon("📦", "#9333EA");
const riderIcon = createEmojiIcon("🚚", "#F97316");
const customerIcon = createEmojiIcon("📍", "#16A34A");

const toLatLng = (lat, lng) => [Number(lat), Number(lng)];

const OrderTrackingMap = ({ shop, pickup, rider, customer }) => {
  const mapCenter = useMemo(() => {
    if (rider) return toLatLng(rider.lat, rider.lng);
    if (customer) return toLatLng(customer.latitude, customer.longitude);
    if (pickup) return toLatLng(pickup.latitude, pickup.longitude);
    if (shop) return toLatLng(shop.latitude, shop.longitude);
    return defaultCenter;
  }, [shop, pickup, rider, customer]);

  const hasAnyLocation = shop || pickup || rider || customer;

  if (!hasAnyLocation) {
    return (
      <div className="w-full h-[420px] flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-slate-500 text-sm">
          Location not available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full z-50 h-[420px] rounded-xl overflow-hidden border border-slate-200">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* English-labeled tiles, no API key required */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />

        {shop && (
          <Marker
            position={toLatLng(shop.latitude, shop.longitude)}
            icon={shopIcon}
          >
            <Popup>
              <strong>Shop</strong>
              {shop.address && <p className="text-sm mt-1">{shop.address}</p>}
            </Popup>
          </Marker>
        )}

        {pickup && (
          <Marker
            position={toLatLng(pickup.latitude, pickup.longitude)}
            icon={pickupIcon}
          >
            <Popup>
              <strong>Rider Pickup Location</strong>
              <p className="text-sm mt-1">Order pickup point</p>
            </Popup>
          </Marker>
        )}

        {rider && (
          <Marker position={toLatLng(rider.lat, rider.lng)} icon={riderIcon}>
            <Popup>
              <div className="text-center">
                <strong>Delivery Rider</strong>
                <p className="text-sm mt-1">Current rider location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {customer && (
          <Marker
            position={toLatLng(customer.latitude, customer.longitude)}
            icon={customerIcon}
          >
            <Popup>
              <strong>Customer Location</strong>
              {customer.address && (
                <p className="text-sm mt-1">{customer.address}</p>
              )}
            </Popup>
          </Marker>
        )}

        {shop && pickup && (
          <Polyline
            positions={[
              toLatLng(shop.latitude, shop.longitude),
              toLatLng(pickup.latitude, pickup.longitude),
            ]}
          />
        )}

        {pickup && rider && (
          <Polyline
            positions={[
              toLatLng(pickup.latitude, pickup.longitude),
              toLatLng(rider.lat, rider.lng),
            ]}
          />
        )}

        {rider && customer && (
          <Polyline
            positions={[
              toLatLng(rider.lat, rider.lng),
              toLatLng(customer.latitude, customer.longitude),
            ]}
          />
        )}

        {!rider && shop && customer && (
          <Polyline
            positions={[
              toLatLng(shop.latitude, shop.longitude),
              toLatLng(customer.latitude, customer.longitude),
            ]}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default OrderTrackingMap;