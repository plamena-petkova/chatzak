import { useEffect, useState } from "react";

function useCurrentAddress() {
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if geolocation is supported by the browser
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        // Get the user's current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // Use reverse geocoding API to convert coordinates to an address
                const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
                fetch(url)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data && data.address) {
                            setAddress(data.address);
                        } else {
                            setError('Unable to retrieve address');
                        }
                    })
                    .catch((err) => setError('Error fetching address: ' + err.message));
            },
            (err) => {
                setError('Error getting location: ' + err.message);
            }
        );
    }, []);

    return { address, error };
}

export default useCurrentAddress;
