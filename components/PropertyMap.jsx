"use client";
import { useEffect, useRef, useState } from "react";
import opencage from "opencage-api-client";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import Spinner from "@/components/Spinner";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    async function fetchCoordinates() {
      opencage
        .geocode({
          q: `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`,
          key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
        })
        .then((data) => {
          if (data.status.code === 200 && data.results.length > 0) {
            const place = data.results[0];
            setLat(place.geometry.lat);
            setLng(place.geometry.lng);
          } else {
            setGeoCodeError(true);
          }
        })
        .catch((error) => {
          console.error("PropertyMap", error.message);
          setGeoCodeError(true);

          // other possible response codes:
          // https://opencagedata.com/api#codes
          if (error.status?.code === 402) {
            console.log("hit free trial daily limit");
            console.log("become a customer: https://opencagedata.com/pricing");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchCoordinates();
  }, []);

  useEffect(() => {
    // stops map from intializing more than once
    if (map.current) return;

    if (!loading && lat !== null && lng !== null) {
      maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [lng, lat],
        zoom: 15,
      });

      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([lng, lat])
        .addTo(map.current);
    }
  }, [lng, lat, loading]);

  if (loading) return <Spinner loading={loading} />;

  if (geoCodeError)
    return <div className="text-xl">No location data found</div>;

  return (
    <div
      ref={mapContainer}
      style={{ height: "500px", width: "100%" }}
      className="map"
    ></div>
  );
};

export default PropertyMap;
