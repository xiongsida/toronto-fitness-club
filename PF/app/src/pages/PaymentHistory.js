import { Table, Pagination } from 'rsuite';
import React, { useState } from "react";
import tw from "twin.macro";
import { SectionHeading } from "../components/misc/Headings.js";
import "slick-carousel/slick/slick.css";
import "./PaymentHistory.css";
import { getFutruePlan, getUserSubscribePlan } from '../scripts/user_status.js';
export const Container = tw.div`relative`;

const { Column, HeaderCell, Cell } = Table;
const config = require('../TFCConfig.json');
const id2plans = ["", "Monthly Plan", "Yearly Plan", "Ultimate Monthly Plan", "Ultimate Yearly Plan"];

const HeadingContainer = tw.div``;
const Heading = tw(SectionHeading)``;

const dataCleaner = (element) => {
    return {
        plan: id2plans[element.plan.substring(element.plan.length - 1)],
        paid_time: new Date(element.paid_time).toLocaleString(),
        card_number: element.card_number.replace(/\d(?=\d{4})/g, '*'),
        amount: element.amount.toFixed(2),
        is_refund: element.is_refund ? "REFUNDED" : "PAID",
    }
}


export default () => {
    const token = localStorage.getItem('access_token');
    const user_url = localStorage.getItem('user_url');

    const [page, setPage] = React.useState(1);
    const [total, setTotal] = React.useState(0);
    const [rdata, setrData] = React.useState([]);
    const [futurePlan, setFuturePlan] = React.useState(null);
    const [starttime, setStartTime] = React.useState(null);
    const limit = 5;

    const futurePlan2row = () => {
        return {
            plan: futurePlan,
            paid_time: starttime,
            card_number: "N/A",
            amount: "N/A",
            is_refund: "UPCOMING",
        }
    }
    React.useEffect(() => {
        fetch(config.SERVER_URL + `/receipts?page=${page}&page_size=${limit}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setTotal(data.count);
                setrData(data.results.map(dataCleaner));
                if (page === 1 && futurePlan && starttime) {
                    setrData(rdata => [futurePlan2row(), ...rdata,]);
                }
            });
    }, [page]);

    React.useEffect(() => {
        getFutruePlan(user_url, token).then(data => {
            setFuturePlan(id2plans[data.substring(data.length - 1)]);
        });

        getUserSubscribePlan(user_url, token)
            .then(url => {
                console.log(url);
                return fetch(url, {
                    method: 'GET',
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
                });
            }).then(response => response.json())
            .then(data => {
                setStartTime(new Date(data.expired_time).toLocaleString());
            });

    }, []);


    React.useEffect(() => {
        if (futurePlan && starttime) {
            setrData(rdata => [{
                plan: futurePlan,
                paid_time: starttime,
                card_number: "N/A",
                amount: "N/A",
                is_refund: "UPCOMING",
            }, ...rdata,]);
        }
    }, [futurePlan, starttime]);

    return (
        <>
            <div className="paymentcontainer">
                <div className="paymentcard">
                    <div className=''>
                        <HeadingContainer>
                            <Heading>{"Payments"}</Heading>
                        </HeadingContainer>

                        <Table height={420} data={rdata} className="paymenttable">
                            <Column flexGrow={1} fixed fullText>
                                <HeaderCell>For</HeaderCell>
                                <Cell dataKey="plan" />
                            </Column>

                            <Column flexGrow={1} fixed fullText>
                                <HeaderCell>Time</HeaderCell>
                                <Cell dataKey="paid_time" />
                            </Column>

                            <Column flexGrow={1} fixed fullText>
                                <HeaderCell>Card Number</HeaderCell>
                                <Cell dataKey="card_number" />
                            </Column>

                            <Column flexGrow={1} fixed fullText>
                                <HeaderCell>Amount</HeaderCell>
                                <Cell dataKey="amount" />
                            </Column>
                            <Column flexGrow={1} fixed fullText>
                                <HeaderCell>ACTION</HeaderCell>
                                <Cell dataKey="is_refund" />
                            </Column>
                        </Table>
                        <div style={{ padding: 10 }} className='pagination'>
                            <Pagination
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                limit={limit}
                                total={total}
                                maxButtons={5}
                                size="md"
                                layout={['pager', 'skip']}
                                activePage={page}
                                onChangePage={setPage}
                            />
                        </div>
                    </div>
                    <div className="wordsundercard">
                        Toronto Fitness Club
                    </div>
                </div>
            </div>

        </>
    );
};