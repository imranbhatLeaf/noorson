import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { inquiryAPI } from '../services/api'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import goatImg from '../assets/images/goat.jpeg'
import connectionImg from '../assets/images/c5.jpeg'

gsap.registerPlugin(ScrollTrigger)

const Connections = () => {
  const sectionRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const imgColRef = useRef(null)
  const badgeRef = useRef(null)
  const dividerRef = useRef(null)
  const formIntroRef = useRef(null)
  const formRef = useRef(null)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interestType: '',
    message: ''
  })
  
  const [status, setStatus] = useState({ loading: false, success: false, error: null })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null })

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        interest: `Type: ${formData.interestType}\nMessage: ${formData.message}`
      }

      await inquiryAPI.sendInquiry(payload)
      setStatus({ loading: false, success: true, error: null })
      setFormData({ firstName: '', lastName: '', email: '', phone: '', interestType: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus(s => ({ ...s, success: false })), 5000)
    } catch (error) {
      console.error('Inquiry submission failed:', error)
      setStatus({ 
        loading: false, 
        success: false, 
        error: error.response?.data?.message || 'Something went wrong. Please try again.' 
      })
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading lines
      gsap.fromTo(
        [line1Ref.current, line2Ref.current],
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: line1Ref.current, start: 'top 82%' },
        }
      )

      // Description + CTA
      gsap.fromTo(
        [descRef.current, ctaRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out', delay: 0.3,
          scrollTrigger: { trigger: descRef.current, start: 'top 85%' },
        }
      )

      // Image column
      gsap.fromTo(
        imgColRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: imgColRef.current, start: 'top 80%' },
        }
      )

      // Badge
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)', delay: 0.4,
          scrollTrigger: { trigger: imgColRef.current, start: 'top 75%' },
        }
      )

      // Divider
      gsap.fromTo(
        dividerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: dividerRef.current, start: 'top 85%' },
        }
      )

      // Form intro
      gsap.fromTo(
        formIntroRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: formIntroRef.current, start: 'top 80%' },
        }
      )

      // Form fields stagger
      if (formRef.current) {
        const children = formRef.current.querySelectorAll('.form-field, .btn-submit')
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 78%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-brand-cream overflow-x-hidden">
      <div className="container mx-auto px-6">

        {/* ── TOP ROW ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-12 mb-32 md:mb-24">

          {/* Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 overflow-hidden">
              <span ref={line1Ref} className="block opacity-0">From Kashmir,</span>
              <span ref={line2Ref} className="block opacity-0">To the World</span>
            </h2>
            <p ref={descRef} className="text-lg mb-6 text-brand-black/70 leading-relaxed opacity-0">
              Weaving generations of artistry into every thread, Noorson represents the soul of Kashmiri craftsmanship.
            </p>
            <button
              ref={ctaRef}
              className="px-8 py-4 border border-brand-black flex items-center gap-4 hover:bg-brand-gold hover:text-brand-black transition-all group opacity-0"
            >
              <span className="uppercase tracking-[0.2em] text-sm font-medium">Connect Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Image */}
          <div ref={imgColRef} className="w-full md:w-1/2 relative opacity-0 pb-16 md:pb-12">
            <img
              src={connectionImg}
              alt="Kashmir Landscape"
              className="w-full h-[400px] md:h-[550px] object-cover grayscale"
            />
            {/* Goat image overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 w-36 md:w-56 aspect-square border-[6px] md:border-[10px] border-brand-cream shadow-2xl z-20 overflow-hidden"
            >
              <img 
                src={goatImg} 
                alt="Changthangi Goat" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div
              ref={badgeRef}
              className="absolute -bottom-16 right-0 md:-right-12 bg-brand-gold p-6 md:p-8 w-[240px] md:w-[300px] shadow-2xl opacity-0 z-30"
            >
              <h3 className="text-brand-black font-serif text-xl md:text-2xl mb-2">Since 1960</h3>
              <p className="text-brand-black/80 text-[11px] md:text-sm font-light">
                Serving connoisseurs of luxury for over six decades with authentic, hand-crafted Pashmina.
              </p>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div ref={dividerRef} className="flex items-center gap-6 mb-16 opacity-0">
          <div className="flex-1 h-px bg-brand-gold opacity-40" />
          <span className="font-serif text-2xl md:text-3xl font-light italic whitespace-nowrap">Get in Touch</span>
          <div className="flex-1 h-px bg-brand-gold opacity-40" />
        </div>

        {/* ── FORM ROW ── */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">

          {/* Form intro */}
          <div ref={formIntroRef} className="w-full md:w-5/12 opacity-0">
            <h3 className="font-serif text-3xl md:text-4xl font-light leading-snug mb-4">
              Begin a Conversation<br />with Noorson
            </h3>
            <p className="text-brand-black/65 text-sm leading-relaxed mb-6">
              Whether you seek a bespoke piece or wish to explore our heritage collection, we'd love to hear from you.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'connect@noorson.com' },
                { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: '+91 (194) 247-0000' },
                { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Srinagar, Kashmir, India' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm text-brand-black/60">
                  <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path d={icon} />
                  </svg>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form 
            ref={formRef} 
            onSubmit={handleSubmit}
            className="w-full md:w-7/12 flex flex-col gap-5"
          >
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="form-field relative">
                <label className="block text-[0.65rem] uppercase tracking-widest text-brand-black/50 mb-1 font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Aanya"
                  className="w-full bg-transparent border-b border-brand-black/20 py-2 text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-black/25"
                />
              </div>
              <div className="form-field relative">
                <label className="block text-[0.65rem] uppercase tracking-widest text-brand-black/50 mb-1 font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Sharma"
                  className="w-full bg-transparent border-b border-brand-black/20 py-2 text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-black/25"
                />
              </div>
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="form-field relative">
                <label className="block text-[0.65rem] uppercase tracking-widest text-brand-black/50 mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-b border-brand-black/20 py-2 text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-black/25"
                />
              </div>
              <div className="form-field relative">
                <label className="block text-[0.65rem] uppercase tracking-widest text-brand-black/50 mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  className="w-full bg-transparent border-b border-brand-black/20 py-2 text-sm outline-none focus:border-brand-gold transition-colors placeholder:text-brand-black/25"
                />
              </div>
            </div>

            {/* Interest */}
            <div className="form-field relative">
              <label className="block text-[0.65rem] uppercase tracking-widest text-brand-black/50 mb-1 font-medium">Interest</label>
              <select 
                name="interestType"
                required
                value={formData.interestType}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-brand-black/20 py-2 text-sm outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer text-brand-black/70"
              >
                <option value="" disabled>Select your interest</option>
                <option value="Pashmina Shawls">Pashmina Shawls</option>
                <option value="Bespoke Orders">Bespoke Orders</option>
                <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                <option value="Heritage Collection">Heritage Collection</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div className="form-field relative">
              <label className="block text-[0.65rem] uppercase tracking-widest text-brand-black/50 mb-1 font-medium">Message</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us what you're looking for…"
                className="w-full bg-transparent border-b border-brand-black/20 py-2 text-sm outline-none focus:border-brand-gold transition-colors resize-none placeholder:text-brand-black/25"
              />
            </div>

            {/* Status Messages */}
            {status.error && (
              <p className="text-red-500 text-xs italic">{status.error}</p>
            )}
            
            {status.success && (
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Message sent! We'll contact you shortly.</span>
              </div>
            )}

            {/* Submit */}
            <button 
              type="submit"
              disabled={status.loading}
              className="btn-submit self-start flex items-center gap-4 px-8 py-4 bg-brand-black text-brand-cream hover:bg-brand-gold hover:text-brand-black disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
            >
              {status.loading ? (
                <>
                  <span className="uppercase tracking-[0.2em] text-xs font-medium">Sending...</span>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  <span className="uppercase tracking-[0.2em] text-xs font-medium">Send Message</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}

export default Connections