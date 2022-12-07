import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/esm/Row";
import SearchBar from "../Common/SearchBar";
import CardsList from "./CardsList";
import StudiosMap from "./StudiosMap";
import { SecodaryButton,PrimaryButton, SmallPrimaryButton } from "../misc/Buttons";
import Pagination from '@mui/material/Pagination';

import Geocode from "react-geocode";
import StudioFilterDrawer from "./StudioFilterDrawer";

Geocode.setApiKey("AIzaSyAB10OdZPwqcOR-htn_zgehKdYG9eCxyWE");

const StudiosList = () => {
    const [studioDrawerOpen, setStudioDrawerOpen] =useState(false);
    const [studios, setStudios] = useState([]);
    const [amenityOptions, setAmenityOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);

    const [totalPage, setTotalPage]=useState(1);

    const [studioMeta, setStudioMeta] =useState({
        page: 1,
        searchInput:'',
        userlocation:{lat:'',lng:''},
        selectedAmenities:[],
        selectedClasses:[],
    })

    const {page,searchInput,userlocation,selectedAmenities,selectedClasses} = studioMeta;

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

    const basicURL = `http://127.0.0.1:8000/api/studios?user_lat=${userlocation.lat?userlocation.lat:''}&user_lng=${userlocation.lng?userlocation.lng:''}&search=${searchInput}&page=${page?page:1}&page_size=4`;
    
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
        // console.log('location changed, need update direction origin...')
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


    const handleOpenDrawer = () => {
        setStudioDrawerOpen(true);
    };

    return(
        <>
        <Container fluid='true'>
            <Row>
            <Col>
                <SmallPrimaryButton onClick={() => handleOpenDrawer()}>Open Filters</SmallPrimaryButton>
            </Col>
            <Col>
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
            </Col>
            </Row>
            <StudioFilterDrawer
                amenityOptions={amenityOptions}
                selectedAmenities={selectedAmenities}
                classOptions={classOptions}
                selectedClasses={selectedClasses}
                inputlocation={inputlocation}
                setInputLocation={setInputLocation}
                setUserMarker={setUserMarker}
                studioMeta={studioMeta}
                setStudioMeta={setStudioMeta}
                studioDrawerOpen={studioDrawerOpen}
                setStudioDrawerOpen={setStudioDrawerOpen}
            />
           
            <Row fluid='true'>
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
        </Container>
        </>
    )
}

export default StudiosList;