import React, { useState, useEffect } from "react"
import {setOrder} from '../redux/actions/checkoutAction'
import {
  Container,
  Grid,
} from "@mui/material"
import { makeStyles } from '@mui/styles';
import Checkout from '../views/Checkout'
import Confirmation from '../views/Confirmation'
import OrderSummary from '../components/summaries/OrderSummary'

import { updateOrderPaymentSource, placeOrder } from '../redux/actions/checkoutAction';

import { useDispatch, useSelector } from "react-redux"

import { navigate } from "gatsby"


const useStyles = makeStyles(theme => ({
  header: {
    padding: "1rem 0 2rem",
  },
}))

const Main = ({ order_id, payment_method, confirmation, location }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const query = new URLSearchParams(window.location.search); 
  if (payment_method === 'paypal') {
    
    let paymentSourceAttributes = {
      paypal_payer_id: query.get('PayerID')
    } 
    dispatch(updateOrderPaymentSource(paymentSourceAttributes))
        .then(() => {
          dispatch(placeOrder())
        })
        .catch(error => {
          console.log(error)
          navigate(`/${order_id}`)
        })
  } 
  else if(payment_method === 'adyen') {
    const paymentSourceAttributes = {
        payment_request_details: {
          details: {
            MD: query.get('MD'),
            PaRes: query.get('PaRes')
          }
        },
        _details: true
      }
      dispatch(updateOrderPaymentSource(paymentSourceAttributes))
        .then(res => {
          if (res.payment_response.resultCode === 'Authorised') {
            dispatch(placeOrder())
          } else {
            console.log(
              'payment resultCode --- ',
              res.payment_response.resultCode
            )
            navigate(`/${order_id}`)
          }
        })
        .catch(error => {
          console.log(error)
          navigate(`/${order_id}`)
        })
  } 


  useEffect(() => {
    dispatch(setOrder(order_id)).then(response => {
        if ( response ) setIsLoading(true)
    })
    // eslint-disable-next-line
  }, [])
  
  const MainContainer = () => {
    return (
        <Grid container>
          <Grid item xs={12} md={7}>
            <Grid container justifyContent="center" className={classes.header} >          
              <img
                style={{ width: `${process.env.GATSBY_APP_LOGO_WIDTH}px` }}
                alt="YOUR LOGO"
                src={`${process.env.GATSBY_APP_LOGO_URL}`}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={7} order={{ xs: 3, md: 2 }}>
          { !confirmation &&
            <Checkout/> 
          }
          {
            confirmation &&
            <Confirmation/>
          }
          </Grid>
          <Grid item xs={12} md={5} order={{ xs: 2, md: 3 }}><OrderSummary/></Grid>        
        </Grid>
    )
  }

  const classes = useStyles()
  
  return (
     <Container id="layout" maxWidth={false}>
      { 
        isLoading ? <MainContainer/> : <div></div>
      }
    </Container>
  )
    

}


export default Main
