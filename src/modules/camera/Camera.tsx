import React, { useRef } from 'react'
import { isNotPresent } from '../../lib/common/utils/types'
import { Page } from '../../components/Page'
import { Button } from '@mui/material'
import useNavigation from '../../app/Navigation'

interface Props {
  setBackgroundImageData: (data: string) => void
}


export default function Camera({ setBackgroundImageData }: Props) {

  const startCameraButtonRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const takePhotoButtonRef = useRef<HTMLButtonElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { navigate } = useNavigation()

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
  }

  function takePhoto() {
    if (isNotPresent(canvasRef.current)
      || isNotPresent(videoRef.current)) {
      return
    }
    const canvas = canvasRef.current
    const video = videoRef.current

    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
    let imageData = canvas.toDataURL('image/jpeg')

    // data url of the image
    console.log(imageData)
    setBackgroundImageData(imageData)
  }

  function goBack() {
    stopCamera.current()
    navigate('horse-race')
  }

  return (
    <Page>
      <Button ref={startCameraButtonRef} variant='contained'
              onClick={startCamera}>
        Start Camera
      </Button>

      <video ref={videoRef} className='camera' width='320' height='240'
             autoPlay muted playsInline />

      <Button ref={takePhotoButtonRef} variant='contained'
              onClick={takePhoto}>
        Click Photo
      </Button>
      <canvas ref={canvasRef} className='camera' width='320' height='240' />

      <Button variant='contained' onClick={goBack}>
        Horse Race
      </Button>
    </Page>
  )
}
