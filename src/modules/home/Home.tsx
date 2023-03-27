import React from 'react'
import { Page } from '../../components/Page'
import useNavigation from '../../app/Navigation'
import FlexSpacer from '../../components/FlexSpacer'
import { Paper, styled } from '@mui/material'


const Main = styled('div')`
  padding: 16px;

  height: 100%;
  overflow: auto;

  display: flex;
  flex-direction: column;

  * {
    text-align: center;
  }

  section {
    margin: 16px 0;
    flex-grow: 0;

    h1 {
      margin: 16px 16px;
      padding: 0;
      font-size: 28px;
    }

    h4 {
      margin: 0;
      padding: 0;
    }

    &.highlight {
      color: ${props => props.theme.palette.secondary.main};
      text-decoration: underline;
    }

    &.signature {
      display: flex;
      justify-content: center;

      & > div {
        border: 2px solid ${props => props.theme.palette.text.primary};
        border-radius: 8px;
        display: flex;
        padding: 8px 16px 8px 0;
        align-items: center;
        flex-shrink: 1;

        div.image {
          width: 50px;
          height: 50px;
          background-image: url("/logo192.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }
  }

`

const GameLink = styled(Paper)`

  background-image: url("/res/horse.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;


  height: 120px;
  display: flex;
  align-items: end;
  padding: 8px;
`


export default function Home() {

  const { navigate } = useNavigation()

  return (
    <Page>
      <Main>
        <FlexSpacer />
        <FlexSpacer />

        <section>
          <h4>Willkommen bei</h4>
          <h1>Sipping Games</h1>
        </section>

        <FlexSpacer />

        <section>

          <GameLink elevation={3} onClick={() => navigate('horse-race')}>
            <h4>Pferderennen</h4>
          </GameLink>
        </section>
        <section>
          Weitere Spiele kommen bald!
        </section>

        <FlexSpacer />

        <section className='highlight' onClick={() => null}>
          Feedback - Unterstützen - Über mich
        </section>

        <FlexSpacer />

        <section className='signature'>
          <div>
            <div className='image'></div>
            <div className='text'>
              <div>Eine Website von</div>
              <div><b>Niklas Kerkhoff</b></div>
            </div>
          </div>
        </section>
      </Main>
    </Page>
  )
}
