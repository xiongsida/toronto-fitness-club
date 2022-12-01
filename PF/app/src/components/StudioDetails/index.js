import ImageCarousel from "./ImageCarousel";
import './style.css';
import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import DetailCard from "./DetailCard";

const StudioDetails = () => {

    const [details, setDetails] = useState({"images":[],"amenities":[]});

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/studios/1`)
            .then(res => res.json())
            .then(data => {
                setDetails(data);
                // console.log(data);
                // console.log(details);
            })
    }, []);

    return(
        <>
            <div>
            <ImageCarousel imagelist={details.images} />
            <div class="fix-card">
                <DetailCard className="fix-card" details={details}/>
            </div>
            
            </div>
            
        </>
    )
}

export default StudioDetails;