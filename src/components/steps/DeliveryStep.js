import _ from 'lodash'
import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

import ShipmentSummary from "../summaries/ShipmentSummary";

import ShipmentFields from "../fields/ShipmentFields";

import {UPDATE_INVALID_SHIPMENTS, UPDATE_CURRENT_STEP} from "../../redux/constants/checkoutConstants";
import {placeOrder} from "../../redux/actions/checkoutAction";

export default function CustomerStep({completed, order}) {

    const dispatch = useDispatch()

    const checkout = useSelector(state => state.checkout)

    const validations = useSelector(state => state.checkout.validations)
    const buttons = useSelector(state => state.checkout.buttons)
    const errors = useSelector(state => state.checkout.errors)
    const requires_payment = useSelector(state => state.checkout.requires_payment)
    const shipments = useSelector(state => state.checkout.order.shipments)

    const [submitLabel, setSubmitLabel] = useState(requires_payment
        ? 'CONTINUE TO PAYMENT'
        : 'PLACE ORDER')

    const [disabled, setDisabled] = useState(validations.invalid_shipments)

    const handleSubmit = () => {
        if (requires_payment) {
            dispatch({ type: UPDATE_CURRENT_STEP, payload: 3 })
          } else {
            dispatch(placeOrder())
          }
    }

    useEffect(() => {
        const _invalid_shipments = !_.isEmpty(
            _.find(checkout.order.shipments, shipment_ => {
              return _.isEmpty(shipment_.shipping_method)
            })
          )
          setDisabled(_invalid_shipments)
    }, [validations.invalid_shipments, checkout.current_step])

    return !completed ? (
            <Box>
            {
                shipments.map((shipment, index) => 
                    <ShipmentFields
                        shipment={shipment}
                        key={shipment.id}
                        count={index+1}
                        total={shipments.length}
                    />
                )
            }
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
            <LoadingButton
                loading={buttons.loading_delivery}
                variant="contained"
                disabled = {disabled}
                onClick={()=>handleSubmit()}
                variant="contained"
                fullWidth
            >
                { submitLabel }
            </LoadingButton>
                </Grid>
            </Grid>
            {!requires_payment && errors.place_order && 
                <div
                    class="order-error"
                    id="place-order-error"
                >{ errors.place_order }</div>  
            }

            </Box>
       ) : (
            <Box>
            {
                shipments.map((shipment, index) => 
                  <ShipmentSummary
                    shipment={shipment}
                    key={shipment.id}
                    count={index+1}
                    total={shipments.length}
                    editable={false}
                  />)
            }
            </Box>
       )
}


