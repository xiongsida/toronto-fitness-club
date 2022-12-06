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
import Pagination from '@mui/material/Pagination';

import Geocode from "react-geocode";
import { Footer } from "rsuite";

Geocode.setApiKey("AIzaSyAB10OdZPwqcOR-htn_zgehKdYG9eCxyWE");

const StudiosList = () => {
    const [studios, setStudios] = useState([]);
    const [amenityOptions, setAmenityOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    // const [initialLocation, setInitialLocation] = useState({lat:'',lng:''});
    const [totalPage, setTotalPage]=useState(1);

    const [studioMeta, setStudioMeta] =useState({
        page: 1,
        searchInput:'',
        userlocation:{lat:'',lng:''},
        selectedAmenities:[],
        selectedClasses:[],
    })

    const {page,searchInput,userlocation,selectedAmenities,selectedClasses} = studioMeta;

    // const [page, setPage] =useState(1)
    // const [searchInput, setSearchInput] = useState('');
    // const [userlocation, setUserLocation] = useState({lat:'',lng:''});
    // const [selectedAmenities, setSelectedAmenities] =useState([]);
    // const [selectedClasses, setSelectedClasses] = useState([]);

    const [selectedStudio, setSelectedStudio] = useState();
    const [userMarker, setUserMarker] =useState();
    const [inputlocation, setInputLocation] =useState('');
    const [directionAppend, setDirectionAppend] =useState('');

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

    useEffect(()=>{
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords.latitude,position.coords.longitude)
                localStorage.setItem("initialLocation", JSON.stringify({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }))
            });
        }
    },[])

    const basicURL = `http://127.0.0.1:8000/api/studios?user_lat=${userlocation.lat?userlocation.lat:''}&user_lng=${userlocation.lng?userlocation.lng:''}&search=${searchInput}&page=${page?page:1}`;
    
    useEffect(() => {
        let newURL=basicURL;
        newURL+=('&amenities__type='+selectedAmenities.join(','))
        newURL+=('&classes__name='+selectedClasses.join(','))
        console.log(newURL)

        fetch(newURL)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setStudios(data.results?data.results:[]);
                setTotalPage(data.page.totalPages);
            })
    }, [studioMeta]);

    useEffect(() =>{
        console.log('location changed, need update direction origin...')
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

    const useInputLocation =()=>{
        if (inputlocation){
            Geocode.fromAddress(inputlocation).then(
                (response) => {
                    let { lat, lng } = response.results[0].geometry.location;
                    console.log(lat, lng);
                    setUserMarker({
                        lat: lat, lng: lng
                    });
                    // setUserLocation({
                    //     lat: lat, lng: lng
                    // });
                    setStudioMeta({
                        ...studioMeta,
                        userlocation:{
                            lat: lat,
                            lng: lng
                        },
                        page:1,
                    })
                },
                (error) => {
                  console.error(error);
                }
            );
        }
    }

    const useCurrntLocation = (event)=>{
        event.preventDefault();
        console.log('use current location of user...');
        if (localStorage.initialLocation){
            let initialLocation=JSON.parse(localStorage.getItem('initialLocation'))
            console.log(initialLocation.lat);
            setUserMarker({
                lat: initialLocation.lat,
                lng: initialLocation.lng
            });
            setInputLocation('');
            setStudioMeta({
                ...studioMeta,
                userlocation:{
                    lat: initialLocation.lat,
                    lng: initialLocation.lng
                },
                page:1,
            });
        }else if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
                setUserMarker({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setInputLocation('');
                setStudioMeta({
                    ...studioMeta,
                    userlocation:{
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    },
                    page:1,
                })
            });
        }
    }

    const handleClear=()=>{
        // setSelectedAmenities([]);
        // setSelectedClasses([]);
        setStudioMeta({
            ...studioMeta,
            selectedAmenities: [],
            selectedClasses:[],
            page:1,
        })
    }

    return(
        <>
        <SearchBar 
        value={searchInput}
        // changeInput={(e) => setSearchInput(e.target.value)}
        changeInput={(e) => setStudioMeta({
            ...studioMeta,
            searchInput:e.target.value,
            page:1
        })}
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
                    // setSelectedAmenities={setSelectedAmenities}
                    setSelectedAmenities={(value)=>{
                        setStudioMeta({
                            ...studioMeta,
                            selectedAmenities:value,
                            page:1,
                        })
                    }}

                    classOptions={classOptions}
                    selectedClasses={selectedClasses}
                    // setSelectedClasses={setSelectedClasses}
                    setSelectedClasses={(value)=>{
                        setStudioMeta({
                            ...studioMeta,
                            selectedClasses:value,
                            page:1
                        })
                    }}

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
                    // setUserLocation={setUserLocation} 
                    setUserLocation={(value)=>{
                        setStudioMeta({
                            ...studioMeta,
                            userlocation:value,
                            page:1,
                        })
                    }}
                    selectedStudio={selectedStudio} 
                    setSelectedStudio={setSelectedStudio}
                    userMarker={userMarker}
                    setUserMarker={setUserMarker}
                    setInputLocation={setInputLocation}
                    />  
                </Col>
            </Row>
            <Footer>
                <Pagination 
                page={page} 
                onChange={(event,value)=>{
                    setStudioMeta({
                        ...studioMeta,
                        page:value,
                    });
                }}
                count={totalPage} 
                color="secondary" />
            </Footer>
        </Container>
        </>
    )
}

export default StudiosList;