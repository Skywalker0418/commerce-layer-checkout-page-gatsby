import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

import AddressSummary from "../summaries/AddressSummary";

import ShipmentFields from "../fields/ShipmentFields";

export default function CustomerStep({completed, order}) {
    
    const dispatch = useDispatch()

    const checkout = useSelector(state => state.checkout)

    const validations = checkout.validations
    const buttons = checkout.buttons
    const errors = checkout.errors
    const requires_payment = checkout.requires_payment
    const shipments = checkout.order.shipments

    const nameLabel = () => {
      return requires_payment
        ? 'CONTINUE TO PAYMENT'
        : 'PLACE ORDER'
    }

    const [disabled, setDisabled] = useState(false)
    const [submitLabel, setSubmitLabel] = useState('')

    useEffect(() => {
        setSubmitLabel(requires_payment
        ? 'CONTINUE TO PAYMENT'
        : 'PLACE ORDER')
    }, [requires_payment]) 

    const handleSubmit = () => {

    }

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
            <LoadingButton
                loading={buttons.loading_delivery}
                variant="contained"
                disabled = {disabled}
                onClick={handleSubmit}
                variant="contained"
                fullWidth
            >
                { submitLabel }
            </LoadingButton>
            {!requires_payment && 
                <div
                    class="order-error"
                    id="place-order-error"
                    v-show={errors.place_order}
                >{ errors.place_order }</div>  
            }
            </Box>
        ) : (
            <></>
            // <Box className="step-summary">
            //     <Grid container spacing={3}>
            //         <Grid item item xs={12} sm={6}>                    
            //             <div className="header">{ order.customer_email}</div>
            //             <div className="billing-address-summary">
            //                 <AddressSummary address={order.billing_address} />
            //             </div>
            //         </Grid>
            //         <Grid item item xs={12} sm={6}>
            //             <div className="header">{'shipping address'}:</div>
            //             <div className="shipping-address-summary">
            //                 <AddressSummary
            //                     address={order.shipping_address}
            //                     billing={false}
            //                 />
            //             </div>
            //         </Grid>
            //     </Grid>
            // </Box>
    )
}
