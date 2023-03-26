import { EffectCallback, useEffect, useRef } from 'react'

export default function useCallOnce(callback: EffectCallback) {
  const called = useRef(false)
  useEffect(() => {
    if (called.current) return
    called.current = true
    return callback()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
