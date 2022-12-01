import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

const ImageCarousel = ({imagelist}) => {
    // console.log(imagelist)
    // console.log(imagelist[0])
    return (
        <div style={{ display: 'block'}}>
            <Carousel variant="dark">
                {imagelist.map( imageobj => (
                    <Carousel.Item interval={3000} key={imageobj.id} style={{ height :500, overflow: 'hidden'}}>
                        <img
                        className="d-block w-100"
                        src={imageobj.image}
                        alt="Studio Images"
                        />
                    {/* <Carousel.Caption>
                        <h3>Welcome to Our Studio</h3>
                    </Carousel.Caption> */}
                    </Carousel.Item>
                  ))}
            </Carousel>
        </div>
    );
}

export default ImageCarousel;