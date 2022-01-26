import _ from 'lodash'

import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";

export default function ShipmentSummary({index, shipment_line_item}) {
    return (
        <div className="shipment-line-item body-2">
            <div>
                <div row>
                    <div>
                    <img src={shipment_line_item.line_item.image_url} />
                    </div>
                    <div>
                        <div className="name">{ shipment_line_item.line_item.name }</div>
                        <div className="sku-code">{ shipment_line_item.line_item.sku_code }</div>
                        <div
                            className="quantity"
                        >{'Quantity'}: { shipment_line_item.quantity }</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


{/* <template>
  <div className="shipment-line-item body-2">
    <v-container>
      <v-layout row>
        <v-flex shrink px-2 py-1>
          <v-img :src="shipment_line_item.line_item.image_url" aspect-ratio="1" width="50" />
        </v-flex>
        <v-flex grow px-2 py-1>
          <div className="name">{{ shipment_line_item.line_item.name }}</div>
          <div className="sku-code">{{ shipment_line_item.line_item.sku_code }}</div>
          <div
            className="quantity"
          >{{ $t('generic.quantity') | capitalize }}: {{ shipment_line_item.quantity }}</div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template> */}