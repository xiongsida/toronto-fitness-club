import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const someStyles =({
  root: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  toggle: {
    fontFamily: `'Raleway', sans-serif`,
    fontSize: '.8rem',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '10px',
  },
});

const FilterListToggle = ({ options, selectedOnes, setSelectedOnes, exclusivebool}) => {

  const handleSelect = (event, newOnes) => {
    setSelectedOnes(newOnes);
    console.log(newOnes);
  };
  // console.log(options);
    
  return (
    <ToggleButtonGroup
      // orientation="vertical"
      exclusive={exclusivebool}
      value={selectedOnes}
      onChange={handleSelect}
      sx={someStyles.root}
    >
      {options&&options.map((item,index) => (
        <ToggleButton key={index} value={item[0]} sx={someStyles.toggle}>
          {item[1]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
  
export default FilterListToggle;
