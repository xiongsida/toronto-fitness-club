import React, {useEffect, useState}from "react";
import "rsuite/dist/rsuite.css";
import { Drawer } from 'rsuite';
import { Actions } from "../../misc/Actions";
import { PrimaryButton, SecodaryButton } from "../../misc/Buttons";
import StudioFilterPanel from "./StudioFilterPanel";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAB10OdZPwqcOR-htn_zgehKdYG9eCxyWE");

const StudioFilterDrawer = (
    {amenityOptions, selectedAmenities, 
    classOptions, selectedClasses,
    inputlocation, setInputLocation,
    setUserMarker,
    studioMeta, setStudioMeta, 
    studioDrawerOpen, setStudioDrawerOpen,
    init_input_location})=>{
    
    useEffect(()=>{
        console.log(init_input_location);
        if (init_input_location){
            Geocode.fromAddress(init_input_location).then(
                (response) => {
                    let { lat, lng } = response.results[0].geometry.location;
                    console.log(lat, lng);
                    setUserMarker({
                        lat: lat, lng: lng
                    });
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
    },[])

    const handleClear=()=>{
        setStudioMeta({
            ...studioMeta,
            selectedAmenities: [],
            selectedClasses:[],
            page:1,
        });
        setInputLocation('');
    }
    const useInputLocation =()=>{
        if (inputlocation){
            Geocode.fromAddress(inputlocation).then(
                (response) => {
                    let { lat, lng } = response.results[0].geometry.location;
                    console.log(lat, lng);
                    setUserMarker({
                        lat: lat, lng: lng
                    });
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

    const useCurrentLocation = (event)=>{
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

    return (
        <>
        <Drawer style={{
            opacity: 0.93
            }} 
            size={'sm'} placement={'right'} 
            open={studioDrawerOpen} 
            onClose={() => setStudioDrawerOpen(false)}>
        <Drawer.Header>
          <Drawer.Title><b>Studio Filters</b></Drawer.Title>
          <Drawer.Actions>
            <PrimaryButton onClick={() => setStudioDrawerOpen(false)}>Hide</PrimaryButton>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
            <Actions>
                <input
                    type="text"
                    id="inputlocation"
                    name="inputlocation"
                    onChange={(e)=>{
                        setInputLocation(e.target.value);
                    }}
                    value={inputlocation}
                    placeholder="Enter Your Adress"
                />
                <button onClick={useInputLocation}>Find</button>
            </Actions>
            <PrimaryButton className='m-3' onClick={useCurrentLocation}>Find Around My Area</PrimaryButton>

            <StudioFilterPanel
            amenityOptions={amenityOptions} 
            selectedAmenities={selectedAmenities} 
            setSelectedAmenities={(value)=>{
                setStudioMeta({
                    ...studioMeta,
                    selectedAmenities:value,
                    page:1,
                })
            }}

            classOptions={classOptions}
            selectedClasses={selectedClasses}
            setSelectedClasses={(value)=>{
                setStudioMeta({
                    ...studioMeta,
                    selectedClasses:value,
                    page:1
                })
            }}

            />
            <PrimaryButton className=" m-3"variant="danger" onClick={handleClear}>
                Clear Filter
            </PrimaryButton>
        </Drawer.Body>
        </Drawer>
        </>
    );

}

export default StudioFilterDrawer;