import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar'

export default function Layout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title ? `${title} - shoppingCart` : 'shoppingCart'}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children} </main>
    </div>
  )
}