import React from "react"
import "../styles/styles.css"
import { graphql, Link } from "gatsby"

export default function Home({ data }) {
  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
      <h2>{data.site.siteMetadata.description}</h2>
    </div>
  )
}

export const query = graphql`
  query MyQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
