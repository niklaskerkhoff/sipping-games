import React from 'react'
import { PageName } from '../../App'
import { Page } from '../../components/Page'

interface Props {
  navigate: (string: PageName) => void
}


export default function Home({ navigate }: Props) {
  return (
    <Page style={{background: '#007800'}}>
      <span style={{flexGrow: 1}}></span>
      <h3>Willkommen bei</h3>
      <h1>Sipping Games</h1>
      <p>Von Niklas Kerkhoff</p>

      <button onClick={() => navigate('horse-race')}>Pferderennen</button>
    </Page>
  )
}
