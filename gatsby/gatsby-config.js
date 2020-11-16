/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Xcode Releases`,
    description: `More than you ever wanted to know™`,
  },
  plugins: [
    `gatsby-transformer-json`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `../_data/releases.json`,
      },
    },
  ],
}
