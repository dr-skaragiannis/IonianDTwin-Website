import { Fragment, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import {
  CircleMarker,
  MapContainer,
  Popup,
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
  island?: string;
  detail?: string;
}

export function dotColor(i: number) {
  if (i >= 0.75) return "#E05A47";
  if (i >= 0.5) return "#C9A24B";
  return "#7FB5AD";
}

/**
 * Handles map container resize and prevents grey tile glitches
 */
function MapResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [map]);
  return null;
}

/**
 * Re-centers map when target coordinates change
 */
function MapViewController({ targetCenter, targetZoom }: { targetCenter?: [number, number]; targetZoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (targetCenter) {
      map.flyTo(targetCenter, targetZoom ?? 8, { duration: 1.2 });
    }
  }, [targetCenter, targetZoom, map]);
  return null;
}

/**
 * Keeps vertical page scrolling working on touch devices.
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
  selectedPoint,
  onSelectPoint,
  targetCenter,
  targetZoom,
}: {
  points: MapPoint[];
  islandLabels: { name: string; at: [number, number] }[];
  selectedPoint?: string | null;
  onSelectPoint?: (p: MapPoint) => void;
  targetCenter?: [number, number];
  targetZoom?: number;
}) {
  return (
    <MapContainer
      center={[38.15, 20.85]}
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
      <MapResizeHandler />
      <MapViewController targetCenter={targetCenter} targetZoom={targetZoom} />

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
      {points.map((p) => {
        const isSelected = selectedPoint === p.name;
        return (
          <Fragment key={`${p.name}-${p.at.join(",")}`}>
            {(p.i >= 0.75 || isSelected) && (
              <CircleMarker
                center={p.at}
                radius={isSelected ? 14 : 11}
                pathOptions={{
                  stroke: true,
                  color: isSelected ? "#ffffff" : dotColor(p.i),
                  weight: isSelected ? 2.5 : 1.5,
                  fill: false,
                  opacity: 0.9,
                  className: "leaflet-ping",
                }}
              />
            )}
            <CircleMarker
              center={p.at}
              radius={isSelected ? 8 : 3.5 + p.i * 4.5}
              eventHandlers={{
                click: () => onSelectPoint?.(p),
              }}
              pathOptions={{
                color: isSelected ? "#ffffff" : "#082125",
                weight: isSelected ? 2 : 1,
                fillColor: dotColor(p.i),
                fillOpacity: 0.95,
              }}
            >
              <Tooltip direction="top" offset={[0, -4]} className="dot-tip">
                <span className="font-semibold">{p.name}</span> · {Math.round(p.i * 100)}% load
                {p.island ? ` (${p.island})` : ""}
              </Tooltip>
              <Popup className="station-popup">
                <div className="p-1 text-ink">
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-xs text-smoke mt-0.5">
                    {p.island ? `${p.island} · ` : ""}Load: {Math.round(p.i * 100)}%
                  </p>
                  {p.detail && <p className="text-xs mt-1 text-claydeep">{p.detail}</p>}
                </div>
              </Popup>
            </CircleMarker>
          </Fragment>
        );
      })}
    </MapContainer>
  );
}
