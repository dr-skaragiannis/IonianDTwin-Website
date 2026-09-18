import { Fragment, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import {
  CircleMarker,
  MapContainer,
  ScaleControl,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export interface MapPoint {
  name: string;
  at: [number, number];
  i: number; // intensity 0–1
}

export function dotColor(i: number) {
  if (i >= 0.75) return "#E05A47";
  if (i >= 0.5) return "#C9A24B";
  return "#7FB5AD";
}

/**
 * Keeps vertical page scrolling working on touch devices.
 * A one-finger drag on the map would otherwise trap the page, so on small
 * screens dragging is disabled and the zoom controls take over.
 */
function TouchFriendly() {
  const map = useMap();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const apply = () => {
      setIsTouch(mq.matches);
      map.dragging.disable();
      map.doubleClickZoom.disable();
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [map]);

  useEffect(() => {
    if (!isTouch) return;
    // Re-enable with two fingers only is not available natively, so expose
    // dragging again on the largest touch viewports where it feels natural.
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => (mq.matches ? map.dragging.enable() : map.dragging.disable());
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [isTouch, map]);

  return null;
}

/**
 * Real interactive basemap of the Ionian Islands.
 * Dark CARTO/OSM raster tiles, monitoring points at true coordinates.
 */
export default function IonianMap({
  points,
  islandLabels,
}: {
  points: MapPoint[];
  islandLabels: { name: string; at: [number, number] }[];
}) {
  return (
    <MapContainer
      center={[38.15, 21.15]}
      zoom={7}
      minZoom={6}
      maxZoom={13}
      zoomControl={false}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: "#0b2a30" }}
      maxBounds={[
        [34.8, 17.2],
        [40.8, 24.8],
      ]}
      maxBoundsViscosity={0.9}
      zoomSnap={0.5}
      keyboard={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains={["a", "b", "c", "d"]}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/" target="_blank" rel="noreferrer">CARTO</a>'
      />
      <ZoomControl position="bottomright" />
      <ScaleControl imperial={false} position="bottomright" />
      <TouchFriendly />

      {/* Island name labels (positioned offshore) */}
      {islandLabels.map((island) => (
        <CircleMarker
          key={`lbl-${island.name}`}
          center={island.at}
          radius={0}
          pathOptions={{ opacity: 0, fillOpacity: 0 }}
        >
          <Tooltip permanent direction="center" offset={[0, 0]} className="island-label">
            {island.name.toUpperCase()}
          </Tooltip>
        </CircleMarker>
      ))}

      {/* Monitoring points at real coordinates */}
      {points.map((p) => (
        <Fragment key={`${p.name}-${p.at.join(",")}`}>
          {p.i >= 0.75 && (
            <CircleMarker
              center={p.at}
              radius={11}
              pathOptions={{
                stroke: true,
                color: dotColor(p.i),
                weight: 1.5,
                fill: false,
                opacity: 0.8,
                className: "leaflet-ping",
              }}
            />
          )}
          <CircleMarker
            center={p.at}
            radius={3.5 + p.i * 4.5}
            pathOptions={{
              color: "#082125",
              weight: 1,
              fillColor: dotColor(p.i),
              fillOpacity: 0.92,
            }}
          >
            <Tooltip direction="top" offset={[0, -4]} className="dot-tip">
              {p.name} · {Math.round(p.i * 100)}% of threshold
            </Tooltip>
          </CircleMarker>
        </Fragment>
      ))}
    </MapContainer>
  );
}
