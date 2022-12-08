import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import DetailCard from '../DetailCard';
import { Card } from '@mui/material';

const ImageCarousel = ({imagelist,details,directionAppend}) => {
    // console.log(imagelist)
    // console.log(imagelist[0])
    return (
        <div style={{ display: 'block'}}>
            <Carousel className='m-3' variant="dark">
                {imagelist.map( imageobj => (
                    <Carousel.Item interval={1500} key={imageobj.id} 
                    style={{ height :'83vh', overflow: 'hidden'}}
                    >
                        <img
                        className="d-block w-100"
                        src={imageobj.image}
                        alt="Studio Images"
                        />
                    <Carousel.Caption>
                        <DetailCard details={details} directionAppend={directionAppend}/>
                    </Carousel.Caption>
                    </Carousel.Item>
                  ))}
            </Carousel>
        </div>
    );
}

export default ImageCarousel;