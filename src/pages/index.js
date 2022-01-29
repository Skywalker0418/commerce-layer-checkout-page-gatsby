import * as React from "react"

import { Router } from "@reach/router"
import { Container } from "@material-ui/core"

import Main from "../screens/main"
// import Seo from "../components/seo"

export default function Home({ location }) {
  const browser = typeof window !== "undefined" && window

  return (
    browser && (
      <Container className={"main"} maxWidth={false}>
        <Router>
          <Main path="/:order_id" />
          <Main path="/:order_id/paypal" payment_method={"paypal"}/>
          <Main path="/:order_id/adyen" payment_method={"adyen"}/>
          <Main path="/:order_id/confirmation" confirmation={true}/>
        </Router>
      </Container>
    )
  )
}

