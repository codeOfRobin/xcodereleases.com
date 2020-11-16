import React from "react"
import "../styles/styles.css"
import Header from "../components/Header"
import Table from "../components/Table"

export default function Home() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      flexDirection:"column"
    }}>
      <Header />
      <Table />
    </div>
  )
}
