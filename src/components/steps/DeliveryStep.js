import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

import AddressSummary from "../summaries/AddressSummary";

export default function CustomerStep({completed, order}) {
    return !completed ? (
            <Box>
            {
                order.shipments.map
            }    
            </Box>
        ) : (
            <Box className="step-summary">
                <Grid container spacing={3}>
                    <Grid item item xs={12} sm={6}>                    
                        <div className="header">{ order.customer_email}</div>
                        <div className="billing-address-summary">
                            <AddressSummary address={order.billing_address} />
                        </div>
                    </Grid>
                    <Grid item item xs={12} sm={6}>
                        <div className="header">{'shipping address'}:</div>
                        <div className="shipping-address-summary">
                            <AddressSummary
                                address={order.shipping_address}
                                billing={false}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        )
}
