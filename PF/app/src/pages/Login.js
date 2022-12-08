import React, { useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container as ContainerBase, ContentWithPaddingLg } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { loginFn, storeURLFn } from "../scripts/user_status.js"
import toast, { Toaster } from "react-hot-toast";
const config = require('../TFCConfig.json');
const Container = tw(ContainerBase)`min-h-screen  text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-primary-700 text-gray-900 shadow-lg sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center `;
const MainContent = tw.div`flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold text-white`;
const FormContainer = tw.div`w-full flex-1 mt-8`;


const Form = tw.form`mx-auto max-w-xs flex-col justify-center items-center`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-200 border-4 border-primary-100 placeholder-gray-500 text-sm focus:outline-none focus:border-qing focus:bg-gray-100 mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-100 text-gray-100 w-full py-4 rounded-lg hover:bg-qing hover:text-primary-700 focus:text-gray-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

export default ({
  logoLinkUrl = config.MAIN_PAGE_URL,
  headingText = "Log In To TFC",
  submitButtonText = "Log In",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "/signup",

}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    loginFn(username, password)
      .then(response => response.json())
      .then(data => {
        if (data.access) {
          localStorage.setItem('access_token', data.access);
          return storeURLFn();
        } else {
          setPassword('');
          throw new Error(JSON.stringify(data));
        }
      })
      .then(() => { window.location.href = config.MAIN_PAGE_URL; })
      .catch(error => {
        error = JSON.parse(error.message);
        console.log("shit");
        console.log(error);
        console.log("shit");
        if (error.detail) {
          toast.error(error.detail, config.TOASTER_STYLE);
        }
        if (error.username) {
          toast.error(error.username[0], config.TOASTER_STYLE);
        }
        if (error.password) {
          toast.error(error.password[0], config.TOASTER_STYLE);
        }
      });
  };


  return (
    <AnimationRevealPage>
      <Toaster />
      <Container>
        <Content>
          <MainContainer>

            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <Form onSubmit={handleLogin}>
                  <Input value={username} onChange={event => setUsername(event.target.value)} placeholder="Username" />
                  <Input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" />
                  <SubmitButton type='submit'>
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                </Form>
                <p tw="mt-6 text-xs text-gray-200 text-center">
                  <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                    Forgot Password ?
                  </a>
                </p>
                <p tw="mt-8 text-sm text-gray-200 text-center">
                  Dont have an account?{" "}
                  <a href={signupUrl} tw="border-b border-gray-200 border-dotted">
                    Sign Up
                  </a>
                </p>
              </FormContainer>
            </MainContent>
          </MainContainer>
        </Content>
      </Container>
    </AnimationRevealPage >
  )
};
