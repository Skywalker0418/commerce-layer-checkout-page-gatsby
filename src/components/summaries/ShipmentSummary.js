

import _ from 'lodash'

import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

import ShipmentLineItem from '../partials/ShipmentLineItem';



export default function ShipmentSummary({shipment, count, total, editable}) {
    return (
        <div className="shipment-summary">
            <div className="shipment-header">
                Shipment { count } of {total}
            </div>
            <Divider/>
            <Grid container>
            {
                shipment.shipment_line_items.map((shipment_line_item, index) => (
                    <ShipmentLineItem key={index} shipment_line_item={shipment_line_item} />
                ))
            }
            </Grid>
            { !editable && <div className="shipping-method-details">{ shipment.shipping_method.name }</div> }
        </div>
    )
}
