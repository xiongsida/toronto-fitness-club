import React from 'react';
import FilterListSelector from '../../../Common/FilterListSelector';
import FilterListToggle from '../../../Common/FilterListToggle';
import ClassDateRangePicker from './ClassDateRangePicker';
import ClassTimeRangePicker from './ClassTimeRangePicker';

const ClassFilterPanel = ({
    studioOptions, selectedStudio, setSelectedStudio,
    classOptions, selectedClass, setSelectedClass,
    scope, setScope,
    dateRange, setDateRange,
    timeRange, setTimeRange,}) => {

    return (
        <div>
            <div className='input-group'>
                {/* <p className='label'>Studio</p>
                <FilterListToggle
                    options={studioOptions}
                    selectedOnes={selectedStudio}
                    setSelectedOnes={setSelectedStudio}
                    exclusivebool={true}
                /> */}
                <FilterListSelector
                    label={'Studio'}
                    options={studioOptions}
                    selectedOnes={selectedStudio}
                    setSelectedOnes={setSelectedStudio}
                    exclusivebool={true}
                />
            </div>

            <div className='input-group'>
                {/* <p className='label'>Scope</p>
                <FilterListToggle
                    options={[['myhistory','Your class history'],['myschedule','Your class schedule']]}
                    selectedOnes={scope}
                    setSelectedOnes={setScope}
                    exclusivebool={true}
                /> */}
                <FilterListSelector
                    label={'Your Class Scope'}
                    options={[['myhistory','Your class history'],['myschedule','Your class schedule']]}
                    selectedOnes={scope}
                    setSelectedOnes={setScope}
                    exclusivebool={true}
                
                />
            </div>

            <div className='input-group'>
                {/* <p className='label'>Class</p>
                <FilterListToggle
                    options={classOptions}
                    selectedOnes={selectedClass}
                    setSelectedOnes={setSelectedClass}
                    exclusivebool={true}
                /> */}
                <FilterListSelector
                    label={'Class'}
                    options={classOptions}
                    selectedOnes={selectedClass}
                    setSelectedOnes={setSelectedClass}
                    exclusivebool={true}
                />
            </div>

            <div>
                <ClassDateRangePicker setDateRange={setDateRange}/>
            </div>

            <div>
                <ClassTimeRangePicker timeRange={timeRange} setTimeRange={setTimeRange}/>
            </div>

        </div>
    );

}

export default ClassFilterPanel;