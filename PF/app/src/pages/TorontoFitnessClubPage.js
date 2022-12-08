import React from "react";
import tw from "twin.macro";
import Hero from "./TFCHero.js";
import Testimonial from "../components/testimonials/TFCTestimonials.js";


export default () => {
    const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
    return (
        <>
            <Hero />
            <Testimonial
                subheading=""
                heading={<>Customers <HighlightedText>Love Us.</HighlightedText></>}
            />
        </>
    );
}
