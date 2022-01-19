/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import muiRootWrapper from "./src/muiRootWrapper"
import "./src/styles.css"
export const wrapPageElement = muiRootWrapper