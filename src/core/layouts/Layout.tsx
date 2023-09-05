import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import css from "./Layout.module.css"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className={css.home}>
      <Head>
        <title>{title || "dapp-demo"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </div>
  )
}

export default Layout
