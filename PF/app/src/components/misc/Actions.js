import tw from "twin.macro";
import styled from "styled-components";

export const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-2`}
  input {
    ${tw`sm:pr-32 pl-3 py-8 sm:py-3 rounded border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 
    hocus:bg-qing hocus:text-primary-700 focus:shadow-outline focus:outline-none text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded py-3 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;
// `px-6 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-qing hocus:text-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;