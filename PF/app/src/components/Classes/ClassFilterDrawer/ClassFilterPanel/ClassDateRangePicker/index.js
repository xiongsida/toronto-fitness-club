import React from "react";
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";

const ClassDateRangePicker=({setDateRange})=> {
  
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    
    const handleSelect = (values) => {
        console.log(values.map(value=>formatDate(value)));
        setDateRange(values.map(value=>formatDate(value)));
    };

    const handleClean = ()=>{
        setDateRange([]);
    }

    return (
        <DateRangePicker size={'lg'} className='m-2' 
        onOk={handleSelect} onClean={handleClean} placeholder="Filter Class Through Date Range"/>
    );
  }
  
  
  export default ClassDateRangePicker;