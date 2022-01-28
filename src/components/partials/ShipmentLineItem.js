import _ from 'lodash'

import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

export default function ShipmentLineItem({shipment_line_item}) {
    return (
        <Grid className="shipment-line-item body-2">
            <Grid container spacing={3}>
                <Grid item xs={2} sm={2}>
                    <img src={shipment_line_item.line_item.image_url} style={{width:50}}/>
                </Grid>
                <Grid item>
                    <div className="name">{ shipment_line_item.line_item.name }</div>
                    <div className="sku-code">{ shipment_line_item.line_item.sku_code }</div>
                    <div
                        className="quantity"
                    >{'Quantity'}: { shipment_line_item.quantity }</div>                    
                </Grid>
            </Grid>
        </Grid>
    )
}

