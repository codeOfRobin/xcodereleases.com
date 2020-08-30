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

const XcodeTableRow = ({ data }) => {
  return (
    <tr className="xcode">
      <td>
        {data.node.name} {data.node.version.number}
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
