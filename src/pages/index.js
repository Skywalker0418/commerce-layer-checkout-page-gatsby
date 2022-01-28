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
        </Router>
      </Container>
    )
  )
}

