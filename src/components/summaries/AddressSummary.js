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
                   {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg> */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/></svg>
                </div>
                <div className = {classes.addressPart} >
                    <Address address={address} billing={billing} />
                </div>
            </div>
        </Box>
    )
}

