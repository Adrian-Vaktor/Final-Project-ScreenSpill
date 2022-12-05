
import styled from 'styled-components'

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'
import { useRef, useState, useEffect } from 'react';

import {v4 as uuidv4} from 'uuid';


import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { SketchPicker } from 'react-color';
import ModalBackdrop from '../../Misc/ModalBackdrop';

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
            this.markerId = uuidv4()
        }
    }

const Map = ({projectWork, setProjectWork}) => {


    useEffect(() => {
        
    },[])

    const mapContainer = useRef(null);
    const map = useRef(null);

    const [ lat, setLat ] = useState(45.4840);
    const [ lng, setLng ] = useState(-73.7155);
    const [ zoom, setZoom ] = useState(9.45);

    const [ markerStyle, setMarkerStyle ] = useState(`${Math.floor((zoom*2))}px`)

    const [ hideMarkers, setHideMarkers ] = useState(false)
    const [ markersState, setMarkersState ] = useState(projectWork.mapLocations)

    const [ markerInfoModalFlag, setMarkerInfoModalFlag ] = useState(false)
    const [ addMarkerFlag, setAddMarkerFlag ] = useState(false)
    const [ addMarkerPosition, setAddMarkerPosition ] = useState(undefined)
    const [ mapOffset, setMapOffset ] = useState(undefined)
    const [ colorPickerFlag, setColorPickerFlag ] = useState(false)

    const [ inputMarkerState, setInputMarkerState ] = useState({
        name: 'New Marker',
        color: 'red'
    })

    const [ colorPicker, setColorPicker ] = useState('#38e88d')





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

        const markerArr = document.getElementsByClassName('marker')
        if(markerArr.length !== 0){
            [...markerArr].forEach((marker) => {
                marker.style.width = markerStyle
                marker.style.height = markerStyle
            })
        }
        setMarkerStyle(`${Math.floor((zoom*2))}px`)
        console.log(markerStyle);

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

        console.log(feature);
        
    }

    const removeAllMarkersFromMap = (specific) => {
        let markersToChange = []
        map.current._markers.forEach(marker => {
            console.log(marker);
            
            if([...marker._element.classList].includes('marker')){
                // marker.remove();

                markersToChange.push(marker)
            }

        });

        markersToChange.forEach((marker) => {
            marker.remove()
            // marker._element.classList.remove('red')
        })
    }
    const handleDeleteMarkers = (e, targetMarker) => {
        e.preventDefault()
        
        let tempmarkersState = markersState.filter((marker) => {
            return marker.markerId !== targetMarker.markerId
        })
        removeAllMarkersFromMap()
        setMarkersState(tempmarkersState)
        
    }

    useEffect(()=> {
        if(hideMarkers){

        }else{
            
            if(map.current){
                for (const feature of markersState) {
                    // create a HTML element for each feature
                    const el = document.createElement('div');
                    el.style.width = markerStyle
                    el.style.height = markerStyle
                    el.id = feature.markerId
                    el.className = `marker`;
                    el.style.backgroundColor = feature.color
                    
                    el.addEventListener('click', (e) => {handleClickMarker(e, feature)})
                    el.addEventListener('click', (e) => {handleDeleteMarkers(e, feature)})

    
                    // make a marker for each feature and add to the map
                    new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map.current);
                  }
            }
        }
    },[hideMarkers, markersState])

  


    const handleHideMarkers = () => {
        setHideMarkers(state => !state)
        removeAllMarkersFromMap()
    }

    const handleAddNewMarker = (lat, lng, name) => {
        
        let tempMarkersState = [...markersState]
        let newFeature = new Feature(lng, lat, name)
        newFeature.color = colorPicker
        tempMarkersState.push(newFeature)
        setMarkersState(tempMarkersState)
        setColorPickerFlag(false)

        setAddMarkerFlag(false)
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
        setColorPickerFlag(state => !state)
    }


    useEffect(()=> {
        
        setProjectWork(state => {
            return {...state, mapLocations: markersState}
        })
        
    },[markersState])


    const handleChangeComplete = (color) => {
        setColorPicker(color.hex)
    }

    return (
        <Div>
            {
                addMarkerFlag
                ?
                    <>
                        <AddMarkerModal 
                        style={{ 'zIndex': '100', position: "absolute", top: `${addMarkerPosition.point.y + mapOffset[1]}px`, left:  `${addMarkerPosition.point.x + mapOffset[0]}px`}} 
                        >
                            <p>
                                Add Marker
                            </p>
                            
                            <input placeholder={'New Marker'} value={inputMarkerState.name} onChange={(e) => {handleInputMarkerNameChange(e, 'name')}}></input>

                            <button onClick={handleColorButtonCLick}>Choose Color</button>
                            {
                                colorPickerFlag
                                ?
                                <SketchPicker
                                color={ colorPicker }
                                onChangeComplete={ handleChangeComplete } /> 
                                :
                                <></>

                            }
                            <button onClick={() => {handleAddNewMarker(addMarkerPosition.lngLat.lat, addMarkerPosition.lngLat.lng, inputMarkerState.name)}}>
                                add Marker
                            </button>
                        </AddMarkerModal>

                        <MarkerModal_Wrapper>
                            <ModalBackdrop isInvisible={true} setIsOpen={setAddMarkerFlag}/>
                        </MarkerModal_Wrapper>
                    </>

                :
                <></>
            }
            {/* <HideMarkerButton onClick={handleHideMarkers} >Hide Markers</HideMarkerButton> */}
            <MapContainer ref={mapContainer} className="map-container" />
            <Bottom>

                {
                    markersState.length === 0
                    ?
                    <FloatCenter>
                        <h2>No Markers</h2>
                    </FloatCenter>
                    :
                    <></>
                }
                {
                    markersState.map((marker)=> {
                        return(
                            <MarkerInfo 
                            key={Math.floor(Math.random()*10000000000)} 
                            id={marker.markerId}
                            onContextMenu={(e) => {handleDeleteMarkers(e, marker)}}
                            >{marker.properties.description}
                            {console.log(marker)}
                            <div style={{"backgroundColor" : marker.color}}></div>
                            </MarkerInfo>
                        )
                    })
                }
                <ColoBG />
            </Bottom>
            {/* <Wrapper apiKey={"YOUR_API_KEY"} render={render}>
                <div ref={ref} />
            </Wrapper> */}
        </Div>
    )   
}

const FloatCenter = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h2{
    font-size: 4vw;
    opacity: 10%;
  }
  `


const MarkerModal_Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
`

const MarkerInfo = styled.div`

    background-color: white;
    padding: 10px;
    display: flex;
    height: 40px;
    padding: 0 40px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    div{
        border-radius: 50%;
        height: 10px;
        width: 10px;

    }
`
const ColoBG = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: black;
    opacity: 7%;
`

const Bottom = styled.div`
    height: 40%;
    // width: 100%;
    // height: 70vh;
    margin: 20px 5vw;
    border-radius: 5px;
    overflow-y: scroll;
    box-shadow: rgba(1, 0, 0, 0.44) 0px 3px 8px;
    border: solid teal 1px;

`

const HideMarkerButton = styled.button`
    position: absolute;
`

const AddMarkerModal = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 5px;
    padding: 10px;
    z-index: 20;


    p{
        padding: 3px 0;
        margin: 3px 0;
    }


`

const Div = styled.div`
    flex-grow:1;
    display: flex;
    flex-direction: column;
`

const MapContainer = styled.div`
    height: 60%;
    margin: 20px 5vw;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    .marker{
        background-size: cover;
        // background-color: red;
        // width: 50px;
        // height: 50px;
        border-radius: 50%;
        cursor: pointer;
        // animation: 1s ease-out 0s 1 slideInFromLeft;
    }

    // @keyframes slideInFromLeft {
    //     0% {
    //       opacity: 0%;
    //     }
    //     100% {
    //       opacity: 100%;
    //     }
    //   }
    //   border-radius: 2px;

`

const Marker = styled.div`
    // background-image: url('mapbox-icon.png');

  `

export default Map;