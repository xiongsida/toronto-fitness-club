import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { PrimaryButton, SmallPrimaryButton } from "../misc/Buttons";
import SearchBar from "../Common/SearchBar";
import { Container, Pagination } from "rsuite";
import ClassFilterDrawer from "./ClassFilterDrawer";
import { Box } from "@mui/material";
import ClassAccordion from "./ClassAccordion";
// import { isSubscribed } from "../../scripts/user_status";

function Classes() {
    let init_studio_id = '';
    let pre_state = useLocation().state;
    init_studio_id = pre_state && pre_state.studio_id ? pre_state.studio_id : '';

    const page_size = 8;

    const [userAction, setUserAction] = useState(false);

    let user_url = localStorage.getItem('user_url');
    let access_token = localStorage.getItem('access_token');
    let is_authenticated = user_url && access_token ? true : false;
    const [userSchedule, setUserSchedule] = useState([]);
    const [userClassHistory, setUserClassHistory] = useState([]);

    useEffect(() => {

        is_authenticated && fetch('http://127.0.0.1:8000/api/alluserschedules', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(res => res.json())
            .then(data => {
                setUserSchedule(data.map(course => course.id));
            }).catch(e => {
                console.log(e)
            });
        is_authenticated && fetch('http://127.0.0.1:8000/api/alluserhistoryclasses', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        }).then(res => res.json())
            .then(data => {
                setUserClassHistory(data.map(course => course.id));
            }).catch(e => {
                console.log(e)
            });


    }, [userAction])

    const [totalItems, setTotalItems] = useState(0);
    const [studioOptions, setStudioOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);

    const [info, setInfo] = useState();
    const [classes, setClasses] = useState([]);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [classMeta, setClassMeta] = useState({
        searchInput: '',
        selectedStudio: init_studio_id,
        selectedClass: '',
        scope: '',
        dataRange: [],
        timeRange: ['00:00', '23:59'],
        page: 1,
    });
    const { searchInput, selectedStudio, selectedClass, scope, dateRange, timeRange, page } = classMeta;

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/allstudios')
            .then(res => res.json())
            .then(data => {
                setStudioOptions(data.map(studio =>
                    [studio.id, studio.name + ', ' + studio.address]
                ));
            })
        fetch('http://127.0.0.1:8000/api/allclassparents')
            .then(res => res.json())
            .then(data => setClassOptions(
                Array.from(new Set(data.map(classparent => classparent.name))).map(c => [c, c])
            ))
    }, [])

    let url = `http://127.0.0.1:8000/api/classes?&studio_id=${selectedStudio ? selectedStudio : ''}` +
        `&scope=${scope ? scope : ''}&search=${searchInput}&class_parent__name=${selectedClass ? selectedClass : ''}` +
        `&date_range_start=${dateRange && dateRange[0] ? dateRange[0] : ''}&date_range_end=${dateRange && dateRange[1] ? dateRange[1] : ''}` +
        `&time_range_start=${timeRange && timeRange[0] ? timeRange[0] : ''}&time_range_end=${timeRange && timeRange[1] ? timeRange[1] : ''}` +
        `&page=${page}&page_size=${page_size}`

    const requestMetadata = {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
    };

    useEffect(() => {
        console.log(url)

        fetch(url, is_authenticated ? requestMetadata : null)
            .then(res => {
                if (res.status !== 200) {
                    console.log(res.status);
                }
                return res.json();
            })
            .then(data => {
                // console.log(data);
                data.results ? setClasses(data.results) : setClasses([]);
                setTotalItems(data.page.totalItems);
                setInfo(data.detail);
            }).catch(error => {
                console.log(error);
            })
    }, [classMeta, userAction]);

    const handleOpenDrawer = () => {
        setDrawerOpen(true);
    };

    return (
        <>
            <Container fluid='true' className='m-0'>
                <br />
                <Row>
                    <Col md='8'>
                        <Box
                            display="flex"
                            justifyContent="right">
                            <SearchBar
                                value={searchInput}
                                // changeInput={(e) => setSearchInput(e.target.value)}
                                changeInput={(e) => setClassMeta({
                                    ...classMeta,
                                    searchInput: e.target.value,
                                    page: 1,
                                })}
                                placeholdertext='Search by class name, coach, date'
                            />
                        </Box>
                    </Col>
                    <Col md='4'>
                        <Box
                            display="flex"
                            justifyContent="left">
                            <SmallPrimaryButton onClick={() => handleOpenDrawer()}>Classes Selector</SmallPrimaryButton>
                        </Box>
                    </Col>
                </Row>
                <ClassFilterDrawer
                    classMeta={classMeta}
                    setClassMeta={setClassMeta}
                    studioOptions={studioOptions}
                    selectedStudio={selectedStudio}
                    classOptions={classOptions}
                    selectedClass={selectedClass}
                    scope={scope}
                    dateRange={dateRange}
                    timeRange={timeRange}
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                    is_authenticated={is_authenticated}
                />
                <Row>
                    <Col className='m-0'>
                        <ClassAccordion classes={classes}
                            is_authenticated={is_authenticated}
                            access_token={access_token}
                            // is_subscribed={is_subscribed} 
                            userSchedule={userSchedule}
                            userClassHistory={userClassHistory}
                            userAction={userAction}
                            setUserAction={setUserAction}
                        />
                    </Col>
                </Row>
                <Box
                    display="flex"
                    justifyContent="center">
                    <Pagination
                        className='m-2'
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        limit={page_size}
                        total={totalItems}
                        maxButtons={5}
                        size="lg"
                        layout={['pager']}
                        activePage={page}
                        onChangePage={(value) => {
                            setClassMeta({
                                ...classMeta,
                                page: value,
                            });
                        }}
                    />
                </Box>
            </Container>
        </>
    );
}

export default Classes;