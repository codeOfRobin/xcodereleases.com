import { StaticQuery, graphql } from "gatsby"
import MarkdownRenderer from "./MarkdownRenderer"
import React from 'react';

const TitleAndDescription = ({ data, text }) => {
  const title = data.site.siteMetadata.title
  const description = data.site.siteMetadata.description

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "avenir",
      }}
    >
      <h2>{title}</h2>
      <p
        style={{
          marginTop: 0,
          opacity: 0.5,
        }}
      >
        {description}
      </p>
      <MarkdownRenderer text={text} />
    </div>
  )
}

const Header = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              description
              title
            }
          }
        }
      `}
      render={data => (
        <TitleAndDescription
          data={data}
          text={
            "This is not an official Apple website. [Please consider donating](https://paypal.me/XcodeReleases) to help maintain it."
          }
        />
      )}
    />
  )
}

export default Header
