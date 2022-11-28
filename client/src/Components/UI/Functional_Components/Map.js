
import styled from 'styled-components'

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN

import { useRef, useState, UseEffect } from 'react';


const Map = () => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        // initialize map only once
        if (map.current) {
            return
        } 
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
        });
    });

    useEffect(() => {
         // wait for map to initialize
        if (!map.current) {
            return
        };
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });
    });


    return (
        <>
            Map
            <MapContainer ref={mapContainer} className="map-container" />
        </>
    )   
}

const MapContainer = styled.div`
    height: 400px;

`

export default Map;