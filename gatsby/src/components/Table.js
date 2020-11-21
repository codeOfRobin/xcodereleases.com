import React from "react"
import { StaticQuery, graphql } from "gatsby"
import MarkdownRenderer from "./MarkdownRenderer"

const releaseJSONQuery = graphql`
  query MyQuery {
    allReleasesJson {
      edges {
        node {
          id
          name
          version {
            number
            build
            release {
              beta
              gm
            }
          }
          date {
            day
            month
            year
          }
          requires
          links {
            download {
              url
            }
            notes{
              url
            }
          }
          sdks {
            iOS {
              build
            }
            macOS {
              build
            }
            tvOS {
              build
            }
            watchOS {
              build
            }
          }
        }
      }
    }
  }
`

function releaseTypeInfoFor({ node }) {
  const { version } = node
  if (version.release.beta) {
    return "Beta"
  } else if (version.release.gmSeed) {
    return "GM Seed"
  } else if (version.release.dp) {
    return "Developer Preview"
  } else {
    return "GM"
  }
}

function releaseVersionNumberFor({ node }, releaseType) {
  const { version } = node
  switch (releaseType) {
    case "Beta":
      return version.release.beta
    case "GM Seed":
      return version.release.gmSeed
    case "Developer Preview":
      return version.release.dp
    default:
      return undefined
  }
}

const SDKList = ({ sdks }) => {
  return (
    <ul style={{
      listStyle:"none"
    }}>
      {sdks.map(({ build }) => {
        return <li> {build}</li>
      })}
    </ul>
  )
}

const XcodeTableRow = ({ data }) => {
  const { node } = data
  console.log({ "version": node.version.number, "release": node.version })
  const version = data.node.version.release.gm === true ? 'gm' : 'beta'
  return (
    <tr className={`xcode ${version}`}>
      <td style={{
        fontWeight: version === 'gm' ? 'bold' : 'regular'
      }}>
        {node.name} {node.version.number}
      </td>
      <td>
      {releaseTypeInfoFor(data)} {releaseVersionNumberFor(data, releaseTypeInfoFor(data))}
      </td>
      <td>
        {node.version.build}
      </td>
      <td>
        {node.date.day}/{node.date.month}/{node.date.year}
      </td>
      <td>
        {node.requires}
      </td>
      <td>
        <SDKList sdks={ node.sdks.macOS }/>
      </td>
      <td>
       <SDKList sdks={ node.sdks.iOS }/>
      </td>
      <td>
        <SDKList sdks={ node.sdks.watchOS }/>
      </td>
      <td>
        <SDKList sdks={ node.sdks.tvOS }/>
      </td>
      <td>
        <a href={node.links.download.url}>Downloads</a>
      </td>
      <td>
        <a href={node.links.notes.url}>Release Notes</a>
      </td>
    </tr>
  )
}

const XcodeTableRender = ({ allReleasesJson }) => {
  const headings = [
    "Version",
    "Release",
    "Build",
    "Released",
    "Requires",
    "macOS SDKs",
    "iOS SDKs",
    "watchOS SDKs",
    "tvOS SDKs",
    "Download",
    "Release Notes",
  ]
  return (
    <table id="xcodes" style={{
      margin: 0,
      width: "100%",
      tableLayout:'fixed'
    }}>
      <tbody>
        <tr>
          {headings.map(heading => {
            return <th style={{
              fontWeight: 'bold'
            }}>
              {heading}
            </th>
          }) }
        </tr>
        {allReleasesJson.edges.slice(0,9).map(release => {
          return <XcodeTableRow data={release} />
        })}
      </tbody>
    </table>
  )
}

const XcodeTable = () => {
  return (
    <div style={{
      width: "75%"
    }}>
    <StaticQuery query={releaseJSONQuery} render={XcodeTableRender} />
  </div>)
}

export default XcodeTable
