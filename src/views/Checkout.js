import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux"

import CustomerStep from '../components/steps/CustomerStep'
import DeliveryStep from '../components/steps/DeliveryStep'
import PaymentStep from '../components/steps/PaymentStep'

const useStyles = makeStyles(theme => ({
  stepperContainer: {
    borderRadius: "4px",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    background: "white",
    padding: "3rem",
    // margin: "1rem",
  },
  StepContent: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.12) !important",
  }
}))

export default function Checkout() {

  const classes = useStyles()

  const dispatch = useDispatch()

  const current_step = useSelector(state => state.checkout.current_step)
  const requires_delivery = useSelector(state => state.checkout.requires_delivery)
  const order = useSelector(state => state.checkout.order)
  const requires_payment = useSelector(state => state.checkout.requires_payment)
  
  useEffect(() => {
    // console.log(current_step)
  },[dispatch, order])

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    // setActiveStep(0);
  };

  const paymentStep = () => {
      return requires_delivery ? 3 : 2
  } 


  const Customer = ({steps, index}) => {
    return (
      <Box>
        <Grid container spacing={3}>
          <Grid item item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="Email"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="newsletter" value="yes" />}
              label="Subscribe to Newsletter"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>                  
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="stateCode"
              name="stateCode"
              label="State Code"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              autoComplete=""
              variant="standard"
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="saveAddress" value="yes" />}
              label="Ship to different address"
            />
          </Grid>
          
          



          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>                  
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="stateCode"
              name="stateCode"
              label="State Code"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              autoComplete=""
              variant="standard"
            />
          </Grid>


          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              disabled = {false}
              onClick={handleNext}
              fullWidth
            >
              {index === steps.length - 1 ? 'Finish' : 'CONTINUE TO DELIVERY'}
            </Button>
          </Grid>
        </Grid>

      </Box>
    )
  }

  const completed = (step) => {
    return current_step - 1 > step
  }

  return (
    <Box className={classes.stepperContainer}>
      <Stepper activeStep={current_step-1} orientation="vertical" >
        <Step key='CustomerStep' active={true} completed={ completed(0) }>
          <StepLabel
              optional={(
                  <Typography variant="caption">{'Billing information and shipping address'}</Typography>
              )}
            >
            { 'Customer' }
            {
              !completed(0) ? 
                '' : 
                (
                  <span>
                    &mdash;
                    <a>Edit</a>
                  </span>
                )             
            }
          </StepLabel>
          <StepContent className={classes.StepContent}>
            <CustomerStep completed = { completed(0) } order= {order} />
          </StepContent>
        </Step>
        
        {
          requires_delivery ? 
        (<Step key='DeliveryStep' active={ current_step - 1 > 0 } completed={ completed(1) }>
          <StepLabel
              optional={(
                  <Typography variant="caption">{'Shipment summary and delivery methods'}</Typography>
              )}
            >
            { 'Delivery' }
            {
              !completed(1) ? 
                '' : 
                (
                  <span>
                    &mdash;
                    <a>Edit</a>
                  </span>
                )             
            }
          </StepLabel>
          <StepContent className={classes.StepContent}>
            <DeliveryStep completed = { completed(1) } order= {order} />
          </StepContent>
        </Step>) : (<></>)
        }
        
        
        <Step key='PaymentStep' active={ current_step - 1 === paymentStep } completed={ completed(paymentStep) }>
          <StepLabel
              optional={(
                  <Typography variant="caption">{'Payment method and order confirmation'}</Typography>
              )}
            >
              { 'Payment' }
          </StepLabel>
          <StepContent className={classes.StepContent}>
            <div>123</div>
            <div>234</div>
          </StepContent>
        </Step>

      </Stepper>      
    </Box>
  );
}


{/* {current_step === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
