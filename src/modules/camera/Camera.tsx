import React, { useRef, useState } from 'react'
import { isNotPresent } from '../../lib/common/utils/types'
import { Page } from '../../components/Page'
import { Button } from '@mui/material'
import useNavigation from '../../app/Navigation'
import ActionBar from '../../components/ActionBar'
import CardView from '../../components/CardView'
import { Card } from '../../model/Card'

interface Props {
  setBackgroundImageData: (data?: string) => void
}


export default function Camera({ setBackgroundImageData }: Props) {

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { navigateBack } = useNavigation()

  const stopCamera = useRef<() => void>(() => null)

  console.log('hier')


  async function startCamera() {
    if (isNotPresent(videoRef.current)) {
      return
    }
    const video = videoRef.current
    video.srcObject = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })

    stopCamera.current = () => {
      const stream = videoRef.current?.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
    setView('photoTaker')
  }

  function takePhoto() {
    if (isNotPresent(canvasRef.current)
      || isNotPresent(videoRef.current)) {
      return
    }
    const canvas = canvasRef.current
    const video = videoRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
    let imageData = canvas.toDataURL('image/jpeg')

    // data url of the image
    console.log(imageData)
    setBackgroundImageData(imageData)
    setView('photoViewer')
  }

  type View = 'start' | 'photoTaker' | 'photoViewer'

  const [view, setView] = useState<View>('start')


  function recapTakePhoto() {
    setBackgroundImageData(undefined)
    setView('photoTaker')
  }

  function goBack() {
    stopCamera.current()
    navigateBack()
  }


  return (
    <Page>
      <div style={{display: view === 'start' ? 'block' : 'none'}}>
        <p style={{ textAlign: 'center' }}>
          <b>Die Bilder bleiben auf deinem Gerät!</b>
          <br /><br />
          Insbesondere werden sie nicht an einen Server gesendet.
          Mit Verlassen dieser Website, werden die Bilder verworfen!
          <br /><br />
        </p>

        <ActionBar>

          <Button variant='contained' color='info' onClick={goBack}>
            Nee lass mal
          </Button>

          <Button variant='contained' color='info' onClick={startCamera}>
            Kamera starten
          </Button>
        </ActionBar>

      </div>

      <div style={{display: view === 'photoTaker' ? 'block' : 'none'}}>
        <video ref={videoRef} className='camera' width='320' height='240'
               autoPlay muted playsInline />

        <ActionBar>
          <Button variant='contained' color='info' onClick={takePhoto}>
            Aufnahme
          </Button>
        </ActionBar>


        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      <div style={{display: view === 'photoViewer' ? 'block' : 'none'}}>
        <div>
          <CardView card={new Card('A', 'S')} covered={true} height={400} />
        </div>


        <ActionBar style={{ width: '100%' }}>
          <Button variant='contained' color='info' onClick={recapTakePhoto}>
            Wiederholen
          </Button>

          <Button variant='contained' color='info' onClick={goBack}>
            Fertig
          </Button>
        </ActionBar>
      </div>

    </Page>
  )
}
