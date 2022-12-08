import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container } from "../../components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-8.svg";

export const ContentWithPaddingXl = tw.div`max-w-screen-xl mx-auto pb-20 lg:pb-24`;
const Testimonials = tw.div`flex flex-col lg:flex-row items-center lg:items-stretch`;
const TestimonialContainer = tw.div`mt-16 lg:w-1/3`;
const Testimonial = tw.div`px-4 text-center max-w-xs mx-auto flex flex-col items-center`;
const Image = tw.img`w-20 h-20 rounded-full`;
const Quote = tw.blockquote`mt-5 text-gray-600 font-medium leading-loose`;
const CustomerName = tw.p`mt-5 text-gray-900 font-semibold uppercase text-sm tracking-wide`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute left-0 top-0 h-56 w-56 opacity-15 transform -translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute right-0 bottom-0 h-64 w-64 opacity-15 transform translate-x-2/3 text-yellow-500`}
`;

export default ({
    subheading = "Testimonials",
    heading = "Customer's Review",
    testimonials = [
        {
            imageSrc:
                "https://cachedimages.podchaser.com/256x256/aHR0cHM6Ly9jcmVhdG9yLWltYWdlcy5wb2RjaGFzZXIuY29tL2RmODZjM2RjZTg5ZDI2ZGQzZWI5NWU4YzI1MDBhMTIyLmpwZWc%3D/aHR0cHM6Ly93d3cucG9kY2hhc2VyLmNvbS9pbWFnZXMvbWlzc2luZy1pbWFnZS5wbmc%3D",
            quote:
                "The gym was so impressive that I was tempted to stay there forever and forget all about my plans to travel to Mars. The equipment was top-of-the-line and the staff was incredibly helpful and friendly. I was truly impressed by the whole experience and would highly recommend the gym to anyone looking for a great workout in a welcoming environment",
            customerName: "Elon Musk"
        },
        {
            imageSrc:
                "https://i.imgur.com/p2bhRej.png",
            quote:
                "As a long-time member and employee, I've come to love everything about your club. Despite being unable to afford health insurance, I've managed to stay healthy thanks to the regular exercise I get at your gym. In fact, my regular workouts have even helped me overcome cancer",
            customerName: "Captain WiFi"
        },
        {
            imageSrc:
                "https://avatars.akamai.steamstatic.com/f4f5c45f281a599fd140e8da4e4fb75b05e3c858_full.jpg",
            quote:
                "I wanted to thank you for the wonderful experience I had at your gym. I recently had the pleasure of meeting Elon Musk while working out, and we ended up getting into a disagreement. However, the staff at your gym intervened and helped us resolve our differences. In the end, Elon and I became good friends, and I couldn't be more grateful",
            customerName: "Kanye West"
        }
    ]
}) => {
    return (
        <Container>
            <ContentWithPaddingXl>
                <Testimonials>
                    {testimonials.map((testimonial, index) => (
                        <TestimonialContainer key={index}>
                            <Testimonial>
                                <Image src={testimonial.imageSrc} />
                                <Quote>"{testimonial.quote}"</Quote>
                                <CustomerName>- {testimonial.customerName}</CustomerName>
                            </Testimonial>
                        </TestimonialContainer>
                    ))}
                </Testimonials>
            </ContentWithPaddingXl>

            <DecoratorBlob1 />
            <DecoratorBlob2 />
        </Container>
    );
};
