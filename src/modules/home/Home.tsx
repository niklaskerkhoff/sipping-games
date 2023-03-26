import React from 'react'
import { Page } from '../../App'

interface Props {
  navigate: (string: Page) => void
}

export default function Home({ navigate }: Props) {
  return (
    <>
      <h3>Willkommen bei</h3>
      <h1>Sipping Games</h1>
      <p>Von Niklas Kerkhoff</p>

      <button onClick={() => navigate('horse-race')}>Pferderennen</button>
    </>
  )
}
