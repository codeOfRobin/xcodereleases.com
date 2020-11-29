import React from "react"
import Header from "../components/Header"
import Table from "../components/Table"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: 'sans-serif'
    }}>
      <Header />
      <Table />
      <Footer />
    </div>
  )
}
