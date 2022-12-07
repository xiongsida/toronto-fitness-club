import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FilterListSelector = ({ label, options, selectedOnes, setSelectedOnes, exclusivebool}) => {
    
    const handleSelect = (event) => {
        console.log(event.target.value);
        setSelectedOnes(event.target.value);
      };

    return (
        <FormControl sx={{ m: 1, width: 270 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={selectedOnes}
          multiple={!exclusivebool}
          onChange={handleSelect}
          autoWidth
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
        >
            {exclusivebool&&<MenuItem value="">
                <em>None</em>
            </MenuItem>}

          {options.map((item,index)=>(
            <MenuItem key={index} value={item[0]}> {item[1]} </MenuItem>
          ))}
        </Select>
        </FormControl>
      );
}

export default FilterListSelector;