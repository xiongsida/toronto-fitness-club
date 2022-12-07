import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "./TFCHero.js";
import MainFeature from "../components/features/TwoColWithButton.js";
import Courses from "../components/cards/ThreeColSlider";
import Testimonial from "../components/testimonials/TFCTestimonials.js";
import DownloadApp from "../components/cta/DownloadApp.js";
import Pricing from "./TFCPrice.js";


export default () => {
    const Subheading = tw.span`tracking-wider text-sm font-medium`;
    const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
    const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
    const Description = tw.span`inline-block mt-8`;
    const imageCss = tw`rounded-4xl`;
    return (
        <>
            <Hero />
            {/* <Courses id='courses' />
            <Pricing id='price' />
            <MainFeature
                subheading={<Subheading>Established Since 2014</Subheading>}
                heading={
                    <>
                        We've been serving for
                        <wbr /> <HighlightedText>over 5 years.</HighlightedText>
                    </>
                }
                description={
                    <Description>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                        <br />
                        <br />
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Description>
                }
                buttonRounded={false}
                textOnLeft={false}
                primaryButtonText="Latest Offers"
                imageSrc={
                    "https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
                }
                imageCss={imageCss}
                imageDecoratorBlob={true}
                imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
            /> */}

            {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}

            <Testimonial
                subheading=""
                heading={<>Customers <HighlightedText>Love Us.</HighlightedText></>}
            />
            {/* <DownloadApp
                text={<>People around you are ordering delicious meals using the <HighlightedTextInverse>Treact App.</HighlightedTextInverse></>}
            /> */}

        </>
    );
}
