import React, { useState, useEffect } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "../images/signup-illustration.svg";
import logo from "../images/logo.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";

const config = require('../TFCConfig.json');
const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export default ({
    logoLinkUrl = config.MAIN_PAGE_URL,
    illustrationImageSrc = illustration,
    headingText = "Change Password",
    submitButtonText = "SAVE",
    SubmitButtonIcon = SignUpIcon,
    tosUrl = "#",
    privacyPolicyUrl = "#",
}) => {
    const [username, setUsername] = useState('');
    const [old_password, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const token = localStorage.getItem('access_token');
    const user_url = localStorage.getItem('user_url');
    useEffect(() => {
        fetch(localStorage.getItem('user_url'), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setUsername(data.username);
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password != repeat) {
            alert('passwords don\'t match');
            return;
        }
        fetch(config.SERVER_URL + '/update-password', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                "old_password": old_password,
                "new_password": password,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    window.location.href = config.MAIN_PAGE_URL;
                } else {
                    throw new Error(JSON.stringify(data));
                }
            })
            .catch(error => {
                alert(error);
                console.error(error);
            });
    }

    return (
        <AnimationRevealPage>
            <Container>
                <Content>
                    <MainContainer>
                        <LogoLink href={logoLinkUrl}>
                            <LogoImage src={logo} />
                        </LogoLink>
                        <MainContent>
                            <Heading>{'Hi! ' + username}</Heading>
                            <FormContainer>
                                <Form onSubmit={handleSubmit}>
                                    <Input type="password" value={old_password} onChange={event => setOldPassword(event.target.value)} placeholder="Your current password" />
                                    <Input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="New password" />
                                    <Input type="password" value={repeat} onChange={event => setRepeat(event.target.value)} placeholder="Repeat new password" />
                                    <SubmitButton type='submit'>
                                        <span className="text">{submitButtonText}</span>
                                    </SubmitButton>
                                </Form>
                            </FormContainer>
                        </MainContent>
                    </MainContainer>
                    <IllustrationContainer>
                        <IllustrationImage imageSrc={illustrationImageSrc} />
                    </IllustrationContainer>
                </Content>
            </Container>
        </AnimationRevealPage>
    );
}
