// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }


// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions
//   console.log(page);
//   deletePage(page)
//   // You can access the variable "house" in your page queries now
//   createPage({
//     ...page,
//     context: {
//       ...page.context,
//       house: `Gryffindor`,
//     },
//   })
// }

const path = require("path")

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  console.log("Page -", page.path)
  if (page.path.match(/^\//)) {
    page.matchPath = "/*"
    page.component = path.resolve("src/pages/index.js")
    createPage(page)
  }
}