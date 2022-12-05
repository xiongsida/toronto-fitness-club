import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/esm/Row";
import SearchBar from "../SearchBar";
import CardsList from "./CardsList";
import StudiosMap from "./StudiosMap";
import StudioFilterPanel from "../StudioFilterPanel";
// import Button from "react-bootstrap/esm/Button";
import Button from 'react-bootstrap/Button';

import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAB10OdZPwqcOR-htn_zgehKdYG9eCxyWE");

const StudiosList = () => {

    const [initialLocation, setInitialLocation] = useState({lat:'',lng:''});
    useEffect(()=>{
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords.latitude,position.coords.longitude)
                setInitialLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    },[])

    const [userlocation, setUserLocation] = useState({lat:'',lng:''});
    const [userMarker, setUserMarker] =useState();
    const [inputlocation, setInputLocation] =useState('');

    const useInputLocation =()=>{
        if (inputlocation){
            Geocode.fromAddress(inputlocation).then(
                (response) => {
                    let { lat, lng } = response.results[0].geometry.location;
                    console.log(lat, lng);
                    setUserMarker({
                        lat: lat, lng: lng
                    });
                    setUserLocation({
                        lat: lat, lng: lng
                    });
                },
                (error) => {
                  console.error(error);
                }
              );
        }
    }

    const useCurrntLocation = (event)=>{
        event.preventDefault();
        if (navigator.geolocation){
            setUserMarker({
                lat: initialLocation.lat,
                lng: initialLocation.lng
            });
            setUserLocation({
                lat: initialLocation.lat,
                lng: initialLocation.lng
            });
            setInputLocation('');
        }
    }

    const [amenityOptions, setAmenityOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    useEffect(() =>{
        fetch('http://127.0.0.1:8000/api/allamenities')
            .then(res => res.json())
            .then(data => {
                setAmenityOptions(data.map(amenity=>[amenity.type,amenity.type]));
            }) 
        fetch('http://127.0.0.1:8000/api/allclassparents')
        .then(res => res.json())
        .then(data => setClassOptions(
            Array.from(new Set(data.map(classparent=>classparent.name))).map(c=>[c,c])
            ))
    },[])

    const [selectedAmenities, setSelectedAmenities] =useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [studios, setStudios] = useState([]);

    const [directionAppend, setDirectionAppend] =useState('');

    const [selectedStudio, setSelectedStudio] = useState();


    const basicURL = `http://127.0.0.1:8000/api/studios?user_lat=${userlocation.lat?userlocation.lat:''}&user_lng=${userlocation.lng?userlocation.lng:''}&search=${searchInput}`;

    useEffect(() => {
        let newURL=basicURL;
        newURL+=('&amenities__type='+selectedAmenities.join(','))
        newURL+=('&classes__name='+selectedClasses.join(','))
        // console.log(newURL)

        fetch(newURL)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setStudios(data.results);
            })
    }, [userlocation,searchInput,selectedAmenities,selectedClasses]);

    useEffect(() =>{
        if (userlocation.lat && userlocation.lng){
            Geocode.fromLatLng(userlocation.lat, userlocation.lng).then(
                response => {
                setDirectionAppend("&origin="+response.results[0].formatted_address)
                },
                error => {
                console.error(error);
                }
            );
        }
        
    },[userlocation])

    const handleClear=()=>{
        setSelectedAmenities([]);
        setSelectedClasses([]);
    }

    return(
        <>
        <SearchBar 
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
        placeholdertext = 'Search by studio name, coach, class, amenity...'
        />

        <Container fluid='true'>
            <Row fluid='true'>
                <Col fluid='true'>
                    <div>
                        <input
                            type="text"
                            id="inputlocation"
                            name="inputlocation"
                            onChange={(e)=>{
                                setInputLocation(e.target.value);
                            }}
                            value={inputlocation}
                        />
                        <Button onClick={useInputLocation}>Use Input Location</Button>
                        <Button onClick={useCurrntLocation}>use my current location</Button>
                    </div>

                    <StudioFilterPanel
                    amenityOptions={amenityOptions} 
                    selectedAmenities={selectedAmenities} 
                    setSelectedAmenities={setSelectedAmenities}

                    classOptions={classOptions}
                    selectedClasses={selectedClasses}
                    setSelectedClasses={setSelectedClasses}
                    />
                    <Button className=" m-3"variant="danger" onClick={handleClear}>
                        Clear Filter
                    </Button>
                </Col>
                <Col fluid='true'>
                    <CardsList studios={studios} 
                    selectedStudio={selectedStudio} 
                    setSelectedStudio={setSelectedStudio}
                    directionAppend={directionAppend}/>  
                </Col> 
                <Col fluid='true'>
                    <StudiosMap studios={studios}
                    setUserLocation={setUserLocation} 
                    selectedStudio={selectedStudio} 
                    setSelectedStudio={setSelectedStudio}
                    userMarker={userMarker}
                    setUserMarker={setUserMarker}
                    setInputLocation={setInputLocation}
                    />  
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default StudiosList;