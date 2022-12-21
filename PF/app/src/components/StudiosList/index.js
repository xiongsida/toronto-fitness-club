import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import SearchBar from "../Common/SearchBar";
import CardsList from "./CardsList";
import StudiosMap from "./StudiosMap";
import { SmallPrimaryButton} from "../misc/Buttons";

import Geocode from "react-geocode";
import StudioFilterDrawer from "./StudioFilterDrawer";
import { Box } from "@mui/material";
import { Pagination } from "rsuite";

const config = require("../../TFCConfig.json");

Geocode.setApiKey(config.GoogleAPIKey);

const StudiosList = () => {
    let init_input_location='';
    let pre_state=useLocation().state;
    init_input_location = pre_state&&pre_state.otherInputLocation?pre_state.otherInputLocation:'';

    const page_size=4
    const [studioDrawerOpen, setStudioDrawerOpen] =useState(false);
    const [studios, setStudios] = useState([]);
    const [amenityOptions, setAmenityOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);

    const [totalItems, setTotalItems]=useState(0);

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

    const basicURL = `http://127.0.0.1:8000/api/studios?user_lat=${userlocation.lat?userlocation.lat:''}&user_lng=${userlocation.lng?userlocation.lng:''}&search=${searchInput}&page=${page?page:1}&page_size=${page_size}`;
    
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
                setTotalItems(data.page.totalItems)
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
            <br/>
            <Row>
            <Col md={'8'}>
            <Box
            display="flex" 
            justifyContent="right"
            >
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
            </Box>
            </Col>
            <Col md={'4'}>
                <Box display="flex" justifyContent="left">
                    <SmallPrimaryButton onClick={() => handleOpenDrawer()}>Open Filters</SmallPrimaryButton>
                </Box>
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
                init_input_location={init_input_location}
            />
            <Row fluid='true' className='m-2' style={{height:'70vh'}}>
                <Col fluid='true' md="4">
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
            <Box
            display="flex" 
            justifyContent="center">
                <Pagination
                className='m-2'
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                limit={page_size}
                total={totalItems}
                maxButtons={5}
                size="lg"
                layout={['pager']}
                activePage={page}
                onChangePage={(value)=>{
                    setStudioMeta({
                        ...studioMeta,
                        page:value,
                    });
                }}
            />
            </Box>
            </Container>
        </>
    )
}

export default StudiosList;