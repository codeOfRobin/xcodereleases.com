import React from "react"
import remark from "remark"
import remark2react from "remark-react"
import externalLinks from "remark-external-links"

class MarkdownRenderer extends React.Component {
  render() {
    let html = remark()
      .use(externalLinks, { target: "_blank" })
      .use(remark2react)
      .processSync(this.props.text).result
    return html
  }
}

export default MarkdownRenderer
