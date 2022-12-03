
import styled from 'styled-components'

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'
import { useRef, useState, useEffect } from 'react';


import { Wrapper, Status } from "@googlemaps/react-wrapper";


// require('dotenv').config()
// const { REACT_APP_OPENWEATHER } = process.env

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFudmFrdG9yIiwiYSI6ImNsYjdmcGRsNTBhaG0zdHJ2NjBjcnJhdDQifQ.9ODXrzcKWNITY7575JdylA'

const weatherAPI = `http://api.openweathermap.org/geo/1.0/direct?q=Montreal&limit=5&appid=7d474b8c9522ec1f3b14bf95efffc72a`

const Map = () => {


    useEffect(() => {
        fetch(weatherAPI)
        .then(res => res.json())
        .then(data => console.log(data))
    },[])
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat, setLat] = useState(45.4840);
    const [lng, setLng] = useState(-73.7155);
    const [zoom, setZoom] = useState(9.45);

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

    const handlek = (e) => {

        if(e.key === 'p'){

            console.log(lat, lng, zoom);
        }
        
    }

    useEffect(()=> {
        document.addEventListener('keydown', handlek)

        return () => {
            document.removeEventListener('keydown', handlek)
        }
    },[lng])


    return (
        <Div>
            <MapContainer ref={mapContainer} className="map-container" />
            {/* <Wrapper apiKey={"YOUR_API_KEY"} render={render}>
                <div ref={ref} />
            </Wrapper> */}
        </Div>
    )   
}
const Div = styled.div`
    flex-grow:1
`

const MapContainer = styled.div`
    height: 100vh;

`

export default Map;