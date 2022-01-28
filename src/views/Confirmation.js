import React from "react"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { useSelector} from 'react-redux';
import AddressSummary from '../components/summaries/AddressSummary'
import ShipmentSummary from '../components/summaries/ShipmentSummary'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
  welcomeContainer: {
    borderRadius: "4px",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    background: "white",
    padding: "3rem",
  },
}))

export default function Confirmation() {

	const classes = useStyles()

	const checkout = useSelector(state => state.checkout)

	return (
		<Box className={classes.welcomeContainer}>
			<header>	          
        <CheckCircleOutlineIcon style={{ color: "#009000", fontSize: 100 }}/>
        <h2>
          Thank you,&nbsp;
          { checkout.order.billing_address.first_name }!
        </h2>
        <p>You order is comfirmed and we're getting it ready for shipment</p>
      </header>

      <section>
        <div className="header">Customer:</div>
        { checkout.order.customer_email }
      </section>
      <section className="addresses">
        <Grid container spacing={2}>
				  <Grid item sm={6} xs={12}>
				  	<div className="header">Billing address:</div>
	          <AddressSummary address={checkout.order.billing_address} />
				  </Grid>
      		<Grid item sm={6} xs={12}>
				  	<div className="header ship-to-header">Shipping address:</div>
            <AddressSummary address={checkout.order.shipping_address} billing={false}/>
				  </Grid>
        </Grid>
      </section>
      <section>
        { checkout.order.shipments.map((shipment, index) => 
          <ShipmentSummary
            shipment={shipment}
            key={shipment.id}
            count={index + 1}
            total={checkout.order.shipments.length}
            editable={false}
          />)
      	}
      </section>
      <section className="actions">
          { checkout.order.return_url && 
	          <Button
	            color="primary"
	            href={checkout.order.return_url}
	            >Continue shopping</Button
	          >
          }
      </section>
		</Box>
	)
}

