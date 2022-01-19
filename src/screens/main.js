import React, { useState, useEffect } from "react"
import {setOrder} from '../redux/actions/checkoutAction'
import {
  Card,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material"
import { makeStyles } from '@mui/styles';
import Checkout from '../views/Checkout'
import OrderSummary from '../components/summaries/OrderSummary'

import { useDispatch, useSelector } from "react-redux"

const useStyles = makeStyles(theme => ({
  header: {
    padding: "1rem 0 2rem",
  },
}))



const Main = ({ order_id, location }) => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setOrder(order_id))
    // eslint-disable-next-line
  }, [])

  const classes = useStyles()
  
  return (
  	<Container id="layout" maxWidth={false}>
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
        <Grid item xs={12} md={7} order={{ xs: 3, md: 2 }}><Checkout/></Grid>
        <Grid item xs={12} md={5} order={{ xs: 2, md: 3 }}><OrderSummary/></Grid>        
      </Grid>
      
  		{order_id}
  	</Container>
  )
}


export default Main
