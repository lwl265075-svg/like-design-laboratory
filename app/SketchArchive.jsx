'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(useGSAP, Draggable)

const sketches = Array.from({ length: 12 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0')
  return {
    number,
    src: `/assets/sketch-carousel/sketch-${number}.jpg`,
  }
})

const loopedSketches = Array.from({ length: 3 }, (_, copyIndex) =>
  sketches.map((sketch) => ({ ...sketch, copyIndex })),
).flat()

function ArrowIcon({ direction }) {
  const points = direction === 'left' ? '15 5 8 12 15 19' : '9 5 16 12 9 19'

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={`M${direction === 'left' ? '20 12H8' : '4 12h12'}`} />
      <polyline points={points} />
    </svg>
  )
}

export default function SketchArchive() {
  const rootRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const previousRef = useRef(null)
  const nextRef = useRef(null)

  useGSAP((context, contextSafe) => {
    const viewport = viewportRef.current
    const track = trackRef.current
    const previousButton = previousRef.current
    const nextButton = nextRef.current

    if (!viewport || !track || !previousButton || !nextButton) return undefined

    const cards = Array.from(track.querySelectorAll('.sketchArchive__card'))
    if (cards.length < sketches.length + 2) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dragProxy = document.createElement('div')
    const setTrackX = gsap.quickSetter(track, 'x', 'px')

    let setWidth = 0
    let cardStep = 0
    let position = 0
    let dragStartX = 0
    let dragStartPosition = 0
    let isDragging = false
    let isHovering = false
    let isFocused = false
    let isInView = false
    let manualPauseUntil = 0
    let snapTween = null

    const render = () => {
      if (!setWidth) return
      position = gsap.utils.wrap(-2 * setWidth, -setWidth, position)
      setTrackX(position)
    }

    const measure = () => {
      const previousSetWidth = setWidth
      const firstCard = cards[0]
      const secondCard = cards[1]
      const firstCardOfMiddleSet = cards[sketches.length]

      setWidth = firstCardOfMiddleSet.offsetLeft - firstCard.offsetLeft
      cardStep = secondCard.offsetLeft - firstCard.offsetLeft

      if (!previousSetWidth) {
        position = -setWidth
      } else {
        const progress = gsap.utils.wrap(0, previousSetWidth, position + previousSetWidth) / previousSetWidth
        position = -setWidth + progress * setWidth
      }

      render()
    }

    const animateTo = contextSafe((target) => {
      snapTween?.kill()
      manualPauseUntil = performance.now() + 1100

      if (reduceMotion) {
        position = target
        render()
        return
      }

      const state = { value: position }
      snapTween = gsap.to(state, {
        value: target,
        duration: 0.72,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: () => {
          position = state.value
          render()
        },
        onComplete: render,
      })
    })

    const moveByCard = (direction) => {
      if (!cardStep) return
      animateTo(Math.round(position / cardStep) * cardStep - direction * cardStep)
    }

    const snapToNearestCard = () => {
      if (cardStep) animateTo(Math.round(position / cardStep) * cardStep)
    }

    const onPrevious = () => moveByCard(-1)
    const onNext = () => moveByCard(1)
    const onPointerEnter = () => { isHovering = true }
    const onPointerLeave = () => { isHovering = false }
    const onFocusIn = () => { isFocused = true }
    const onFocusOut = (event) => { isFocused = viewport.contains(event.relatedTarget) }

    previousButton.addEventListener('click', onPrevious)
    nextButton.addEventListener('click', onNext)
    viewport.addEventListener('pointerenter', onPointerEnter)
    viewport.addEventListener('pointerleave', onPointerLeave)
    viewport.addEventListener('focusin', onFocusIn)
    viewport.addEventListener('focusout', onFocusOut)

    const draggable = Draggable.create(dragProxy, {
      type: 'x',
      trigger: viewport,
      cursor: 'grab',
      activeCursor: 'grabbing',
      minimumMovement: 4,
      onPress() {
        snapTween?.kill()
        manualPauseUntil = performance.now() + 1100
        isDragging = true
        dragStartX = this.x
        dragStartPosition = position
        viewport.classList.add('is-dragging')
      },
      onDrag() {
        position = dragStartPosition + this.x - dragStartX
        render()
      },
      onRelease() {
        isDragging = false
        viewport.classList.remove('is-dragging')
        snapToNearestCard()
      },
    })[0]

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting
    }, { threshold: 0.08 })
    intersectionObserver.observe(viewport)

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(viewport)

    const tick = (_, deltaTime) => {
      if (
        reduceMotion
        || document.hidden
        || !isInView
        || isDragging
        || isHovering
        || isFocused
        || performance.now() < manualPauseUntil
        || snapTween?.isActive()
      ) return

      position -= deltaTime * 0.026
      render()
    }

    const firstMeasureFrame = window.requestAnimationFrame(measure)
    gsap.ticker.add(tick)

    return () => {
      previousButton.removeEventListener('click', onPrevious)
      nextButton.removeEventListener('click', onNext)
      viewport.removeEventListener('pointerenter', onPointerEnter)
      viewport.removeEventListener('pointerleave', onPointerLeave)
      viewport.removeEventListener('focusin', onFocusIn)
      viewport.removeEventListener('focusout', onFocusOut)
      window.cancelAnimationFrame(firstMeasureFrame)
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
      gsap.ticker.remove(tick)
      snapTween?.kill()
      draggable.kill()
    }
  }, { scope: rootRef })

  return (
    <section className="sketchArchive" id="sketches" ref={rootRef} aria-labelledby="sketch-archive-title">
      <div className="sketchArchive__header">
        <div className="sketchArchive__titleBlock">
          <span className="sketchArchive__kicker">SKETCH ARCHIVE / 12 STUDIES</span>
          <h2 id="sketch-archive-title">手绘探索</h2>
        </div>
        <div className="sketchArchive__intro">
          <p>从形态草图、结构推演到场景表达，记录设计概念从模糊线索逐步走向清晰方案的过程。</p>
          <div className="sketchArchive__controls" aria-label="手绘轮播控制">
            <span><i aria-hidden="true" />DRAG TO EXPLORE / 12 SKETCHES</span>
            <button ref={previousRef} type="button" aria-label="上一张手绘">
              <ArrowIcon direction="left" />
            </button>
            <button ref={nextRef} type="button" aria-label="下一张手绘">
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>

      <div className="sketchArchive__viewport" ref={viewportRef} tabIndex="0" aria-label="自动滚播的工业设计手绘作品，可拖动浏览">
        <div className="sketchArchive__track" ref={trackRef}>
          {loopedSketches.map((sketch) => {
            const isPrimarySet = sketch.copyIndex === 1
            const shouldLoadEagerly = isPrimarySet && Number(sketch.number) <= 3

            return (
              <figure
                className="sketchArchive__card"
                key={`${sketch.copyIndex}-${sketch.number}`}
                aria-hidden={!isPrimarySet}
              >
                <div className="sketchArchive__media">
                  <img
                    src={sketch.src}
                    alt={isPrimarySet ? `工业设计手绘作品 ${sketch.number}` : ''}
                    width="1600"
                    height="1000"
                    loading={shouldLoadEagerly ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable="false"
                  />
                </div>
                <figcaption>
                  <strong>HAND SKETCH / {sketch.number}</strong>
                  <span>FORM · STRUCTURE · SCENARIO</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
