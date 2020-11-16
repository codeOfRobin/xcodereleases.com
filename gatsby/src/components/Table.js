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

const XcodeTableRow = ({ data }) => {
  const { node } = data
  return (
    <tr className={`xcode ${data.node.version.release.gm === undefined ? 'beta' : 'gm'}`}>
      <td>
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
        <ul>
          {node.sdks.macOS.map(({ build}) => {
            return <li> {build}</li>
          })}
        </ul>
      </td>
      <td>
        <ul>
          {node.sdks.iOS.map(({ build}) => {
            return <li> {build}</li>
          })}
        </ul>
      </td>
      <td>
        <ul>
          {node.sdks.watchOS.map(({ build}) => {
            return <li> {build}</li>
          })}
        </ul>
      </td>
      <td>
        <ul>
          {node.sdks.tvOS.map(({ build}) => {
            return <li> {build}</li>
          })}
        </ul>
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
  console.log(allReleasesJson.edges.slice(0,4))
  return (
    <table id="xcodes">
      <tbody>
        <tr>
          <th>Version</th>
          <th>Release</th>
          <th>Build</th>
          <th>Released</th>
          <th>Requires</th>
          <th>macOS SDKs</th>
          <th>iOS SDKs</th>
          <th>watchOS SDKs</th>
          <th>tvOS SDKs</th>
          <th>Download</th>
          <th>Release Notes</th>
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
