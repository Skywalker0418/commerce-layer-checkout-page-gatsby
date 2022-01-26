

import _ from 'lodash'

import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

import ShipmentLineItem from '../partials/ShipmentLineItem';



export default function ShipmentSummary({shipment, count, total, editable}) {
    
    return (
        <div className="shipment-summary">
            <div className="shipment-header">
                Shipment { count } of {total}
            </div>
            {
                shipment.shipment_line_items.map((shipment_line_item, index) => (
                    <ShipmentLineItem key={index} shipment_line_item={shipment_line_item} />
                ))
            }
            <ShipmentSummary shipment={shipment} count={count} total={total} editable={true} />
        </div>
    )
}


{/* <div class="shipment-summary">
    <div
      class="shipment-header"
    >{{ $t('generic.shipment') | capitalize }} {{count}} {{ $t('generic.of') }} {{total}}</div>
    <v-divider></v-divider>
    <ShipmentLineItem
      v-for="shipment_line_item in shipment.shipment_line_items"
      :key="shipment_line_item.id"
      :shipment_line_item="shipment_line_item"
    />
    <div class="shipping-method-details" v-if="!editable">{{ shipment.shipping_method.name }}</div>
  </div> */}