import React from 'react'
import {  Button, Container } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import image2 from '../slider-images/slider-image-2.jpg'
 const Slider = () => {
    return (
        <Container fluid className="slider-full">
            <Carousel className="carousel slide carousel-fade" data-ride="carousel">
                <Carousel.Item>
                    <img src={image2} alt="no" className="d-block w-100" />
                    <Carousel.Caption>
                        <h2>Keeps Track  of Your <br /> Daily Tasks Organized</h2>
                        <Button varient='info' size='lg'>Try Now </Button>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={image2} alt="no" className="d-block w-100" />
                    <Carousel.Caption>
                        <h2>Keeps Track  of Your <br /> Daily Tasks Organized</h2>
                        <Button varient='info' size='lg'>Try Now </Button>
                    </Carousel.Caption>
                </Carousel.Item>



            </Carousel>
        </Container>
    )
}
export default Slider;