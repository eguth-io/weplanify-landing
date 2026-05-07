"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type HostCity = {
  city: string;
  country: "USA" | "Canada" | "Mexico";
  lat: number;
  lng: number;
};

const HOST_CITIES: HostCity[] = [
  { city: "Atlanta", country: "USA", lat: 33.749, lng: -84.388 },
  { city: "Boston", country: "USA", lat: 42.3601, lng: -71.0589 },
  { city: "Dallas", country: "USA", lat: 32.7767, lng: -96.797 },
  { city: "Houston", country: "USA", lat: 29.7604, lng: -95.3698 },
  { city: "Kansas City", country: "USA", lat: 39.0997, lng: -94.5786 },
  { city: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437 },
  { city: "Miami", country: "USA", lat: 25.7617, lng: -80.1918 },
  { city: "New York / NJ", country: "USA", lat: 40.8135, lng: -74.0746 },
  { city: "Philadelphia", country: "USA", lat: 39.9526, lng: -75.1652 },
  { city: "San Francisco Bay", country: "USA", lat: 37.4032, lng: -121.9698 },
  { city: "Seattle", country: "USA", lat: 47.6062, lng: -122.3321 },
  { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { city: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207 },
  { city: "Guadalajara", country: "Mexico", lat: 20.6597, lng: -103.3496 },
  { city: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },
  { city: "Monterrey", country: "Mexico", lat: 25.6866, lng: -100.3161 },
];

const COUNTRY_COLOR: Record<HostCity["country"], string> = {
  USA: "#F6391A",
  Canada: "#61DBD5",
  Mexico: "#EEF899",
};

export default function WorldCupHostCitiesMap({ locale }: { locale: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const isFr = locale === "fr";

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !containerRef.current || mapRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      projection: "globe",
      center: [-95, 37],
      zoom: 2.4,
      attributionControl: true,
      cooperativeGestures: true,
    });

    map.on("style.load", () => {
      map.setFog({
        color: "rgb(255, 251, 245)",
        "high-color": "rgb(120, 145, 165)",
        "horizon-blend": 0.04,
      });
    });

    map.on("load", () => {
      HOST_CITIES.forEach((c) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 14px; height: 14px; border-radius: 50%;
          background: ${COUNTRY_COLOR[c.country]};
          border: 2px solid #FFFBF5;
          box-shadow: 0 2px 8px rgba(0,30,19,0.25);
          cursor: pointer;
        `;
        const popup = new mapboxgl.Popup({ offset: 16, closeButton: false }).setHTML(
          `<div style="font-family: var(--font-karla, sans-serif); padding: 4px 6px;">
             <strong style="color:#001E13; font-size:14px;">${c.city}</strong>
             <div style="color:#001E13; opacity:0.6; font-size:12px;">${c.country}</div>
           </div>`
        );
        new mapboxgl.Marker(el)
          .setLngLat([c.lng, c.lat])
          .setPopup(popup)
          .addTo(map);
      });
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [shouldLoad]);

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="w-full h-[420px] lg:h-[520px] rounded-[24px] overflow-hidden border border-[#001E13]/10 bg-[#FFFBF5]"
        aria-label={isFr ? "Carte des 16 villes hôtes de la Coupe du Monde 2026" : "Map of the 16 World Cup 2026 host cities"}
      />
      <div className="mt-4 flex flex-wrap gap-4 text-xs lg:text-sm font-karla text-[#001E13]/70">
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#F6391A]" />USA (11)</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#61DBD5]" />Canada (2)</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#EEF899] border border-[#001E13]/20" />Mexico (3)</span>
      </div>
    </div>
  );
}
