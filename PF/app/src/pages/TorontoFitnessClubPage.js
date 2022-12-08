import React from "react";
import tw from "twin.macro";
import Hero from "./TFCHero.js";
import Testimonial from "../components/testimonials/TFCTestimonials.js";
import TFCPrice from "./TFCPrice.js";

export default () => {
    const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform inline-block`;
    return (
        <>
            <Hero />
            <Testimonial />
            <TFCPrice />
            <div className="wordsundercard">
                Toronto Fitness Club
            </div>
        </>
    );
}
