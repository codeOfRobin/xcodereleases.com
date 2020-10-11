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
            release {
              beta
              gm
            }
          }
          requires
          links {
            download {
              url
            }
          }
        }
      }
    }
  }
`

function releaseTypeInfoFor({ node }) {
  const { version } = node
  console.log(version)
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
  console.log(releaseType)
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
  return (
    <tr className={`xcode ${data.node.version.release.gm === undefined ? 'beta' : 'gm'}`}>
      <td>
        {data.node.name} {data.node.version.number}
      </td>
      <td>
      {releaseTypeInfoFor(data)} {releaseVersionNumberFor(data, releaseTypeInfoFor(data))}
      </td>
    </tr>
  )
}

const XcodeTableRender = ({ allReleasesJson }) => {
  console.log(allReleasesJson)
  return (
    <table id="xcodes">
      <tbody>
        <tr>
          <th>Version</th>
          <th>Release</th>
        </tr>
        {allReleasesJson.edges.map(release => {
          return <XcodeTableRow data={release} />
        })}
      </tbody>
    </table>
  )
}

const XcodeTable = () => {
  return <StaticQuery query={releaseJSONQuery} render={XcodeTableRender} />
}

export default XcodeTable
