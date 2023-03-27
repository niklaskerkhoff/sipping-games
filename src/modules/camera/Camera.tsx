import React, { useContext, useRef } from 'react'
import { isNotPresent } from '../../lib/common/utils/types'
import { NavigatorContext } from '../../App'
import Button from '../../components/Button'
import { Page } from '../../components/Page'

interface Props {
  setBackgroundImageData: (data: string) => void
}


export default function Camera({ setBackgroundImageData }: Props) {

  const startCameraButtonRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const takePhotoButtonRef = useRef<HTMLButtonElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const nav = useContext(NavigatorContext)

  const stopCamera = useRef<() => void>(() => null)

  console.log('hier')


  async function startCamera() {
    if (isNotPresent(videoRef.current)) {
      return
    }
    videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })

    console.log('asdf')

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
    nav('horse-race')
  }

  return (
    <Page style={{ flexDirection: 'column' }}>
      <Button ref={startCameraButtonRef} onClick={startCamera}>Start
        Camera</Button>

      <video ref={videoRef} className='camera' width='320' height='240'
             autoPlay />

      <Button ref={takePhotoButtonRef} onClick={takePhoto}>Click Photo</Button>
      <canvas ref={canvasRef} className='camera' width='320' height='240' />

      <Button onClick={goBack}>Horse Race</Button>
    </Page>
  )
}
