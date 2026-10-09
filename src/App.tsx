import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import doctorPortrait from './assets/doctor-portrait.jpg'
import heroPortrait from './assets/dra.png'
import medicalPortrait from './assets/med.png'
import aureLogo from './assets/aure.png'
import vowLogo from './assets/logo.png'
import resultOne from './assets/1.jpeg'
import resultTwo from './assets/2.jpeg'
import resultThree from './assets/3.jpeg'
import whatsappIcon from './assets/whatsapp.png'
import postOne from './assets/instagram/DZFuXkkxMFy.jpg'
import postTwo from './assets/instagram/DZDJjLJRLyL.jpg'
import postThree from './assets/instagram/DZ5HZauyYYl.jpg'
import postFour from './assets/instagram/DXEqgqLEVFy.jpg'
import postFive from './assets/instagram/DX9dpq8R1_I.jpg'
import postSix from './assets/instagram/DZlQDY9pdco.jpg'
import videoOne from './assets/instagram/optimized/DZFuXkkxMFy.mp4'
import videoTwo from './assets/instagram/optimized/DZDJjLJRLyL.mp4'
import videoThree from './assets/instagram/optimized/DZ5HZauyYYl.mp4'
import videoFour from './assets/instagram/optimized/DXEqgqLEVFy.mp4'
import videoFive from './assets/instagram/optimized/DX9dpq8R1_I.mp4'
import videoSix from './assets/instagram/optimized/DZlQDY9pdco.mp4'

gsap.registerPlugin(ScrollTrigger)

const contactNumber = '5511971040525'
const mapsEmbedUrl = 'https://www.google.com/maps?q=Rua%20Jos%C3%A9%20Maria%20Lisboa%2C%20860%2C%20Jardim%20Paulista%2C%20S%C3%A3o%20Paulo%2C%20SP&output=embed'
const instagramPosts = ['DZFuXkkxMFy', 'DZDJjLJRLyL', 'DZ5HZauyYYl', 'DXEqgqLEVFy', 'DX9dpq8R1_I', 'DZlQDY9pdco']
const instagramCovers = [postOne, postTwo, postThree, postFour, postFive, postSix]
const instagramVideos = [videoOne, videoTwo, videoThree, videoFour, videoFive, videoSix]
const instagramCarouselPosts = instagramPosts
const questions = [
  { question: 'Quem pode fazer transplante capilar?', answer: 'A indicação depende de uma avaliação médica individual. É preciso entender a causa da perda capilar, o estado do couro cabeludo, a área doadora e as expectativas de cada pessoa.' },
  { question: 'Como funciona o procedimento?', answer: 'O planejamento define a estratégia mais adequada para o caso. Se houver indicação, a equipe explica as etapas do procedimento, os cuidados necessários e o acompanhamento previsto.' },
  { question: 'Como é o período de recuperação?', answer: 'A recuperação varia de pessoa para pessoa. As orientações sobre higienização, atividades e retorno à rotina são dadas conforme a avaliação e a evolução individual.' },
  { question: 'Quando os resultados começam a aparecer?', answer: 'A evolução capilar é gradual e depende de fatores individuais. Na consulta, a médica explica o que pode ser esperado em cada etapa, sem garantir um resultado específico.' },
  { question: 'O transplante capilar é indicado para mulheres?', answer: 'Em alguns casos, sim. A investigação da causa da queda é especialmente importante para definir se um procedimento é adequado ou se outro cuidado deve vir primeiro.' },
  { question: 'Como agendar uma avaliação?', answer: 'Basta tocar em um dos botões de WhatsApp nesta página. A equipe da Auré Medical orienta os horários e os próximos passos para sua consulta.' },
]

type TrackingWindow = Window & { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void }

function trackEvent(name: string, source: string) {
  const analyticsWindow = window as TrackingWindow
  const data = { event: name, event_category: 'engagement', event_label: source, location: source }
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
  analyticsWindow.dataLayer.push(data)
  analyticsWindow.gtag?.('event', name, { event_category: 'engagement', event_label: source })
}

function whatsappUrl(source: string) {
  const params = new URLSearchParams(window.location.search)
  const campaign = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .map((key) => params.get(key) ? `${key}=${params.get(key)}` : '')
    .filter(Boolean).join(' | ')
  const message = `Olá! Vim pela landing page da Auré Medical e gostaria de agendar uma avaliação capilar com a Dra. Raquel Borges.${campaign ? ` Origem: ${campaign}.` : ''}`
  trackEvent('whatsapp_click', source)
  return `https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}`
}

function ArrowIcon({ diagonal = true }: { diagonal?: boolean }) {
  return diagonal
    ? <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 16 16 4M6 4h10v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
    : <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Brand({ inverse = false, compact = false, label = '' }: { inverse?: boolean; compact?: boolean; label?: string }) {
  const external = inverse && !label
  return <a href={external ? 'https://auremedical.com.br/' : '#inicio'} className={`brand ${inverse ? 'brand-inverse' : ''}`} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} aria-label="Auré Medical">{!inverse && <span className="brand-symbol" aria-hidden="true">a<span>uré</span></span>}{label ? <span className="brand-header-label">{label}</span> : !compact && <span className="brand-words"><img className="brand-logo" src={aureLogo} alt="auré medical" />{inverse && <span className="brand-doctor-name">DRA. RAQUEL BORGES</span>}</span>}</a>
}

function SectionTag({ index, children, light = false }: { index: string; children: string; light?: boolean }) {
  const displayIndex = /^\d{2}$/.test(index) ? String(Number(index) + 1).padStart(2, '0') : index
  return <div className={`section-tag ${light ? 'section-tag-light' : ''}`}><span>{displayIndex}</span><i />{children}</div>
}

function WhatsAppButton({ children, source, light = false }: { children: string; source: string; light?: boolean }) {
  return <a className={`cta-button ${light ? 'cta-button-light' : ''}`} href={`https://wa.me/${contactNumber}`} onClick={(event) => { event.currentTarget.href = whatsappUrl(source) }} target="_blank" rel="noopener noreferrer"><img className="whatsapp-button-icon" src={whatsappIcon} alt="" aria-hidden="true" /><span>{children}</span><ArrowIcon /></a>
}

function InstagramCarousel() {
  const rail = useRef<HTMLDivElement>(null)
  const [active] = useState(0)

  useEffect(() => {
    const element = rail.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let lastTime = performance.now()
    let paused = false
    const pause = () => { paused = true }
    const resume = () => { paused = false }
    const recycleCards = () => {
      const viewportLeft = element.getBoundingClientRect().left
      const gap = Number.parseFloat(getComputedStyle(element).gap || '0')
      let first = element.firstElementChild as HTMLElement | null
      while (first && first.getBoundingClientRect().right <= viewportLeft) {
        const cardWidth = first.getBoundingClientRect().width + gap
        element.appendChild(first)
        element.scrollLeft -= cardWidth
        first = element.firstElementChild as HTMLElement | null
      }
    }
    const tick = (time: number) => {
      const delta = Math.min(time - lastTime, 50)
      lastTime = time
      if (!paused && !document.hidden && element.scrollWidth > element.clientWidth) {
        element.scrollLeft += delta * 0.055
        recycleCards()
      }
      frame = requestAnimationFrame(tick)
    }
    element.addEventListener('mouseenter', pause)
    element.addEventListener('mouseleave', resume)
    element.addEventListener('touchstart', pause, { passive: true })
    element.addEventListener('touchend', resume, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('mouseenter', pause)
      element.removeEventListener('mouseleave', resume)
      element.removeEventListener('touchstart', pause)
      element.removeEventListener('touchend', resume)
    }
  }, [])

  function updatePosition() {}

  return <div className="instagram-block" data-reveal><div className="instagram-heading"><div><span className="micro-label">Acompanhe de perto</span><h3>Na prática, em cada detalhe<span>.</span></h3><p>Conteúdo e bastidores da Dra. Raquel Borges no Instagram.</p></div><div className="carousel-controls" aria-label="Controles do Instagram"><span>{String(active + 1).padStart(2, '0')}<em>/</em>{String(instagramPosts.length).padStart(2, '0')}</span><button type="button" aria-label="Publicação anterior" onClick={() => rail.current?.scrollBy({ left: -350, behavior: 'smooth' })}>←</button><button type="button" aria-label="Próxima publicação" onClick={() => rail.current?.scrollBy({ left: 350, behavior: 'smooth' })}>→</button></div></div><div className="instagram-rail" ref={rail} onScroll={updatePosition} aria-label="Publicações do Instagram">{instagramCarouselPosts.map((id, index) => { const postIndex = index % instagramPosts.length; return <article className="instagram-card" key={`${id}-${index}`}><a className="instagram-tile" href={`https://www.instagram.com/p/${id}/`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('instagram_post_click', id)} aria-label={`Abrir publicação ${postIndex + 1} no Instagram`}><video src={instagramVideos[postIndex]} poster={instagramCovers[postIndex]} autoPlay muted loop playsInline preload="metadata" onLoadedData={(event) => { event.currentTarget.play().catch(() => undefined) }} aria-label={`Vídeo da publicação ${postIndex + 1} da Dra. Raquel Borges`} /></a></article> })}</div></div>
}

function App() {
  const site = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const scope = gsap.context(() => {
      gsap.from('.hero-enter', { y: 28, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.12 })
      gsap.fromTo('.hero-photo', { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1.055, duration: 1.3, ease: 'power2.out' })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 87%', end: 'bottom 18%', toggleActions: 'play reverse play reverse' } })
      })
    }, site)
    return () => scope.revert()
  }, [])

  return <div ref={site} className="site-root"><header className="site-header shell"><div className="header-left"><Brand compact label="DRA. RAQUEL BORGES" /><nav className={`main-nav ${menuOpen ? 'main-nav-open' : ''}`} aria-label="Navegação principal"><a href="#sobre" onClick={() => setMenuOpen(false)}>A médica</a><a href="#resultados" onClick={() => setMenuOpen(false)}>Resultados</a><a href="#instagram" onClick={() => setMenuOpen(false)}>Instagram</a><a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a><a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a></nav></div><div className="header-actions"><button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div></header>
    <main>
      <section id="inicio" className="hero shell"><div className="hero-content"><div className="hero-enter"><SectionTag index="AURÉ MEDICAL">TRANSPLANTE CAPILAR</SectionTag></div><h1 className="hero-enter">Naturalidade começa com um <em>planejamento capilar individualizado.</em></h1><p className="hero-lead hero-enter">Transplante capilar com avaliação criteriosa, planejamento individual e atenção ao que faz você ser você.</p><div className="hero-enter hero-buttons"><WhatsAppButton source="hero" light>Agendar minha avaliação</WhatsAppButton></div><div className="hero-proof hero-enter"><span className="proof-line" /><p>CIÊNCIA, ESCUTA E NATURALIDADE<br /><strong>COM DRA. RAQUEL BORGES</strong></p></div></div><div className="hero-visual"><img className="hero-photo" src={heroPortrait} alt="Dra. Raquel Borges, médica da Auré Medical" fetchPriority="high" /></div></section>

      <section id="sobre" className="about shell"><div className="about-intro" data-reveal><SectionTag index="01">QUEM CUIDA DE VOCÊ</SectionTag><h2>Antes de pensar em fios,<br />é preciso <em>olhar para você.</em></h2></div><div className="about-layout"><div className="about-portrait" data-reveal><img src={medicalPortrait} alt="Dra. Raquel Borges durante um atendimento médico" loading="lazy" /><div className="photo-index">01 <span>—</span> UMA MEDICINA MAIS PRÓXIMA</div></div><div className="about-text" data-reveal><span className="micro-label">DRA. RAQUEL BORGES</span><h3>Precisão médica.<br /><em>Presença humana.</em></h3><p>Na Auré Medical, a Dra. Raquel Borges conduz o cuidado em saúde capilar a partir de uma premissa simples: entender a pessoa antes de definir o procedimento.</p><p>A avaliação considera o histórico, a causa da perda dos fios, a área doadora e as suas expectativas. Essa escuta orienta decisões claras, responsáveis e realmente individualizadas.</p><div className="doctor-credentials"><div><span>REGISTROS PROFISSIONAIS</span><strong>CRM/SP 252636<br />CRM/PA 21355</strong></div><div className="credential-monogram">RB</div></div><WhatsAppButton source="sobre">Agendar minha avaliação</WhatsAppButton></div></div></section>

      <section id="resultados" className="results-section shell"><div className="results" data-reveal><div className="results-heading"><div><SectionTag index="02">RESULTADOS CAPILARES</SectionTag><h3>Cada história tem<br />seu próprio <em>tempo.</em></h3></div><p>Imagens de casos compartilhadas pela equipe. A resposta a qualquer tratamento varia entre pacientes; estas fotos não representam garantia de resultado.</p></div><div className="results-grid"><figure><img src={resultTwo} alt="Registro comparativo de evolução capilar, caso 1" loading="lazy" /></figure><figure><img src={resultOne} alt="Registro comparativo de evolução capilar, caso 2" loading="lazy" /></figure><figure><img src={resultThree} alt="Registro comparativo de evolução capilar, caso 3" loading="lazy" /></figure></div></div></section>

      <section id="instagram" className="instagram-section shell"><InstagramCarousel /></section>

      <section id="duvidas" className="faq shell"><div className="faq-header" data-reveal><SectionTag index="03">PERGUNTAS FREQUENTES</SectionTag><h2>Clareza para decidir<br /><em>com confiança.</em></h2><p>Algumas respostas ajudam a começar. A sua avaliação é onde as respostas se tornam pessoais.</p></div><div className="faq-list" data-reveal>{questions.map((item, index) => <div className={`faq-item ${openFaq === index ? 'faq-open' : ''}`} key={item.question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.question}</strong><i aria-hidden="true">{openFaq === index ? '−' : '+'}</i></button><div className="faq-answer" id={`faq-answer-${index}`}><div><p>{item.answer}</p></div></div></div>)}</div></section>

      <section id="contato" className="closing shell"><div className="closing-content" data-reveal><SectionTag index="04">SEU PRÓXIMO PASSO</SectionTag><h2>Seu próximo capítulo começa com uma <em>boa conversa.</em></h2><p>Converse com a equipe da Auré Medical e agende uma avaliação capilar com a Dra. Raquel Borges.</p><WhatsAppButton source="final" light>Agendar minha avaliação</WhatsAppButton><small>ATENDIMENTO EM SÃO PAULO · JARDIM PAULISTA</small></div></section>
    </main>
    <section className="map-section" aria-label="Localização da Auré Medical"><iframe src={mapsEmbedUrl} title="Mapa da localização da Auré Medical no Jardim Paulista" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></section>
    <footer className="site-footer shell"><div className="footer-main"><div><Brand inverse /><p>Medicina próxima. Visão inteira.<br />Cuidado capilar com ciência, escuta e naturalidade.</p></div><div><span>EXPLORE</span><a href="#sobre">A médica</a><a href="#resultados">Resultados</a><a href="#instagram">Instagram</a><a href="#duvidas">Dúvidas</a><a href="#contato">Contato</a></div><div><span>CONTATO</span><a href="https://maps.google.com/?q=Rua+Jose+Maria+Lisboa+860+Jardim+Paulista+Sao+Paulo" target="_blank" rel="noopener noreferrer">Rua José Maria Lisboa, 860 · 4º andar<br />Jardim Paulista, São Paulo/SP</a><a href={`https://wa.me/${contactNumber}`} onClick={(event) => { event.currentTarget.href = whatsappUrl('footer') }} target="_blank" rel="noopener noreferrer">+55 (11) 97104-0525</a><a href="https://www.instagram.com/raquelborges.dra/" target="_blank" rel="noopener noreferrer">@raquelborges.dra ↗</a></div></div><div className="footer-bottom"><span>© 2026 AURÉ MEDICAL · CNPJ 60.519.638/0001-65</span><span>DRA. RAQUEL BORGES · CRM/SP 252636 · CRM/PA 21355</span><span>CONTEÚDO INFORMATIVO. NÃO SUBSTITUI CONSULTA MÉDICA.</span><span>Desenvolvido por <a className="footer-credit" href="https://sites.vowdigital.com.br" target="_blank" rel="noopener noreferrer" aria-label="Vow Digital"><img className="footer-credit-logo" src={vowLogo} alt="Vow Digital" /></a></span></div></footer>
    <WhatsAppFloat />
  </div>
}

function WhatsAppFloat() {
  return <a className="whatsapp-float" href={`https://wa.me/${contactNumber}`} onClick={(event) => { event.currentTarget.href = whatsappUrl('floating') }} target="_blank" rel="noopener noreferrer" aria-label="Agendar minha avaliação"><img src={whatsappIcon} alt="" aria-hidden="true" /><span>Agendar minha avaliação</span></a>
}

export default App
