import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Address from '../partials/Address';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  iconContainer: {
    flexGrow: "0 !important",
    flexShrink: "1 !important",
    marginRight: "8px",
    color: "rgba(0, 0, 0, 0.54)",
    fontStyle: "italic",
  },
  addressPart: {
    flex: "1 1 auto",
    maxWidth: "100%"
  },
  addressContainer: {
      display: 'flex',
  }
}))

export default function AddressSummary({address, billing = true}) {
    
    const classes = useStyles()

    return (
        <Box className="address body-2">
            <div xs = {12} className={classes.addressContainer}>
                <div className = {classes.iconContainer} >
                    place
                </div>
                <div className = {classes.addressPart} >
                    <Address address={address} billing={billing} />
                </div>
            </div>
        </Box>
    )
}

