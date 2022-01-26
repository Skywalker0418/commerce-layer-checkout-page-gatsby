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

import {UPDATE_CHANGE_STEP} from '../redux/constants/checkoutConstants'

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
  // const checkout = useSelector(state => state.checkout)
  const requires_payment = useSelector(state => state.checkout.requires_payment)
  
  useEffect(() => {
    // console.log(current_step)
    console.log(current_step, order)
  },[dispatch, order, current_step])

  const handleNext = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const changeStep = (step) => {
    if ( current_step === step ) {
      return
    }
    dispatch({ type: UPDATE_CHANGE_STEP, payload: 1 })
  }

  const handleBack = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    // setActiveStep(0);
  };

  const paymentStep = () => {
      return requires_delivery ? 3 : 2
  } 

  const completed = (step) => {
    return current_step - 1 > step
  }

  return (
    <Box className={classes.stepperContainer}>
      <Stepper activeStep={current_step-1} orientation="vertical" >
        <Step key='CustomerStep' active={true} completed={completed(0) }>
          <StepLabel
              optional={(
                  <Typography variant="caption">{'Billing information and shipping address'}</Typography>
              )}
            >
              <div onClick={() => changeStep(1)}>
            { 'Customer' }
            {
              !completed(0) ? 
                '' : 
                (
                  <span >
                    &mdash;
                    <a>Edit</a>
                  </span>
                )             
            }
              </div>
          </StepLabel>
          <StepContent className={classes.StepContent}>
            <CustomerStep completed = { completed(0) } order= {order}/>
          </StepContent>
        </Step>
        
        {
          requires_delivery === true ?
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
            <DeliveryStep completed = { completed(1)  && current_step > 2 } order= {order} />
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
