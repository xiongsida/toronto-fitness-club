import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDotPatternIcon } from "../images/dot-pattern.svg"
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { set } from "rsuite/esm/utils/dateUtils";

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
    const [card_number, setCN] = useState('');
    const [card_expire, setCE] = useState('');
    const [security_code, setSC] = useState('');
    const [card_url, setCardUrl] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const token = localStorage.getItem('access_token');
    const user_url = localStorage.getItem('user_url')
    const encode_expire = () => {
        let date = card_expire.split('/');
        return '20' + date[1] + '-' + date[0] + '-01';
    }
    const decode_expire = (expire) => {
        let date = expire.split('-');
        setCE(date[1] + '/' + date[0].substr(-2));
    }
    useEffect(() => {
        handleReset();
    }, []);

    const handleReset = () => {
        fetch(user_url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setIsButtonDisabled(true);
                if (data.payment_method) {
                    setCardUrl(data.payment_method)
                    return fetch(data.payment_method, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    })
                } else {
                    setCardUrl('');
                    setCE('');
                    setCN('');
                    throw new Error('');
                }
            })
            .then(response => response.json())
            .then(data => {
                setCN(data.card_number);
                decode_expire(data.card_expire);
                setSC(data.security_code);
            })
            .catch((error) => {

            });
    }

    const handleSubmit = event => {
        event.preventDefault();
        let first_promise = null;
        if (card_url === '') {
            first_promise = () => {
                return (
                    fetch(config.SERVER_URL + '/payment-methods', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            card_number: card_number,
                            card_expire: encode_expire(),
                            security_code: security_code,
                        })
                    })
                );
            }
        } else {
            first_promise = () => {
                return (
                    fetch(card_url, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            card_number: card_number,
                            card_expire: encode_expire(),
                            security_code: security_code,
                        })
                    })
                );
            }
        }


        first_promise()
            .then(response => response.json())
            .then(data => {
                if (data.url) {
                    toast.success('Credit Card Added!', config.TOASTER_STYLE);
                    handleReset();
                } else {
                    throw new Error(JSON.stringify(data));
                }
            })
            .catch(error => {
                error = JSON.parse(error.message);
                console.log(error);
                if (error.card_number) {
                    toast.error(error.card_number[0], config.TOASTER_STYLE);
                }
                if (error.card_expire) {
                    toast.error(error.card_expire[0], config.TOASTER_STYLE);
                }
                if (error.security_code) {
                    toast.error(error.security_code[0], config.TOASTER_STYLE);
                }
                if (error.detail) {
                    toast.error(error.detail, config.TOASTER_STYLE);
                }
                handleReset();
            });
    };

    return (
        <Container>
            <Toaster />
            <Content >
                <FormContainer>
                    <div className="magiccard">
                        {/* <div tw="mx-auto max-w-4xl"> */}
                        <h2>Payment Method</h2>
                        <form onSubmit={handleSubmit}>
                            <TwoColumn>
                                <Column>
                                    <InputContainer>
                                        <Label htmlFor="card_number">Card Number</Label>
                                        <Input id="card_number" value={card_number}
                                            onChange={event => { setIsButtonDisabled(false); setCN(event.target.value); }} type="text" name="card_number" placeholder="4111111111111111" pattern="\d*" />
                                    </InputContainer>
                                    <InputContainer>
                                        <Label htmlFor="card_expire">Expire Date</Label>
                                        <Input id="card_expire" value={card_expire}
                                            onChange={event => {
                                                setIsButtonDisabled(false);
                                                setCE(event.target.value);
                                            }} type="text" name="card_expire" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/[0-9]{2}" />
                                    </InputContainer>
                                    <InputContainer>
                                        <Label htmlFor="security_code">Security Code</Label>
                                        <Input id="security_code" value={security_code}
                                            onChange={event => { setIsButtonDisabled(false); setSC(event.target.value); }} type="text" name="security_code" placeholder="XXX" pattern="\d{3}" />
                                    </InputContainer>
                                </Column>
                                <Column>
                                    <br />
                                    <br />
                                    <br />
                                    <SubmitButton type="button" disabled={isButtonDisabled} value="reset" onClick={handleReset}>CANCEL</SubmitButton >
                                    <SubmitButton type="submit" disabled={isButtonDisabled} value="Submit">SAVE</SubmitButton>
                                    <SubmitButton type="button" disabled={card_url == ''} value="delete" onClick={() => {
                                        fetch(card_url, {
                                            method: 'DELETE',
                                            headers: {
                                                'Authorization': `Bearer ${token}`,
                                                'Content-Type': 'application/json'
                                            },
                                        }).then(data => {
                                            setCardUrl('');
                                            toast.success('Card Deleted!', config.TOASTER_STYLE);
                                            return handleReset();
                                        });
                                    }}>DELETE</SubmitButton >

                                </Column>
                            </TwoColumn>
                        </form>
                        {/* </div> */}
                        <SvgDotPattern1 />
                    </div>
                </FormContainer>
            </Content>
        </Container >
    );
};
