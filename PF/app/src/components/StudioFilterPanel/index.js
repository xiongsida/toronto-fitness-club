import React from 'react';
import FilterListToggle from '../FilterListToggle';


const StudioFilterPanel = ({
    amenityOptions, selectedAmenities, setSelectedAmenities,
    classOptions, selectedClasses, setSelectedClasses,}) => {

    return (
        <div>
            <div className='input-group'>
                <p className='label'>Amenities</p>
                <FilterListToggle
                    options={amenityOptions}
                    selectedOnes={selectedAmenities}
                    setSelectedOnes={setSelectedAmenities}
                    exclusivebool={false}
                />
            </div>

            <div className='input-group'>
                <p className='label'>Classes</p>
                <FilterListToggle
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