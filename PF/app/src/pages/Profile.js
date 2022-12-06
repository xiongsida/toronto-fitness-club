import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from "../images/dot-pattern.svg"
import { useNavigate } from "react-router-dom";
import AvatarUploader from "../components/misc/AvatarUploader.js"

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }

  button[disabled] {
    color: #ccc;
    cursor: not-allowed;
  }
  

`;

const config = require('../TFCConfig.json');
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`


export default () => {
    const navigate = useNavigate();
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [fileInfo, setFileInfo] = React.useState(null);

    useEffect(() => {
        handleRest();
    }, []);

    const handleRest = () => {
        try {
            const user_url = localStorage.getItem('user_url');
            const token = localStorage.getItem('access_token');
            fetch(user_url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    setFirstname(data.first_name);
                    setLastname(data.last_name);
                    setEmail(data.email);
                    setPhone(data.phone_number);
                    setFileInfo(data.avatar);
                    setUsername(data.username)
                    setIsButtonDisabled(true);
                });
        } catch (error) {
            alert(error);
            navigate('/');
        }
    }
    const handleSubmit = event => {
        event.preventDefault();
        const token = localStorage.getItem('access_token');
        const url = localStorage.getItem('user_url')
        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstname,
                last_name: lastname,
                email: email,
                phone_number: phone,
                avatar: fileInfo,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.url) {
                    alert('User data was successfully posted!');
                    handleRest();
                } else {
                    alert(JSON.stringify(data));
                }
            })
            .catch(error => {
                console.error('An error occurred while posting user data:', error);
            });
    };

    return (
        <Container>
            <Content>
                <FormContainer>
                    <div tw="mx-auto max-w-4xl">
                        <h2>{username}</h2>
                        <form onSubmit={handleSubmit}>
                            <TwoColumn>
                                <Column>
                                    <InputContainer>
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <Input id="last-name" value={lastname}
                                            onChange={event => { setIsButtonDisabled(false); setLastname(event.target.value); }} type="text" name="last-name" />
                                    </InputContainer>
                                    <InputContainer>
                                        <Label htmlFor="first-name">First Name</Label>
                                        <Input id="first-name" value={firstname}
                                            onChange={event => { setIsButtonDisabled(false); setFirstname(event.target.value); }} type="text" name="first-name" />
                                    </InputContainer>
                                    <InputContainer>
                                        <Label htmlFor="first-name">Avatar</Label>
                                        <AvatarUploader fileInfo={fileInfo} setFileInfo={setFileInfo} />
                                    </InputContainer>

                                </Column>
                                <Column>
                                    <InputContainer>
                                        <Label htmlFor="email-input">Email Address</Label>
                                        <Input id="email" value={email}
                                            onChange={event => { setIsButtonDisabled(false); setEmail(event.target.value); }}
                                            type="email" name="email" placeholder="therock@mail.com" />
                                    </InputContainer>
                                    <InputContainer>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" value={phone}
                                            onChange={event => { setIsButtonDisabled(false); setPhone(event.target.value); }} name="phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="xxx-xxx-xxxx" />
                                    </InputContainer>
                                    <br />
                                    <br />
                                    <SubmitButton type="button" disabled={isButtonDisabled} value="reset" onClick={handleRest}>Cancel</SubmitButton >
                                    <SubmitButton type="submit" disabled={isButtonDisabled} value="Submit">Save</SubmitButton>
                                </Column>
                            </TwoColumn>

                        </form>
                    </div>
                    <SvgDotPattern1 />
                </FormContainer>
            </Content>
        </Container >
    );
};
