import { useState, useEffect } from "react";

type Location = {
  latitude: number | null;
  longitude: number | null;
};

function CustomerLocation() {
  const [position, setPosition] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [town, setTown] = useState<string>("");

  const fetchCity = async (latitude: any, longitude: any) => {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    let data = await response.json();
    setTown(data.address.town);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        if (position.coords.latitude !== null) {
          await fetchCity(position.coords.latitude, position.coords.longitude);
        }
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <div className="w-full max-w-xs mx-auto my-20">
      <h2>My Current Location</h2>
      {position.latitude && position.longitude ? (
        <p>City: {town}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CustomerLocation;
