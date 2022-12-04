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

const FilterListToggle = ({ options, selectedOnes, setSelectedOnes }) => {

  const handleSelect = (event, newOnes) => {
    setSelectedOnes(newOnes);
    // console.log(newOnes);
  };
    
  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={selectedOnes}
      onChange={handleSelect}
      sx={someStyles.root}
    >
      {options.map(value => (
        <ToggleButton key={value} value={value} sx={someStyles.toggle}>
          {value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
  
export default FilterListToggle;
