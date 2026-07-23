'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const projects = [
  {
    title: 'IGNIS FIRE',
    type: '伸缩式冲顶炉设计',
    image: '/assets/project-ignis-fire-clean.webp',
    tags: ['工业设计', '户外装备', '结构表达'],
    detail: '围绕露营烹饪场景展开产品形态、结构比例与可用性设计，强调便携、稳定与机械感表达。',
  },
  {
    title: 'GLIDE COMPANION',
    type: '轻陪伴式扫拖机器人设计',
    image: '/assets/project-glide-companion-clean.webp',
    tags: ['工业设计', '智能家居', '结构交互'],
    detail: '围绕多层家庭清洁场景展开产品形态、移动结构与交互方式设计，强调轻便、亲和与智能陪伴表达。',
  },
  {
    title: 'NEATPAW',
    type: '宠物指甲护理系统设计',
    image: '/assets/project-sunward-path-clean.webp',
    tags: ['工业设计', '宠物护理', '智能交互'],
    detail: '围绕宠物指甲护理场景展开产品形态、握持结构与安全交互设计，强调温和、安心与高效护理体验。',
  },
  {
    title: 'THERMO FLEX',
    type: '多形态热敷便携筋膜枪',
    image: '/assets/project-neatpaw-system-clean.webp',
    tags: ['工业设计', '运动康复', '热敷按摩'],
    detail: '围绕运动后肌肉放松场景展开产品形态、折叠结构与热敷按摩设计，强调便携、舒缓与全方位理疗体验。',
  },
  {
    title: 'SUN LIGHT',
    type: '儿童情绪夜灯设计',
    image: '/assets/project-neatpaw-care-clean.webp',
    tags: ['工业设计', '儿童产品', '情感照明'],
    detail: '围绕儿童睡眠陪伴场景展开产品形态、开合结构与灯光交互设计，强调温暖、安全与情绪安抚表达。',
  },
  {
    title: 'FOLDSTEAM',
    type: '模块化折叠便携熨斗设计',
    image: '/assets/project-public-space-clean.webp',
    tags: ['工业设计', '旅行收纳', '模块结构'],
    detail: '围绕快节奏出行中的衣物护理场景展开产品形态、折叠结构与便携收纳设计，强调轻量、灵活与即时护理体验。',
  },
  {
    title: 'CURIOUS EXPLORER',
    type: '儿童自然探索相机设计',
    image: '/assets/project-curious-explorer.webp',
    tags: ['工业设计', '儿童产品', '自然教育'],
    detail: '围绕儿童户外探索场景展开产品形态、拍摄交互与陪伴体验设计，强调观察引导、知识启发与亲和成长表达。',
  },
  {
    title: 'WARM DRYER',
    type: '可烘衣取暖器设计',
    image: '/assets/project-warm-dryer.webp',
    tags: ['工业设计', '家居电器', '安全结构'],
    detail: '围绕冬季取暖与衣物烘干场景展开产品形态、模块支架与安全防护设计，强调温暖、便捷与柔和家居表达。',
  },
  {
    title: 'POWSPUY',
    type: '线机一体式户外电源设计',
    image: '/assets/project-powspuy.webp',
    tags: ['工业设计', '户外装备', '模块供电'],
    detail: '围绕户外办公与露营用电场景展开产品形态、线缆收纳与模块化照明设计，强调便携、稳定与持续供电体验。',
  },
  {
    title: 'AROMA EXTRACTOR',
    type: 'DIY 精油萃取机设计',
    image: '/assets/project-aroma-extractor.webp',
    tags: ['工业设计', '香薰护理', '智能萃取'],
    detail: '围绕居家香薰与精油制作场景展开产品形态、萃取结构与交互控制设计，强调高端、便捷与自然疗愈体验。',
  },
  {
    title: 'MOVE CHARGE',
    type: '动感交互移动电源设计',
    image: '/assets/project-move-charge.webp',
    tags: ['工业设计', '户外电子', '互动穿戴'],
    detail: '围绕户外移动充电场景展开产品形态、挂载方式与情感交互设计，强调便携、个性与动态陪伴体验。',
  },
  {
    title: 'OUTASK+PUBLIC',
    type: '公共空间物理灭蚊装置设计',
    image: '/assets/project-outask-public.webp',
    tags: ['工业设计', '公共设施', '户外环保'],
    detail: '围绕公共空间灭蚊场景展开产品形态、太阳能供电与景观融合设计，强调环保、高效与便捷户外体验。',
  },
]

const featuredProjects = [projects[0], projects[1], projects[4], projects[6], projects[8]]

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg
      aria-hidden="true"
      className={`arrowIcon arrowIcon--${direction}`}
      viewBox="0 0 48 48"
    >
      <path d="M9 24h28M28 13l11 11-11 11" />
    </svg>
  )
}

function BrandIntro({ onComplete }) {
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  const hasFinishedRef = useRef(false)

  const finish = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true

    const root = rootRef.current
    if (!root) {
      onComplete()
      return
    }

    gsap.timeline({ onComplete })
      .to(videoRef.current, {
        scale: 0.985,
        duration: 0.36,
        ease: 'power2.inOut',
      })
      .to(root, {
        yPercent: -100,
        duration: 0.82,
        ease: 'power4.inOut',
      }, '-=0.08')
  }, [onComplete])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      const timeoutId = window.setTimeout(finish, 240)
      return () => window.clearTimeout(timeoutId)
    }

    const video = videoRef.current
    video?.play().catch(() => {})
    const fallbackId = window.setTimeout(finish, 5000)
    return () => window.clearTimeout(fallbackId)
  }, [finish])

  return (
    <section className="brandIntro" ref={rootRef} aria-label="来点设计实验室品牌开场">
      <video
        className="brandIntro__video"
        ref={videoRef}
        src="/assets/brand-intro.mp4"
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        aria-label="来点设计实验室 Logo 动画"
      />
      <button className="brandIntro__skip" type="button" onClick={finish}>
        SKIP <span>↗</span>
      </button>
      <span className="brandIntro__edition">LIKE.DESIGN / 2026</span>
    </section>
  )
}

function Header() {
  return (
    <header className="siteHeader js-site-header">
      <a className="siteHeader__brand" href="#top" aria-label="返回首页">
        <img src="/assets/brand-logo.png" alt="来点设计实验室 LIKE.DESIGN LABORATORY" />
      </a>
      <nav aria-label="主导航">
        <a href="#projects">WORKS</a>
        <a href="#contact">WECHAT</a>
      </nav>
      <a className="siteHeader__contact" href="#contact">
        CONTACT <span>↗</span>
      </a>
    </header>
  )
}

function HeroCarousel({ isReady }) {
  const rootRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const showSlide = useCallback((nextIndex) => {
    setActiveIndex((nextIndex + featuredProjects.length) % featuredProjects.length)
  }, [])

  useEffect(() => {
    if (!isReady || isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredProjects.length)
    }, 5200)
    return () => window.clearInterval(intervalId)
  }, [isPaused, isReady])

  useGSAP(() => {
    if (!isReady) return

    const slides = gsap.utils.toArray('.heroSlide')
    const activeSlide = slides[activeIndex]
    const activeMedia = activeSlide?.querySelector('.heroSlide__media')
    const activeCopy = activeSlide?.querySelectorAll('.heroSlide__copy > *')

    gsap.set(slides, { autoAlpha: 0, zIndex: 0 })
    gsap.set(activeSlide, { autoAlpha: 1, zIndex: 1 })

    const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })
    timeline.fromTo(
      activeMedia,
      { scale: 1.075, xPercent: 2.5 },
      { scale: 1, xPercent: 0, duration: 1.55 },
    )
    timeline.fromTo(
      activeCopy,
      { y: 34, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.78, stagger: 0.08 },
      '-=1.08',
    )
  }, { scope: rootRef, dependencies: [activeIndex, isReady], revertOnUpdate: true })

  return (
    <section
      className="hero"
      id="top"
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="精选作品轮播"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="heroSlides">
        {featuredProjects.map((project, index) => (
          <article
            className={`heroSlide${index === activeIndex ? ' is-active' : ''}`}
            key={project.title}
            aria-hidden={index !== activeIndex}
          >
            <img
              className="heroSlide__media"
              src={project.image}
              alt=""
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
            <div className="heroSlide__wash" />
            <div className="heroSlide__copy">
              <span>{project.type}</span>
              <h1>{project.title}</h1>
              <p>{project.tags.join(' / ')}</p>
            </div>
          </article>
        ))}
      </div>

      <button
        className="heroArrow heroArrow--prev"
        type="button"
        aria-label="上一件作品"
        onClick={() => showSlide(activeIndex - 1)}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        className="heroArrow heroArrow--next"
        type="button"
        aria-label="下一件作品"
        onClick={() => showSlide(activeIndex + 1)}
      >
        <ArrowIcon />
      </button>

      <div className="heroCounter" aria-live="polite">
        <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
        <span>/ {String(featuredProjects.length).padStart(2, '0')}</span>
      </div>

      <div className="heroProgress" aria-label="选择轮播作品">
        {featuredProjects.map((project, index) => (
          <button
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            key={project.title}
            onClick={() => showSlide(index)}
            aria-label={`查看第 ${index + 1} 件作品：${project.title}`}
          >
            <span />
          </button>
        ))}
      </div>

      <a className="scrollCue" href="#projects">
        <span>SCROLL TO WORKS</span>
        <i />
      </a>
    </section>
  )
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <article
      className="projectCard js-project-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project, index)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(project, index)
        }
      }}
      aria-label={`查看 ${project.title} 项目`}
    >
      <div className="projectCard__visual">
        <img src={project.image} alt={`${project.title} 项目图`} loading={index > 3 ? 'lazy' : 'eager'} />
        <span className="projectCard__index">{String(index + 1).padStart(2, '0')}</span>
        <span className="projectCard__view">VIEW PROJECT ↗</span>
      </div>
      <div className="projectCard__body">
        <div className="projectCard__heading">
          <div>
            <p>{project.type}</p>
            <h3>{project.title}</h3>
          </div>
          <span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        </div>
        <div className="tagList">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <p className="projectCard__detail">{project.detail}</p>
      </div>
    </article>
  )
}

function ProjectModal({ selection, onClose }) {
  const modalRef = useRef(null)
  const { project, index } = selection

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.classList.add('is-modal-open')
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('is-modal-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useGSAP(() => {
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .fromTo('.projectModal__backdrop', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.36 })
      .fromTo(
        '.projectModal__panel',
        { yPercent: 100 },
        { yPercent: 0, duration: 0.82 },
        '-=0.2',
      )
      .fromTo(
        '.projectModal__content > *',
        { y: 28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.62, stagger: 0.075 },
        '-=0.46',
      )
  }, { scope: modalRef })

  return (
    <div className="projectModal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button className="projectModal__backdrop" type="button" aria-label="关闭项目" onClick={onClose} />
      <article className="projectModal__panel">
        <button className="projectModal__close" type="button" onClick={onClose} autoFocus>
          CLOSE <span>×</span>
        </button>
        <div className="projectModal__media">
          <img src={project.image} alt={`${project.title} 项目主视觉`} />
        </div>
        <div className="projectModal__content">
          <span>PROJECT {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <p>{project.type}</p>
          <h2 id="project-modal-title">{project.title}</h2>
          <div className="tagList">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <p className="projectModal__detail">{project.detail}</p>
        </div>
      </article>
    </div>
  )
}

function SelectedWorks({ onOpen }) {
  const rootRef = useRef(null)

  useGSAP(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const headingTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.worksHeading',
        start: 'top 82%',
        once: true,
      },
      defaults: { ease: 'power4.out' },
    })

    headingTimeline
      .fromTo('.worksHeading__kicker', { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 })
      .fromTo('.worksHeading h2', { y: 72, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.95 }, '-=0.46')
      .fromTo('.worksHeading__copy', { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.72 }, '-=0.6')

    gsap.utils.toArray('.js-project-card').forEach((card) => {
      const image = card.querySelector('.projectCard__visual img')
      const body = card.querySelectorAll('.projectCard__body > *')
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true,
        },
        defaults: { ease: 'power4.out' },
      })

      timeline
        .fromTo(card, { y: 64, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.88 })
        .fromTo(image, { scale: 1.08 }, { scale: 1, duration: 1.15 }, '<')
        .fromTo(body, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08 }, '-=0.66')
    })
  }, { scope: rootRef })

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh, { once: true })
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <section className="selectedWorks" id="projects" ref={rootRef}>
      <div className="worksHeading">
        <div>
          <span className="worksHeading__kicker">01 / SELECTED WORKS</span>
          <h2>精选项目</h2>
        </div>
        <p className="worksHeading__copy">
          从场景洞察到形态推演，从建模渲染到完整表达，持续探索产品、人与环境之间更清晰的连接。
        </p>
      </div>
      <div className="projectGrid">
        {projects.map((project, index) => (
          <ProjectCard
            project={project}
            index={index}
            key={project.title}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  )
}

function StudioFooter() {
  return (
    <section className="studioFooter" id="contact">
      <div className="studioFooter__topline">
        <span>LIKE.DESIGN LABORATORY</span>
        <span>GUANGZHOU / CHINA</span>
      </div>
      <h2>把下一种可能，<br />做成看得见的作品。</h2>
      <div className="studioFooter__contact">
        <p>项目与课程动态</p>
        <strong>微信公众号：来点设计实验室</strong>
      </div>
      <footer>
        <img src="/assets/brand-logo.png" alt="来点设计实验室" />
        <span>© 2026 LIKE.DESIGN LABORATORY</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  )
}

function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    const cursor = cursorRef.current
    if (!cursor) return undefined

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.34, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.34, ease: 'power3.out' })
    const move = (event) => {
      xTo(event.clientX)
      yTo(event.clientY)
    }
    const updateState = (event) => {
      cursor.classList.toggle('is-interactive', Boolean(event.target.closest('a, button, [role="button"]')))
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', updateState, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', updateState)
      gsap.killTweensOf(cursor)
    }
  }, [])

  return <span className="customCursor" ref={cursorRef} aria-hidden="true" />
}

export default function Home() {
  const homeRef = useRef(null)
  const [introComplete, setIntroComplete] = useState(false)
  const [selection, setSelection] = useState(null)

  useGSAP(() => {
    if (!introComplete) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      gsap.set('.js-site-header', { autoAlpha: 1 })
      return
    }

    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .fromTo(
        '.js-site-header',
        { y: -34, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.92 },
      )
      .fromTo(
        '.heroArrow, .heroCounter, .heroProgress, .scrollCue',
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06 },
        '-=0.52',
      )
  }, { scope: homeRef, dependencies: [introComplete], revertOnUpdate: true })

  const openProject = useCallback((project, index) => setSelection({ project, index }), [])
  const closeProject = useCallback(() => setSelection(null), [])

  return (
    <>
      {!introComplete && <BrandIntro onComplete={() => setIntroComplete(true)} />}
      <main className="siteShell" ref={homeRef} aria-hidden={!introComplete}>
        <Header />
        <HeroCarousel isReady={introComplete} />
        <SelectedWorks onOpen={openProject} />
        <StudioFooter />
        <CustomCursor />
      </main>
      {selection && <ProjectModal selection={selection} onClose={closeProject} />}
    </>
  )
}
