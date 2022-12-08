import React, {useState}from "react";
import "rsuite/dist/rsuite.css";
import { Drawer } from 'rsuite';
import { PrimaryButton, SecodaryButton } from "../../misc/Buttons";
import ClassFilterPanel from "./ClassFilterPanel";

const ClassFilterDrawer = ({classMeta, setClassMeta, 
    studioOptions, selectedStudio,
    classOptions, selectedClass, 
    scope, 
    dateRange, 
    timeRange,
    drawerOpen,
    setDrawerOpen,
    is_authenticated})=>{

    const handleClear=()=>{
        setClassMeta({
            ...classMeta,
            selectedStudio: '',
            selectedClass:'',
            scope:'', 
            dateRange:[],
            timeRange:['00:00','23:59'],
            page:1,
        });
    }

    return(
        <>
        <Drawer size={'sm'} placement={'left'} 
        style={{
            opacity: 0.93
            }} 
        open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Class Filter</Drawer.Title>
          <Drawer.Actions>
            <SecodaryButton onClick={() => setDrawerOpen(false)}>Hide</SecodaryButton>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
        <ClassFilterPanel 
            studioOptions={studioOptions} selectedStudio={selectedStudio} 
            setSelectedStudio={(value)=>{
                setClassMeta({
                    ...classMeta,
                    selectedStudio:value,
                    page:1,
                })
            }}

            classOptions={classOptions} selectedClass={selectedClass} 
            setSelectedClass={(value)=>{
                setClassMeta({
                    ...classMeta,
                    selectedClass:value,
                    page:1
                })
            }}

            scope={scope} 
            setScope={(value)=>{
                setClassMeta({
                    ...classMeta,
                    scope:value,
                    page:1
                })
            }}

            dateRange={dateRange} 
            setDateRange={(value)=>{
                setClassMeta({
                    ...classMeta,
                    dateRange:value,
                    page:1
                })
            }}

            timeRange={timeRange} 
            setTimeRange={(value)=>{
                setClassMeta({
                    ...classMeta,
                    timeRange:value,
                    page:1
                })
            }}

            is_authenticated={is_authenticated}
            />
            <PrimaryButton className=" m-3"variant="danger" onClick={handleClear}>
                Clear Filter
            </PrimaryButton>
        </Drawer.Body>
      </Drawer>
        
        </>

    );

}

export default ClassFilterDrawer;