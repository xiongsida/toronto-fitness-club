import React, {useState} from "react";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';

const ClassTimeRangePicker=(
  {timeRange, setTimeRange}
  )=> {
  // const [value, onChange] = useState(['00:00','23:59']);
  // console.log(timeRange);
  return (
    <TimeRangePicker rangeDivider='To' hourPlaceholder='hh' minutePlaceholder='mm'
    value={timeRange} onChange={setTimeRange} disableClock={true} clearIcon='clear time range'/>
  );
}


export default ClassTimeRangePicker;