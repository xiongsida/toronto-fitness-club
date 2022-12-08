import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import tw from "twin.macro";
import Box from '@mui/system/Box';
import { PrimaryButton } from '../components/misc/Buttons';


const primary = {
    100: '#a273ff',
    200: '#935bff',
    300: '#8344ff',
    400: '#742cff',
    500: '#6415FF',
    600: '#5a13e6',
    700: '#5011cc',
    800: '#460fb3',
    900: '#3c0d99',
};

const grey = {
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};

const StyledButton = styled('button')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 24px);
  min-width: 320px;
  background: ${grey[100]};

  padding: 10px;
  text-align: left;
  line-height: 1.5;

  &:hover {
    background: ${grey[200]};
  }


  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }


  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${primary[500]};
    color: #ffffff;
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const Label = styled('label')(
    ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.85rem;
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
  color: ${primary[700]};
  `,
);


function CustomSelect(props) {
    const slots = {
        root: StyledButton,
        listbox: StyledListbox,
        popper: StyledPopper,
        ...props.slots,
    };

    return <SelectUnstyled {...props} slots={slots} />;
}

CustomSelect.propTypes = {
    /**
     * The components used for each slot inside the Select.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots: PropTypes.shape({
        listbox: PropTypes.elementType,
        popper: PropTypes.func,
        root: PropTypes.elementType,
    }),
};

const plans2id = (plan) => {
    if (plan === "Monthly Plan") {
        return 1;
    } else if (plan === "Yearly Plan") {
        return 2;
    } else if (plan === "Ultimate Monthly Plan") {
        return 3;
    } else if (plan === "Ultimate Yearly Plan") {
        return 4;
    }
}


export default (props) => {
    //<UpdateSubs handleUpdateSubs={handleUpdateSubs} handleUpdateFut={handleUpdateFut} isFut={isFut} currentP={currentP} futureP={futureP} />
    const allPlans = ["Monthly Plan", "Yearly Plan", "Ultimate Monthly Plan", "Ultimate Yearly Plan"];
    const [plans, setPlans] = useState(allPlans);
    const [futPlans, setFutPlans] = useState(allPlans);

    useEffect(() => {
        setPlans(allPlans.filter((plan, idx) => (idx + 1) !== props.currentP));
        if (props.isFut) {
            setFutPlans(allPlans.filter((plan, idx) => (idx + 1) !== props.futureP));
        }
    }, [props.currentP, props.futureP]);


    const updateSubs = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        props.handleUpdateSubs(formData.get('plan'));
    };

    const updateFut = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        props.handleUpdateFut(formData.get('plan'));
    };

    return (
        <div>
            <form onSubmit={updateSubs}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <div>
                        <Label
                            id="object-value-default-label"
                            htmlFor="object-value-default-button"
                        >
                            Change Current Subscription To 👇
                        </Label>
                        <CustomSelect
                            name="plan"
                            id="object-value-default-button"
                            aria-labelledby="object-value-default-label object-value-default-button"
                        >
                            {plans.map((plan) => (
                                <StyledOption key={plan} value={plans2id(plan)}>
                                    {plan}
                                </StyledOption>
                            ))}
                        </CustomSelect>
                    </div>
                    <PrimaryButton sx={{ ml: 1 }} type="submit">
                        UPDATE
                    </PrimaryButton>
                </Box>
            </form>
            <br />
            <br />
            <form onSubmit={updateFut}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <div>
                        <Label
                            id="object-value-default-label"
                            htmlFor="object-value-default-button"
                        >
                            Set Coming Subscription To 👇
                        </Label>
                        <CustomSelect
                            name="plan"
                            id="object-value-default-button"
                            aria-labelledby="object-value-default-label object-value-default-button"
                        >
                            {futPlans.map((plan) => (
                                <StyledOption key={plan} value={plans2id(plan)}>
                                    {plan}
                                </StyledOption>
                            ))}
                        </CustomSelect>
                    </div>
                    <PrimaryButton sx={{ ml: 1 }} type="submit">
                        UPDATE
                    </PrimaryButton>
                </Box>
            </form>
        </div>
    );
}
