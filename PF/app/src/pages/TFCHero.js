import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { ReactComponent as SvgDecoratorBlob1 } from "../images/svg-decorator-blob-1.svg";
import { SectionHeading as Heading } from "../components/misc/Headings.js";
import { Link } from "react-router-dom";

const Container = tw.div`relative px-10`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;

// const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

export default () => {
  const [otherInputLocation, setOtherInputLocation]=useState('');

  return (
    <>
      {/* <Header /> */}
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              Toronto's Best Gyms <span tw="text-primary-500"> In Your Neigborhood.</span>
            </Heading>
            <br />
            <br />
            <Actions>
              <input type="text" placeholder="Enter Your Adress" 
              onChange={(e)=>{
                setOtherInputLocation(e.target.value);
              }}
              value={otherInputLocation}
              />
              <Link to={'/studios'} state={{otherInputLocation:otherInputLocation}}>
              <button>
                Get Started
              </button>
              </Link>
            </Actions>
          </LeftColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
