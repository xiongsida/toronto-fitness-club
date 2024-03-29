import React, { useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import logo from "../images/logo.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { storeURLFn } from "../scripts/user_status.js"
import toast, { Toaster } from "react-hot-toast";

const config = require('../TFCConfig.json');
const Container = tw(ContainerBase)`min-h-screen text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-primary-700 text-gray-900 shadow-lg sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`flex flex-col items-center`;

const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold text-white`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
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
  headingText = "Sign Up For TFC",
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "#",
  privacyPolicyUrl = "#",
  logInUrl = "/login"
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');

  const handleSignup = (event) => {
    event.preventDefault();
    if (password !== repeat) {
      toast.error('Passwords don\'t match', config.TOASTER_STYLE);
      setPassword('');
      setRepeat('');
      return;
    }

    fetch(config.SERVER_URL + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (!data.url) {
          throw new Error(JSON.stringify(data));
        } else {
          return fetch(config.AUTH_URL, {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json',
            },
            body: JSON.stringify({ username, password })
          });
        }
      })
      .then(response => response.json())
      .then(data => {
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        return storeURLFn();
      }).then(data => {
        toast.success('Success!', config.TOASTER_STYLE);
        window.location.href = config.MAIN_PAGE_URL;
      })
      .catch(error => {
        error = JSON.parse(error.message);
        console.log(error.message);
        if (error.username || error.password) {
          if (error.username) {
            error.username.forEach(message => toast.error(message, config.TOASTER_STYLE))
            setUsername('');
          }
          if (error.password) {
            error.password.forEach(message => toast.error(message, config.TOASTER_STYLE))
          }
        } else {
          toast.error(error.detail, config.TOASTER_STYLE);
        }
        setPassword('');
        setRepeat('');
      });
  }



  return (
    <AnimationRevealPage>
      <Toaster />
      <Container>
        <Content>
          <MainContainer>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <Form onSubmit={handleSignup}>
                  <Input value={username} onChange={event => setUsername(event.target.value)} placeholder="Username" />
                  <Input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" />
                  <Input type="password" value={repeat} onChange={event => setRepeat(event.target.value)} placeholder="Repeat Your Password" />
                  <SubmitButton type='submit'>
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                  <p tw="mt-6 text-xs text-gray-200 text-center">
                    I agree to abide by toronto fitness club's{" "}
                    <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>{" "}
                    and its{" "}
                    <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>

                  <p tw="mt-8 text-sm text-gray-200 text-center">
                    Already have an account?{" "}
                    <a href={logInUrl} tw="border-b border-gray-500 border-dotted">
                      Log In
                    </a>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
}
