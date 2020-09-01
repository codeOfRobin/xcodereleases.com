import React from "react"
import remark from "remark"
import remark2react from "remark-react"
import externalLinks from "remark-external-links"

const MarkdownRenderer = ({ text }) => {
  let html = remark()
    .use(externalLinks, { target: "_blank" })
    .use(remark2react)
    .processSync(text).result
  return html
}

export default MarkdownRenderer
