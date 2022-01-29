/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

// import * as React from "react"
// import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"

// import Header from "./header"
// import "./layout.css"

// const Layout = ({ children }) => {
//   const data = useStaticQuery(graphql`
//     query SiteTitleQuery {
//       site {
//         siteMetadata {
//           title
//         }
//       }
//     }
//   `)

//   return (
//     <>
//       <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
//       <div
//         style={{
//           margin: `0 auto`,
//           maxWidth: 960,
//           padding: `0 1.0875rem 1.45rem`,
//         }}
//       >
//         <main>{children}</main>
//         <footer
//           style={{
//             marginTop: `2rem`,
//           }}
//         >
//           © {new Date().getFullYear()}, Built with
//           {` `}
//           <a href="https://www.gatsbyjs.com">Gatsby</a>
//         </footer>
//       </div>
//     </>
//   )
// }

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }

// export default Layout


import React from "react"
import { Helmet } from "react-helmet"
import Favicon from "../../public/favicon-32x32.png"
import { makeStyles } from "@material-ui/core"


const useStyles = makeStyles(() => ({
  flexWrapper: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  main: { marginTop: "4vh" },
}))

const Layout = ({ children }) => {
  // const browser = typeof window !== "undefined" && window
  const classes = useStyles()
  return (
    <>
      <Helmet>
        <link rel="icon" href={Favicon} />
      </Helmet>
      <div className={classes.flexWrapper}>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
