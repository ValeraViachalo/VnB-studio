'use client'
import { useRect } from '@studio-freight/hamo'
import { useLenis } from '@studio-freight/react-lenis'
// import { mapRange } from 'libs/maths'
import { useEffect, useRef } from 'react'
import s from './scrollbar.module.scss'

function mapRange(in_min, in_max, input, out_min, out_max) {
  return ((input - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

export function Scrollbar() {
  const thumbRef = useRef()
  const lenis = useLenis()
  const [innerMeasureRef, { height: innerHeight }] = useRect()
  const [thumbMeasureRef, { height: thumbHeight }] = useRect()

  useLenis(
    ({ scroll, limit }) => {
      const progress = scroll / limit

      thumbRef.current.style.transform = `translate3d(0,${
        progress * (innerHeight - thumbHeight)
      }px,0)`
    },
    [innerHeight, thumbHeight],
  )

  useEffect(() => {
    let start = null

    function onPointerMove(e) {
      if (!start) return
      e.preventDefault()

      const scroll = mapRange(
        start,
        innerHeight - (thumbHeight - start),
        e.clientY,
        0,
        lenis.limit,
      )
      lenis.scrollTo(scroll, { immediate: true })
    }

    function onPointerDown(e) {
      start = e.offsetY
    }

    function onPointerUp() {
      start = null
    }

    thumbRef.current?.addEventListener('pointerdown', onPointerDown, false)
    window.addEventListener('pointermove', onPointerMove, false)
    window.addEventListener('pointerup', onPointerUp, false)

    return () => {
      thumbRef.current?.removeEventListener('pointerdown', onPointerDown, false)
      window.removeEventListener('pointermove', onPointerMove, false)
      window.removeEventListener('pointerup', onPointerUp, false)
    }
  }, [lenis])

  return (
    <div className={s.scrollbar}>
      <div ref={innerMeasureRef} className={s.inner}>
        <span
          className={s.thumb}
          ref={(node) => {
            thumbRef.current = node
            thumbMeasureRef(node)
          }}
        />
      </div>
    </div>
  )
}
