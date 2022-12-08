import React from "react";
import tw from "twin.macro";
import Hero from "./TFCHero.js";
import Testimonial from "../components/testimonials/TFCTestimonials.js";
import TFCPrice from "./TFCPrice.js";
import styled from "styled-components";

const Heading = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center`

const Card = styled.a`
  ${tw`flex flex-col items-center text-primary-600  text-center h-full mx-4 px-4 rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105 hover:no-underline hover:text-qing `}
`;
export default () => {

    return (
        <>
            <Hero />
            <Heading>
                <Card href="/plans">
                    Check out our plans
                </Card>
            </Heading>
            <Testimonial />
            <div className="wordsundercard">
                Toronto Fitness Club
            </div>
        </>
    );
}
