
import styled from 'styled-components'

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'
import { useRef, useState, useEffect } from 'react';

import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { SketchPicker } from 'react-color';

// require('dotenv').config()
// const { REACT_APP_OPENWEATHER } = process.env

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFudmFrdG9yIiwiYSI6ImNsYjdmcGRsNTBhaG0zdHJ2NjBjcnJhdDQifQ.9ODXrzcKWNITY7575JdylA'

const weatherAPI = `http://api.openweathermap.org/geo/1.0/direct?q=Montreal&limit=5&appid=7d474b8c9522ec1f3b14bf95efffc72a`

const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }
    ]
  };

class Feature {
    constructor(x,y, place) {
            this.type = 'Feature';
            this.geometry = {
                type: 'Point',
                coordinates: [x, y]
            };
            this.properties = {
                title: 'Mapbox',
                description: place
            }
        }
    }

const Map = ({projectWork, setProjectWork}) => {


    useEffect(() => {
        
    },[])

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat, setLat] = useState(45.4840);
    const [lng, setLng] = useState(-73.7155);
    // const [zoom, setZoom] = useState(9.45);
    const [zoom, setZoom] = useState(2);

    const [hideMarkers, setHideMarkers] = useState(false)
    const [ markersState, setMarkersState ] = useState(projectWork.mapLocations)

    const [ markerInfoModalFlag, setMarkerInfoModalFlag ] = useState(false)
    const [ addMarkerFlag, setAddMarkerFlag ] = useState(false)
    const [ addMarkerPosition, setAddMarkerPosition ] = useState(undefined)
    const [ mapOffset, setMapOffset ] = useState(undefined)
    const [ colorPickerFlag, setColorPickerFlag ] = useState(false)

    const [ inputMarkerState, setInputMarkerState ] = useState({
        name: '',
        color: 'red'
    })




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
        if(!mapOffset){
            setMapOffset([ map.current._container.offsetLeft, map.current._container.offsetTop ])
        }
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
            if(addMarkerFlag){
                setAddMarkerFlag(false)
                setAddMarkerPosition(undefined)
                setInputMarkerState({
                    name: '',
                    color: 'red'
                })
                setColorPickerFlag(false)

            }
        });
    });

    const handleMapClick = (e) => {

        // const positionString = JSON.stringify(e.point) + ' ' + JSON.stringify(e.lngLat.wrap());
        setAddMarkerFlag(true)
        setAddMarkerPosition(e)
        
    }

    useEffect(() => {
        map.current.on('contextmenu', handleMapClick)
            return () => {
                map.current.off('contextmenu', handleMapClick)
            }

    },[lat,lng, zoom])


    // useEffect(()=> {
    //     if(addMarkerFlag){

    //     }

    // },[addMarkerFlag])

    const handleClickMarker = (e, feature) => {

        console.log(feature.geometry.coordinates);
        
    }

    useEffect(()=> {
        if(hideMarkers){

        }else{

            if(map.current){
                for (const feature of markersState) {
                    // create a HTML element for each feature
                    const el = document.createElement('div');
                    el.style.width = `${50}px`
                    el.style.height = `${50}px`
                    el.className = 'marker red';
                    
                    el.addEventListener('click', (e) => {handleClickMarker(e, feature)})
    
                    // make a marker for each feature and add to the map
                    new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map.current);
                  }
            }
        }
    },[hideMarkers, markersState])

    const handleHideMarkers = () => {
        setHideMarkers(state => !state)

        let markersToChange = []
        map.current._markers.forEach(marker => {
            if([...marker._element.classList].includes('red')){
                // marker.remove();

                markersToChange.push(marker)
            }

        });

        markersToChange.forEach((marker) => {
            marker.remove()
            // marker._element.classList.remove('red')
        })
        
    }

    const handleAddNewMarker = (lat, lng, name) => {
        
        let tempMarkersState = [...markersState]
        let newFeature = new Feature(lng, lat, name)
        tempMarkersState.push(newFeature)
        setMarkersState(tempMarkersState)
    }

    const handleInputMarkerNameChange = (e, type) => {

        switch(type){

            case 'name':
                
                let tempState = {...inputMarkerState}
                tempState.name = e.target.value
                
                setInputMarkerState(tempState)
                break
            case 'color':

                break
        }
    }


    const handleColorButtonCLick = () => {
        setColorPickerFlag(true)
    }


    useEffect(()=> {
        
        setProjectWork(state => {
            return {...state, mapLocations: markersState}
        })
        
    },[markersState])

    return (
        <Div>
            {
                addMarkerFlag
                ?
                <AddMarkerModal 
                style={{ 'zIndex': '100', position: "absolute", top: `${addMarkerPosition.point.y + mapOffset[1]}px`, left:  `${addMarkerPosition.point.x + mapOffset[0]}px`}} 
                >
                    Add Marker
                    
                    <input placeholder={'New Marker'} value={inputMarkerState.name} onChange={(e) => {handleInputMarkerNameChange(e, 'name')}}></input>
                    <button onClick={handleColorButtonCLick}>Choose Color</button>
                    {
                        colorPickerFlag
                        ?
                        <SketchPicker /> 
                        :
                        <></>

                    }
                    <button onClick={() => {handleAddNewMarker(addMarkerPosition.lngLat.lat, addMarkerPosition.lngLat.lng, inputMarkerState.name)}}>
                        add Marker
                    </button>
                </AddMarkerModal>
                :
                <></>
            }
            <button onClick={handleHideMarkers} >Hide Markers</button>
            <MapContainer ref={mapContainer} className="map-container" />
            {/* <Wrapper apiKey={"YOUR_API_KEY"} render={render}>
                <div ref={ref} />
            </Wrapper> */}
        </Div>
    )   
}


const AddMarkerModal = styled.div`
    background-color: red;
    display: flex;
    flex-direction: column;

`

const Div = styled.div`
    flex-grow:1
`

const MapContainer = styled.div`
    height: 100vh;
    .marker{
        background-size: cover;
        background-color: red;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        animation: 1s ease-out 0s 1 slideInFromLeft;

        
    }
    @keyframes slideInFromLeft {
        0% {
          opacity: 0%;
        }
        100% {
          opacity: 100%;
        }
      }
`

const Marker = styled.div`
    // background-image: url('mapbox-icon.png');

  `

export default Map;