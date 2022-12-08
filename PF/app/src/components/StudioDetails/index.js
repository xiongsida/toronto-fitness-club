import ImageCarousel from "./ImageCarousel";
import './style.css';
import React, {useEffect, useState} from "react";
import { useParams, useLocation } from "react-router-dom";
import DetailCard from "./DetailCard";

const StudioDetails = () => {
    let params=useParams();
    // console.log(params);
    let studio_id = params.studio_id;

    let state =useLocation().state;

    const [details, setDetails] = useState({"images":[],"amenities":[]});

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/studios/`+studio_id)
            .then(res => res.json())
            .then(data => {
                setDetails(data);
            })
    }, []);

    return(
        <>
            <div>
            <ImageCarousel className='my-images' imagelist={details.images} details={details} directionAppend={state.directionAppend}/>
            {/* <DetailCard details={details} directionAppend={state.directionAppend}/> */}
            </div>  
        </>
    )
}

export default StudioDetails;