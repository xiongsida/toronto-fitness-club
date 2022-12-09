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
    timeRange, setTimeRange,
    is_authenticated }) => {

    return (
        <div>

            {is_authenticated && <div className='input-group'>

                <FilterListSelector
                    label={'Your Actions'}
                    options={[['myhistory', 'View your class history'], ['myschedule', 'View your class schedule']]}
                    noneOption={'Book classes (leave blank)'}

                    selectedOnes={scope}
                    setSelectedOnes={setScope}
                    exclusivebool={true}

                />
            </div>}

            <div className='input-group'>

                <FilterListSelector
                    label={'Studio'}
                    options={studioOptions}
                    noneOption={'None'}
                    selectedOnes={selectedStudio}
                    setSelectedOnes={setSelectedStudio}
                    exclusivebool={true}
                />
            </div>

            <div className='input-group'>

                <FilterListSelector
                    label={'Class'}
                    options={classOptions}
                    noneOption={'None'}
                    selectedOnes={selectedClass}
                    setSelectedOnes={setSelectedClass}
                    exclusivebool={true}
                />
            </div>

            <div>
                <ClassDateRangePicker setDateRange={setDateRange} />
            </div>

            <div>
                <ClassTimeRangePicker timeRange={timeRange} setTimeRange={setTimeRange} />
            </div>

        </div>
    );

}

export default ClassFilterPanel;