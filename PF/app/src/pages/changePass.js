import React, { useState, useEffect } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "../images/changepass.png";
import "./magicBorder.css";

import toast, { Toaster } from "react-hot-toast";

const config = require('../TFCConfig.json');
const Container = tw(ContainerBase)`min-h-screen  text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-primary-700 text-gray-900 shadow-lg sm:rounded-lg flex justify-center flex-1`;

const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center`;
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
    submitButtonText = "SAVE",
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
        if (password !== repeat) {
            toast.error("Passwords don't match", config.TOASTER_STYLE);
            setPassword('');
            setRepeat('');
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
                    toast.success("Password changed successfully", config.TOASTER_STYLE);
                    setOldPassword('');
                    setPassword('');
                    setRepeat('');
                } else {
                    throw new Error(JSON.stringify(data));
                }
            })
            .catch(error => {
                error = JSON.parse(error.message);
                if (error.error) {
                    toast.error(error.error, config.TOASTER_STYLE);
                }
                setOldPassword('');
                setPassword('');
                setRepeat('');
            });
    }

    return (
        <AnimationRevealPage>
            <Container>
                <Toaster />
                <Content>
                    <MainContainer>

                        <MainContent>
                            <Heading>Change Password</Heading>
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
                </Content>
            </Container>
        </AnimationRevealPage>
    );
}
