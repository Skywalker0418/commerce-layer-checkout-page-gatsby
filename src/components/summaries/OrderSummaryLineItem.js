import * as React from 'react';
import Grid from '@mui/material/Grid';

export default function OrderSummaryLineItem({line_item}) {
	return (
		
		 <Grid className="line-item body-2">
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <img src={ line_item.image_url || ''} style={{width:75}}/>
                </Grid>
                <Grid item xs={6}>
                    <div className="name">{ line_item.name }</div>
                    <div className="sku-code">{ line_item.sku_code }</div>
                    <div
                        className="quantity"
                    >{'Quantity'}: { line_item.quantity }</div>                    
                </Grid>
                <Grid item xs={3}>
                	<div className="amount">{ line_item.formatted_total_amount }</div>
                </Grid>
            </Grid>
        </Grid>
	)
}