'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SketchArchive from './SketchArchive'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const projects = [
  {
    title: 'IGNIS FIRE',
    type: '伸缩式冲顶炉设计',
    image: '/assets/project-ignis-fire-clean.webp',
    heroImage: '/assets/hero-ignis-fire-v2.webp',
    cardImage: '/assets/project-ignis-fire-lineup.webp',
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
  {
    title: 'Mintu导盲鞍',
    type: '导盲犬智能鞍具设计',
    image: '/assets/project-13-mintu.webp',
    tags: ['关怀设计', '穿戴产品', '导盲设备'],
    detail: '给导盲犬更舒适的工作条件，更好地帮助残疾人。',
  },
  {
    title: 'Yuunxi排烟制冷一体集成',
    type: '排烟制冷一体集成设计',
    image: '/assets/project-14-yuunxi.webp',
    tags: ['家用电器', '厨具产品', '工业设计'],
    detail: '改善烹饪环境，让烹饪过程更清爽、舒适和高效。',
  },
  {
    title: 'miro免淘米自动电饭煲',
    type: '免淘米自动电饭煲设计',
    image: '/assets/project-15-miro.webp',
    tags: ['家用电器', '厨具产品', '智能产品'],
    detail: '一键煮饭，解放双手，为用户带来更加便捷、高效且兼顾口感的烹饪体验。',
  },
  {
    title: 'LNM×NIV冬日通勤打造的高效融冰设备',
    type: '冬日通勤高效融冰设备设计',
    image: '/assets/project-16-lnm-niv.webp',
    tags: ['户外产品', '用户旅程', '工业设计'],
    detail: '基于冬日车体结冰背景下实现快速融冰，让冬日出行更加轻松高效。',
  },
  {
    title: 'Aquavad口腔清洁',
    type: '便捷式负压口腔清洁设计',
    image: '/assets/project-17-aquavad.webp',
    tags: ['关怀设计', '洗漱用品', '产品设计'],
    detail: '便捷式负压牙刷专为老年人群干口症及口腔清洁需求设计。',
  },
  {
    title: 'Aura等离子美容仪',
    type: '等离子美容仪设计',
    image: '/assets/project-18-aura.webp',
    tags: ['美容仪', '等离子', '科技简约'],
    detail: '弱化传统设备的冰冷机械感，通过圆润轮廓、简洁界面与柔和光效，建立更温和可信的产品形象。',
  },
  {
    title: 'NOMAD单兵摄影师行李系统设计',
    type: '单兵摄影师行李系统设计',
    image: '/assets/project-19-nomad.webp',
    tags: ['户外产品', '工业设计', '单兵摄影'],
    detail: '通过一秒卡扣解耦，完美实现“生活托运、器材随身、极速通关”的极致差旅秩序。',
  },
  {
    title: '骏岁如歌-旋律唤醒新月',
    type: '马年模块化音乐月历设计',
    image: '/assets/project-20-junsui.webp',
    tags: ['马年文创', '月历设计', '模块化'],
    detail: '用户通过旋转把手转动两侧转轴，在八音盒清脆的旋律中，旧月卷藏的同时，新月缓缓展开，象征辞旧迎新，为旧月的收获喜悦，为新月的到来满怀期待。',
  },
  {
    title: '丹霞微景艺',
    type: '丹霞文化微缩景观文创',
    image: '/assets/project-21-danxia.webp',
    tags: ['文创设计', '微缩景观', '文化好礼'],
    detail: '秉持绿色再生理念，致力于打造环保、可持续的艺术品。',
  },
  {
    title: 'DIVING ROBOTS',
    type: '基于 AUV 水下伴游的海洋科普潜水服务设计',
    image: '/assets/hero-diving-robots-20260808.png',
    tags: ['水下伴游', '潜水服务', '沉浸式海底体验'],
    detail: '面向零基础、不会游泳人群的智能伴游式休闲潜水沉浸式服务系统设计。',
  },
  {
    title: 'MoxiLife',
    type: '场景化思维下电子艾灸仪设计',
    image: '/assets/project-23-moxilife.png',
    tags: ['场景化产品设计', '电子艾灸仪', '中医现代康养'],
    detail: '为用户打造一款随时随地、便捷高效且贴合其特定情境需求的艾灸养生设备。',
  },
  {
    title: 'Luune智能引路颈脖',
    type: '智能无障碍引路设备设计',
    image: '/assets/project-24-luune.png',
    tags: ['关怀设计', '智能产品', 'AI助手'],
    detail: '构建人与环境、路人之间的双向沟通，提升视障者出行的安全性与独立性。',
  },
  {
    title: 'OceanFun 智能全脸浮潜面罩',
    type: '智能全脸浮潜面罩设计',
    image: '/assets/project-25-oceanfun.png',
    tags: ['水下伴游', '潜水服务', '生态科普', '沉浸式海底体验'],
    detail: '集成 AI 识别、GPS 与 AR 显示，打造安全科普一体的免手持智能浮潜面罩。',
  },
  {
    title: 'CompoSeq厨余堆肥站',
    type: '社区厨余堆肥站设计',
    image: '/assets/project-26-composeq.png',
    tags: ['绿色设计', '可持续设计', '公共设施'],
    detail: '践行环保共享理念，助力社区垃圾减量，打造绿色宜居环境。',
  },
  {
    title: 'Legooor 模块化行李滑板车',
    type: '模块化行李滑板车设计',
    image: '/assets/project-27-legooor.png',
    tags: ['智能产品', '户外产品', '电动滑板车'],
    detail: '为用户提供更直观的方向指引，在拖行、乘坐与通勤之间实现灵活切换。',
  },
]

const featuredProjects = [
  {
    title: 'DIVING ROBOTS',
    type: '基于 AUV 水下伴游的海洋科普潜水服务设计',
    image: '/assets/hero-diving-robots-20260808.png',
    tags: ['水下伴游', '潜水服务', '沉浸式海底体验'],
    detail: '以 AUV 智能水下载具为核心，构建兼具安全陪游、海洋科普与沉浸探索的潜水服务体验。',
  },
  projects[0],
  {
    ...projects[1],
    image: '/assets/hero-glide-family-20260725.png',
  },
  {
    ...projects[4],
    title: 'NEATPAW',
    type: '宠物指甲护理系统设计',
    image: '/assets/hero-neatpaw-cat-20260725.png',
    tags: ['工业设计', '宠物护理', '智能交互'],
    detail: '围绕宠物指甲护理场景展开产品形态、握持结构与安全交互设计，强调温和、安心与高效护理体验。',
  },
  projects[6],
  projects[8],
  {
    title: 'MoxiLife',
    type: '场景化思维下电子艾灸仪设计',
    image: '/assets/hero-moxilife-20260808.png',
    tags: ['场景化产品设计', '电子艾灸仪', '中医现代康养'],
    detail: '将传统艾灸体验转化为适配多种生活场景的现代康养产品，以灵活穿戴与模块化灸疗提升日常使用的便捷性。',
  },
]
const awardImages = Array.from({ length: 56 }, (_, index) => {
  const awardNumber = index + 1
  const extension = awardNumber >= 52 ? 'png' : 'webp'

  return {
    index: awardNumber,
    src: `/assets/awards/award-${String(awardNumber).padStart(2, '0')}.${extension}`,
  }
})
const portraitAwardImages = awardImages.filter(({ index }) => index <= 10 || (index >= 17 && index <= 31) || index === 52)
const landscapeAwardImages = awardImages.filter(({ index }) => (index >= 11 && index <= 16) || [53, 54].includes(index))
const addedPortraitAwardImages = awardImages.filter(({ index }) =>
  [34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 55].includes(index),
)
const addedLandscapeAwardImages = awardImages.filter(({ index }) =>
  [32, 33, 35, 48, 49, 50, 51, 56].includes(index),
)

const ignifierStages = [
  {
    at: 0,
    eyebrow: 'PROJECT 01',
    title: 'IGNIFIER 原野',
    subtitle: '便携式户外伸缩冲顶炉设计',
    english: 'PORTABLE OUTDOOR TELESCOPIC STOVE',
    copy: '以收纳、展开、点火与稳定支撑为核心的户外炉具设计。',
  },
  {
    at: 0.17,
    eyebrow: '01 / STORAGE',
    title: '一体化收纳结构',
    subtitle: 'INTEGRATED STORAGE',
    copy: '将炉头、防风罩与支撑模块压缩为紧凑筒体，减少户外携带体积，使炉具在收纳状态下保持完整、安全、易携带。',
  },
  {
    at: 0.37,
    eyebrow: '02 / EXPANSION',
    title: '展开式支撑系统',
    subtitle: 'EXPANDING SUPPORT SYSTEM',
    copy: '侧向防风翼与锅具支架同步打开，形成更大的承托面积。清晰的展开过程强化产品从收纳到使用状态的仪式感。',
  },
  {
    at: 0.58,
    eyebrow: '03 / CONNECTION',
    title: '旋转接入气罐',
    subtitle: 'ROTARY GAS CONNECTION',
    copy: '炉体通过旋转方式与气罐快速连接，降低安装判断成本，让户外环境下的操作更稳定、更高效。',
  },
  {
    at: 0.78,
    eyebrow: '04 / IGNITION',
    title: '杠杆式压电点火',
    subtitle: 'LEVER PIEZOELECTRIC IGNITION',
    copy: '中部控制杆兼具操作识别与点火功能，橙色细节点强化交互提示，使用户能快速理解操作方向与使用状态。',
  },
  {
    at: 0.94,
    eyebrow: 'IGNIFIER / YUUYE',
    title: '露营野炊，\n自由不设限制。',
    subtitle: 'DESIGNED FOR THE OPEN AIR',
    copy: '从紧凑收纳到稳定展开，让一次点火成为进入自然的开始。',
  },
]

const glideChapters = [
  {
    title: '问题洞察',
    english: 'Problem Insight',
    summary: '多层家庭清洁存在断点，传统扫地机器人止步于平层，楼梯、转角与边缘区域仍依赖人工处理。',
    tags: ['多层住宅', '楼梯死角', '反馈缺失'],
    images: ['/project-02/story/page-2.webp'],
  },
  {
    title: '概念定义',
    english: 'Concept Definition',
    summary: 'GLIDE 轻伴面向多层家庭清洁场景，通过可变结构完成台阶与复杂空间适应，并以顶部交互头建立更温和的人机沟通。',
    tags: ['SUNWARD CARE PATH', '可变结构', '温和陪伴'],
    images: ['/project-02/story/page-3.webp'],
  },
  {
    title: '楼梯场景',
    english: 'Stair Scenario',
    summary: '产品通过可变支撑结构跨越阶梯边界，在台阶表面完成横向清洁与稳定移动。',
    tags: ['阶梯跨越', '横向清洁', '稳定支撑'],
    images: ['/project-02/story/page-4.webp'],
  },
  {
    title: '结构运动系统',
    english: 'Motion System',
    summary: '从初始状态到翻越完成，整套动作围绕台阶适应、横扫清洁与翻越逻辑展开。',
    tags: ['中臂提升', '横扫阶梯', '旋转双臂', '完成翻越'],
    images: ['/project-02/story/page-5.webp'],
  },
  {
    title: '移动端交互',
    english: 'App Interaction',
    summary: '通过移动端界面整合清洁地图、状态反馈、设备管理与陪伴互动，让用户获得更清晰的控制感。',
    tags: ['清洁地图', '状态反馈', '设备管理', '陪伴互动'],
    images: ['/project-02/story/page-6.webp'],
  },
  {
    title: '清洁场景',
    english: 'Cleaning Scenario',
    summary: '面向地毯、灰尘团与复杂地面环境，产品以更灵活的形态适应多样家庭表面。',
    tags: ['地毯清洁', '边缘覆盖', '复杂地面'],
    images: ['/project-02/story/page-7.webp'],
  },
  {
    title: '人机互动',
    english: 'Human-Computer Interaction',
    summary: '顶部交互头通过方向、表情与反馈建立情绪化沟通，使产品从清洁工具转向轻陪伴式家庭服务机器人。',
    tags: ['方向反馈', '情绪表达', '轻陪伴'],
    images: ['/project-02/story/page-8.webp'],
  },
  {
    title: '表情系统',
    english: 'Expression System',
    summary: '通过姿态、眼神与对话气泡的组合，建立一套更亲和、更具角色感的产品表情语言。',
    tags: ['开始干活', '你好，主人', '来抱一抱', '哇哦，真棒'],
    images: ['/project-02/story/page-9.webp', '/project-02/story/page-10.webp'],
  },
]

function framePath(frame) {
  return `/ignifier-sequence/frame_${String(frame).padStart(4, '0')}.webp`
}

function projectFromHash() {
  if (typeof window === 'undefined') return null
  if (window.location.hash === '#project-01') return 1
  if (window.location.hash === '#project-02') return 2
  return null
}

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg aria-hidden="true" className={`arrowIcon arrowIcon--${direction}`} viewBox="0 0 48 48">
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
      .to(videoRef.current, { scale: 0.985, duration: 0.3, ease: 'power2.inOut' })
      .to(root, { yPercent: -100, duration: 0.78, ease: 'power4.inOut' }, '-=0.06')
  }, [onComplete])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timeoutId = window.setTimeout(finish, 220)
      return () => window.clearTimeout(timeoutId)
    }
    videoRef.current?.play().catch(() => {})
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
      <button className="brandIntro__skip" type="button" onClick={finish}>SKIP <span>↗</span></button>
      <span className="brandIntro__edition">LIKE.DESIGN / 2026</span>
    </section>
  )
}

function Header() {
  return (
    <header className="siteHeader js-site-header">
      <a className="siteHeader__brand" href="#top" aria-label="返回首页">
        <img src="/assets/brand-logo.png" alt="来点设计实验室 LIKE.DESIGN LABORATORY" width="500" height="180" />
      </a>
      <nav aria-label="主导航">
        <a href="#projects">WORKS</a>
        <a href="#process">PROCESS</a>
        <a href="#awards">AWARDS</a>
      </nav>
      <a className="siteHeader__contact" href="#contact">CONTACT <span>↗</span></a>
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
    gsap.set(slides, { autoAlpha: 0, zIndex: 0 })
    gsap.set(activeSlide, { autoAlpha: 1, zIndex: 1 })
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .fromTo(activeSlide?.querySelector('.heroSlide__media'), { scale: 1.055 }, { scale: 1, duration: 1.45 })
      .fromTo(
        activeSlide?.querySelectorAll('.heroSlide__copy > *'),
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.72, stagger: 0.07 },
        '-=1',
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
          <article className={`heroSlide${index === activeIndex ? ' is-active' : ''}`} key={project.title} aria-hidden={index !== activeIndex}>
            <img className="heroSlide__media" src={project.heroImage ?? project.image} alt="" width="1600" height="900" fetchPriority={index === 0 ? 'high' : 'auto'} />
            <div className="heroSlide__wash" />
            <div className="heroSlide__copy">
              <span>{project.type}</span>
              <h1>{project.title}</h1>
              <p>{project.tags.join(' / ')}</p>
            </div>
          </article>
        ))}
      </div>
      <button className="heroArrow heroArrow--prev" type="button" aria-label="上一件作品" onClick={() => showSlide(activeIndex - 1)}>
        <ArrowIcon direction="left" />
      </button>
      <button className="heroArrow heroArrow--next" type="button" aria-label="下一件作品" onClick={() => showSlide(activeIndex + 1)}>
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
          ><span /></button>
        ))}
      </div>
      <a className="scrollCue" href="#projects"><span>SCROLL TO WORKS</span><i /></a>
    </section>
  )
}

function ScrollDock({ isReady }) {
  const rootRef = useRef(null)

  useGSAP(() => {
    if (!isReady) return undefined
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const glyphTween = gsap.fromTo(
        '.scrollDock__glyph',
        { y: -3, autoAlpha: 0.45 },
        { y: 5, autoAlpha: 1, duration: 0.82, ease: 'sine.inOut', repeat: -1, yoyo: true },
      )
      return () => glyphTween.kill()
    })
    return () => mm.revert()
  }, { scope: rootRef, dependencies: [isReady], revertOnUpdate: true })

  return (
    <a className="scrollDock" href="#projects" ref={rootRef} aria-label="向下滚动查看更多精选项目">
      <span className="scrollDock__icon" aria-hidden="true">
        <svg viewBox="0 0 30 42">
          <path className="scrollDock__trail" d="M15 7v18" />
          <path className="scrollDock__glyph" d="m10 22 5 5 5-5" />
        </svg>
      </span>
    </a>
  )
}

function ProjectCard({ project, index, onOpen }) {
  const open = () => onOpen(project, index)
  return (
    <article className="projectCard js-project-card">
      <button className="projectCard__hit" type="button" onClick={open} aria-label={`查看 ${project.title} 项目`} />
      <div className="projectCard__visual">
        <img src={project.cardImage ?? project.image} alt={`${project.title} 项目图`} width="1600" height="900" loading={index > 3 ? 'lazy' : 'eager'} />
        <span className="projectCard__index">{String(index + 1).padStart(2, '0')}</span>
        <span className="projectCard__view">{index < 2 ? 'SCROLL STORY' : 'VIEW PROJECT'} ↗</span>
      </div>
      <div className="projectCard__body">
        <div className="projectCard__heading">
          <div><p>{project.type}</p><h3>{project.title}</h3></div>
          <span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        </div>
        <div className="tagList">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <p className="projectCard__detail">{project.detail}</p>
      </div>
    </article>
  )
}

function ProjectModal({ selection, onClose }) {
  const modalRef = useRef(null)
  const { project, index } = selection

  useEffect(() => {
    const handleKeyDown = (event) => event.key === 'Escape' && onClose()
    document.body.classList.add('is-modal-open')
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('is-modal-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useGSAP(() => {
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .fromTo('.projectModal__backdrop', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
      .fromTo('.projectModal__panel', { yPercent: 100 }, { yPercent: 0, duration: 0.72 }, '-=0.16')
  }, { scope: modalRef })

  return (
    <div className="projectModal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <button className="projectModal__backdrop" type="button" aria-label="关闭项目" onClick={onClose} />
      <article className="projectModal__panel">
        <button className="projectModal__close" type="button" onClick={onClose} autoFocus>CLOSE <span>×</span></button>
        <div className="projectModal__media"><img src={project.image} alt={`${project.title} 项目主视觉`} width="1600" height="900" /></div>
        <div className="projectModal__content">
          <span>PROJECT {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <p>{project.type}</p>
          <h2 id="project-modal-title">{project.title}</h2>
          <div className="tagList">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <p className="projectModal__detail">{project.detail}</p>
        </div>
      </article>
    </div>
  )
}

function SelectedWorks({ onOpen }) {
  const rootRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.timeline({
      scrollTrigger: { trigger: '.worksHeading', start: 'top 82%', once: true },
      defaults: { ease: 'power4.out' },
    })
      .fromTo('.worksHeading__kicker', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 })
      .fromTo('.worksHeading h2', { y: 44, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.82 }, '-=0.38')
      .fromTo('.worksHeading__copy', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.62 }, '-=0.52')

    gsap.utils.toArray('.js-project-card').forEach((card) => {
      gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        defaults: { ease: 'power4.out' },
      })
        .fromTo(card, { y: 42 }, { y: 0, duration: 0.78 })
        .fromTo(card.querySelector('.projectCard__visual img'), { scale: 1.06 }, { scale: 1, duration: 1 }, '<')
    })
  }, { scope: rootRef })

  return (
    <section className="selectedWorks" id="projects" ref={rootRef}>
      <div className="worksHeading">
        <div><span className="worksHeading__kicker">01 / SELECTED WORKS</span><h2>精选项目</h2></div>
        <p className="worksHeading__copy">从场景洞察到形态推演，从建模渲染到完整表达，持续探索产品、人与环境之间更清晰的连接。</p>
      </div>
      <div className="projectGrid">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.title} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}

function DesignProcess() {
  const rootRef = useRef(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.processPanel__image img',
      { scale: 1.06 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      },
    )
  }, { scope: rootRef })

  return (
    <section className="designProcess" id="process" ref={rootRef}>
      <div className="sectionIntro sectionIntro--light">
        <span>02 / DESIGN PROCESS</span>
        <div><h2>从问题到原型，<br />让每一步都看得见。</h2><p>洞察、草图、结构验证与实物测试共同组成设计过程。我们在持续讨论与快速迭代中，寻找真正清晰的解决方案。</p></div>
      </div>
      <figure className="processPanel processPanel--primary">
        <div className="processPanel__image"><img src="/assets/studio-process.webp" alt="来点设计实验室项目工作与设计过程拼贴" width="1620" height="761" loading="lazy" /></div>
        <figcaption><span>FIELD NOTES / PROTOTYPING / CRITIQUE</span><p>真实的项目工作记录：从用户调研、需求分析、方案迭代，到模型验证与最终呈现。</p></figcaption>
      </figure>
      <figure className="processPanel processPanel--secondary">
        <div className="processPanel__image"><img src="/assets/studio-team-v2.webp" alt="来点设计团队与工作室学员合影" width="1620" height="761" loading="lazy" /></div>
        <figcaption><span>TEAM / COLLABORATION</span><p>由产品设计师与工作室学员组成的协作团队，在真实项目里共同讨论、验证与成长。</p></figcaption>
      </figure>
      <figure className="processPanel processPanel--team-group">
        <div className="processPanel__image"><img src="/assets/studio-team-group.webp" alt="来点设计实验室团队集体合影" width="1620" height="761" loading="lazy" /></div>
        <figcaption><span>LIKE.DESIGN / TOGETHER</span><p>让不同方向的判断汇聚在一起，把每一次合作变成更清晰的设计成果。</p></figcaption>
      </figure>
    </section>
  )
}

function AwardsGallery() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
      const getDistance = () => Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 72)
      const tween = gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: () => `+=${Math.max(getDistance() * 0.82, window.innerHeight * 1.4)}`,
          pin: stageRef.current,
          scrub: 0.65,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      return () => tween.kill()
    })
    return () => mm.revert()
  }, { scope: rootRef })

  return (
    <section className="awards" id="awards" ref={rootRef}>
      <div className="awardsStage" ref={stageRef}>
        <div className="awardsStage__header">
          <div><span>03 / RECOGNITION</span><h2>获奖与现场</h2></div>
          <p>{awardImages.length} RECENT AWARDS · 2023—2026</p>
        </div>
        <div className="awardsTrack" ref={trackRef}>
          <figure className="awardScene awardScene--wide">
            <img src="/assets/awards-ceremony-01-v2.webp" alt="来点设计实验室获奖奖杯与工作室现场" width="1279" height="1706" loading="lazy" />
            <figcaption><strong>AWARD HONORS</strong><span>DESIGN PRACTICE / STUDIO ARCHIVE</span></figcaption>
          </figure>
          <figure className="awardScene">
            <img src="/assets/awards-ceremony-02-v2.webp" alt="来点设计实验室 Better Design Award 获奖奖杯" width="1279" height="1706" loading="lazy" />
            <figcaption><strong>BETTER DESIGN AWARD</strong><span>BETTER DESIGN / BETTER FUTURE</span></figcaption>
          </figure>
          <div className="certificateGrid certificateGrid--portrait" aria-label="竖版获奖证书滚动画廊">
            {portraitAwardImages.map(({ src, index }) => (
              <figure className="certificateCard" key={src}>
                <img src={src} alt={`来点设计实验室获奖证书 ${index}`} width="1100" height="1500" loading="lazy" />
                <figcaption><span>{String(index).padStart(2, '0')}</span><span>AWARD ARCHIVE</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="certificateGrid certificateGrid--landscape" aria-label="横版获奖证书滚动画廊">
            {landscapeAwardImages.map(({ src, index }) => (
              <figure className="certificateCard certificateCard--landscape" key={src}>
                <img src={src} alt={`来点设计实验室获奖证书 ${index}`} width="1500" height="1060" loading="lazy" />
                <figcaption><span>{String(index).padStart(2, '0')}</span><span>AWARD ARCHIVE</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="certificateGrid certificateGrid--portrait" aria-label="新增竖版获奖证书滚动画廊">
            {addedPortraitAwardImages.map(({ src, index }) => (
              <figure className="certificateCard" key={src}>
                <img src={src} alt={`来点设计实验室获奖证书 ${index}`} width="1100" height="1500" loading="lazy" />
                <figcaption><span>{String(index).padStart(2, '0')}</span><span>AWARD ARCHIVE</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="certificateGrid certificateGrid--landscape" aria-label="新增横版获奖证书滚动画廊">
            {addedLandscapeAwardImages.map(({ src, index }) => (
              <figure className="certificateCard certificateCard--landscape" key={src}>
                <img src={src} alt={`来点设计实验室获奖证书 ${index}`} width="1500" height="1060" loading="lazy" />
                <figcaption><span>{String(index).padStart(2, '0')}</span><span>AWARD ARCHIVE</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="awardsTrack__end">
            <span>{awardImages.length} / {awardImages.length}</span>
            <strong>持续实践，<br />让成果发生。</strong>
            <p>KEEP MAKING · KEEP QUESTIONING</p>
          </div>
        </div>
        <div className="awardsStage__cue"><span>SCROLL TO EXPLORE</span><i /></div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="contactSection" id="contact">
      <div className="contactSection__copy">
        <span>04 / START A CONVERSATION</span>
        <h2>欢迎咨询，<br />让下一次突破<br />从这里开始。</h2>
        <p>作品咨询、设计合作与课程动态，欢迎通过电话、邮件或微信联系我们。</p>
        <dl>
          <div><dt>STUDIO</dt><dd>来点设计实验室</dd></div>
          <div><dt>PHONE</dt><dd><a href="tel:17868188688">178 6818 8688</a></dd></div>
          <div><dt>E-MAIL</dt><dd><a href="mailto:15119706728@163.com">15119706728@163.com</a></dd></div>
          <div><dt>梁老师</dt><dd><a href="tel:17868188688">178 6818 8688</a></dd></div>
          <div><dt>刘老师</dt><dd><a href="tel:15711858152">157 1185 8152</a>（微信同号）</dd></div>
        </dl>
      </div>
      <figure className="contactSection__card">
        <img src="/assets/contact-card.webp" alt="来点设计实验室微信二维码与联系信息" width="1198" height="1400" loading="lazy" />
        <figcaption>SCAN TO ADD WECHAT / 扫码添加微信</figcaption>
      </figure>
      <footer className="contactSection__footer">
        <img src="/assets/brand-logo.png" alt="来点设计实验室" width="500" height="180" />
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
    const setX = gsap.quickSetter(cursor, 'x', 'px')
    const setY = gsap.quickSetter(cursor, 'y', 'px')
    const move = (event) => {
      setX(event.clientX)
      setY(event.clientY)
    }
    const updateState = (event) => {
      cursor.classList.toggle('is-interactive', Boolean(event.target.closest('a, button, [role="button"]')))
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', updateState, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', updateState)
    }
  }, [])

  return <span className="customCursor" ref={cursorRef} aria-hidden="true" />
}

function DetailHeader({ number, onBack }) {
  return (
    <header className="detailHeader">
      <button type="button" onClick={onBack}>← <span>BACK TO WORKS</span></button>
      <span>LIKE.DESIGN / PROJECT {String(number).padStart(2, '0')}</span>
    </header>
  )
}

function IgnifierProject({ onBack }) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const progressRef = useRef(null)
  const stageIndexRef = useRef(0)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const imagesRef = useRef([])
  const lastRenderedFrameRef = useRef(-1)
  const animationFrameRef = useRef(0)
  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    let isMounted = true

    const updateCanvasSize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.round(window.innerWidth * dpr)
      const height = Math.round(window.innerHeight * dpr)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    const nearestLoadedFrame = (targetFrame) => {
      if (imagesRef.current[targetFrame]) return targetFrame
      for (let offset = 1; offset < 240; offset += 1) {
        const previous = targetFrame - offset
        const next = targetFrame + offset
        if (previous >= 0 && imagesRef.current[previous]) return previous
        if (next < 240 && imagesRef.current[next]) return next
      }
      return -1
    }

    const drawFrame = (targetFrame) => {
      const canvas = canvasRef.current
      const drawableFrame = nearestLoadedFrame(targetFrame)
      if (!canvas || drawableFrame < 0 || drawableFrame === lastRenderedFrameRef.current) return
      const image = imagesRef.current[drawableFrame]
      const context = canvas.getContext('2d')
      updateCanvasSize()

      const imageWidth = image.naturalWidth || image.width
      const imageHeight = image.naturalHeight || image.height
      const scale = Math.min(canvas.width / imageWidth, canvas.height / imageHeight)
      const width = imageWidth * scale
      const height = imageHeight * scale
      const x = (canvas.width - width) / 2
      const y = (canvas.height - height) / 2

      context.fillStyle = '#d3d3d1'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
      context.drawImage(image, x, y, width, height)
      lastRenderedFrameRef.current = drawableFrame
    }

    const loadFrame = (index) => {
      if (imagesRef.current[index]) return Promise.resolve(imagesRef.current[index])
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.decoding = 'async'
        image.onload = () => {
          if (!isMounted) return
          imagesRef.current[index] = image
          if (index === 0) drawFrame(0)
          resolve(image)
        }
        image.onerror = reject
        image.src = framePath(index + 1)
      })
    }

    const preloadFrames = async () => {
      try {
        await loadFrame(0)
        await Promise.all(Array.from({ length: 60 }, (_, index) => index + 1).map(loadFrame))

        const remainingFrames = Array.from({ length: 179 }, (_, index) => index + 61)
        let cursor = 0
        const workers = Array.from({ length: 10 }, async () => {
          while (cursor < remainingFrames.length && isMounted) {
            const frameIndex = remainingFrames[cursor]
            cursor += 1
            await loadFrame(frameIndex)
          }
        })
        await Promise.all(workers)
      } catch (error) {
        console.error('Failed to preload IGNIFIER sequence frames', error)
      }
    }

    const animate = () => {
      const target = Math.min(Math.max(targetProgressRef.current, 0), 1)
      const delta = target - currentProgressRef.current
      const smoothing = Math.abs(delta) > 0.12 ? 0.2 : 0.12
      currentProgressRef.current = Math.abs(delta) < 0.0005
        ? target
        : currentProgressRef.current + delta * smoothing

      const progress = currentProgressRef.current
      drawFrame(Math.round(progress * 239))

      let nextStage = 0
      ignifierStages.forEach((stage, index) => {
        if (progress >= stage.at) nextStage = index
      })
      if (nextStage !== stageIndexRef.current) {
        stageIndexRef.current = nextStage
        setStageIndex(nextStage)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      updateCanvasSize()
      lastRenderedFrameRef.current = -1
      drawFrame(Math.round(currentProgressRef.current * 239))
    }

    updateCanvasSize()
    preloadFrames()
    animationFrameRef.current = requestAnimationFrame(animate)
    window.addEventListener('resize', handleResize)

    return () => {
      isMounted = false
      cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useGSAP(() => {
    const update = (progress) => {
      targetProgressRef.current = progress
      if (progressRef.current) progressRef.current.style.setProperty('--detail-progress', progress)
    }
    const trigger = ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => update(self.progress),
    })
    update(0)
    return () => trigger.kill()
  }, { scope: rootRef })

  const stage = ignifierStages[stageIndex]

  return (
    <main className="detailPage detailPage--ignifier">
      <section className="ignifierScroll" ref={rootRef}>
        <div className="ignifierScroll__sticky">
          <div className="ignifierScroll__chrome">
            <button type="button" onClick={onBack}>← <span>BACK TO WORKS</span></button>
            <span>LIKE.DESIGN / PROJECT 01</span>
          </div>
          <canvas
            ref={canvasRef}
            className="ignifierScroll__canvas"
            aria-label="IGNIFIER outdoor stove scroll animation"
          />
          <div className="ignifierScroll__vignette" aria-hidden="true" />
          <div className={`ignifierScroll__copy ignifierScroll__copy--${stageIndex}`} key={stage.eyebrow}>
            <span>{stage.eyebrow}</span>
            <h1>{stage.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
            {stageIndex === 0 && <strong>{stage.subtitle}</strong>}
            {stage.english && <em>{stage.english}</em>}
            <p>{stage.copy}</p>
          </div>
          <div className="ignifierScroll__progress" ref={progressRef} aria-hidden="true"><i /></div>
        </div>
      </section>
    </main>
  )
}

function GlideProject({ onBack }) {
  const storyRef = useRef(null)
  const ringRef = useRef(null)
  const percentRef = useRef(null)
  const activeRef = useRef(0)
  const [activeChapter, setActiveChapter] = useState(0)

  useGSAP(() => {
    const update = (progress) => {
      const index = Math.min(glideChapters.length - 1, Math.floor(progress * glideChapters.length))
      if (ringRef.current) ringRef.current.style.setProperty('--story-progress', `${Math.round(progress * 100)}%`)
      if (percentRef.current) percentRef.current.textContent = `${Math.round(progress * 100)}%`
      if (index !== activeRef.current) {
        activeRef.current = index
        setActiveChapter(index)
      }
    }
    const trigger = ScrollTrigger.create({
      trigger: storyRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => update(self.progress),
    })
    update(0)
    return () => trigger.kill()
  }, { scope: storyRef })

  const chapter = glideChapters[activeChapter]

  return (
    <main className="detailPage detailPage--glide">
      <DetailHeader number={2} onBack={onBack} />
      <section className="glideHero">
        <img src="/project-02/story/page-1.webp" alt="GLIDE 轻伴扫拖机器人项目主视觉" width="1800" height="1013" />
        <div className="glideHero__copy">
          <span>PROJECT 02</span>
          <h1>GLIDE 轻伴</h1>
          <p>轻陪伴式扫拖机器人设计</p>
          <strong>LIGHT COMPANION CLEANING ROBOT</strong>
        </div>
        <a href="#glide-story">SCROLL TO STORY ↓</a>
      </section>
      <section className="glideStory" id="glide-story" ref={storyRef}>
        <div className="glideStory__sticky">
          <aside className="glideStory__meta">
            <span>PROJECT 02</span>
            <strong>GLIDE-轻伴</strong>
            <em>{String(activeChapter + 1).padStart(2, '0')} / {String(glideChapters.length).padStart(2, '0')}</em>
            <h2>{chapter.title}</h2>
            <p>{chapter.english}</p>
          </aside>
          <div className={`glideStory__media${chapter.images.length > 1 ? ' is-double' : ''}`}>
            {chapter.images.map((src) => <img key={src} src={src} alt={`${chapter.title}设计展示`} width="1800" height="1013" />)}
          </div>
          <div className="glideStory__caption" key={chapter.title}>
            <span>{chapter.english}</span>
            <p>{chapter.summary}</p>
            <div>{chapter.tags.map((tag) => <i key={tag}>{tag}</i>)}</div>
          </div>
          <div className="storyRing" ref={ringRef}>
            <span ref={percentRef}>0%</span>
            <small>SCROLL STORY</small>
          </div>
          <span className="glideStory__counter">{String(activeChapter + 1).padStart(2, '0')} / {String(glideChapters.length).padStart(2, '0')}</span>
        </div>
      </section>
    </main>
  )
}

function HomePage({ introComplete, onIntroComplete, onOpenProject }) {
  const homeRef = useRef(null)

  useGSAP(() => {
    if (!introComplete) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.js-site-header', { autoAlpha: 1 })
      return
    }
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .fromTo('.js-site-header', { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.82 })
      .fromTo(
        '.heroArrow, .heroCounter, .heroProgress, .scrollCue',
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.62, stagger: 0.05 },
        '-=0.46',
      )
  }, { scope: homeRef, dependencies: [introComplete], revertOnUpdate: true })

  return (
    <>
      {!introComplete && <BrandIntro onComplete={onIntroComplete} />}
      <main className="siteShell" ref={homeRef} aria-hidden={!introComplete}>
        <a className="skipLink" href="#projects">跳到精选项目</a>
        <Header />
        <HeroCarousel isReady={introComplete} />
        <ScrollDock isReady={introComplete} />
        <SelectedWorks onOpen={onOpenProject} />
        <SketchArchive />
        <DesignProcess />
        <AwardsGallery />
        <ContactSection />
        <CustomCursor />
      </main>
    </>
  )
}

export default function Home() {
  const initialProject = projectFromHash()
  const [introComplete, setIntroComplete] = useState(Boolean(initialProject))
  const [activeProject, setActiveProject] = useState(initialProject)
  const [selection, setSelection] = useState(null)

  useEffect(() => {
    const handleHash = () => {
      const project = projectFromHash()
      setActiveProject(project)
      if (project) {
        setIntroComplete(true)
        window.scrollTo(0, 0)
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const openProject = useCallback((project, index) => {
    if (index < 2) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      window.history.pushState({}, '', `#project-0${index + 1}`)
      setActiveProject(index + 1)
      setIntroComplete(true)
      return
    }
    setSelection({ project, index })
  }, [])

  const backToWorks = useCallback(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    window.history.pushState({}, '', '#projects')
    setActiveProject(null)
    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ block: 'start' })
      ScrollTrigger.refresh()
    }, 40)
  }, [])

  if (activeProject === 1) return <><IgnifierProject onBack={backToWorks} /><CustomCursor /></>
  if (activeProject === 2) return <><GlideProject onBack={backToWorks} /><CustomCursor /></>

  return (
    <>
      <HomePage
        introComplete={introComplete}
        onIntroComplete={() => setIntroComplete(true)}
        onOpenProject={openProject}
      />
      {selection && <ProjectModal selection={selection} onClose={() => setSelection(null)} />}
    </>
  )
}
