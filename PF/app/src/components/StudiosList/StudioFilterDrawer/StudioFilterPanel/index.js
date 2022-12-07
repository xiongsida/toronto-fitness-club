import React from 'react';
import FilterListSelector from '../../../Common/FilterListSelector';


const StudioFilterPanel = ({
    amenityOptions, selectedAmenities, setSelectedAmenities,
    classOptions, selectedClasses, setSelectedClasses,}) => {

    return (
        <div>
            <div className='input-group'>
                {/* <FilterListToggle
                    options={amenityOptions}
                    selectedOnes={selectedAmenities}
                    setSelectedOnes={setSelectedAmenities}
                    exclusivebool={false}
                /> */}
                <FilterListSelector
                    label={'Amenities'}
                    options={amenityOptions}
                    selectedOnes={selectedAmenities}
                    setSelectedOnes={setSelectedAmenities}
                    exclusivebool={false}
                />
            </div>

            <div className='input-group'>
                {/* <FilterListToggle
                    options={classOptions}
                    selectedOnes={selectedClasses}
                    setSelectedOnes={setSelectedClasses}
                    exclusivebool={false}
                /> */}
                <FilterListSelector
                    label={'Classes'}
                    options={classOptions}
                    selectedOnes={selectedClasses}
                    setSelectedOnes={setSelectedClasses}
                    exclusivebool={false}
                />
            </div>
        </div>
    );

}

export default StudioFilterPanel;