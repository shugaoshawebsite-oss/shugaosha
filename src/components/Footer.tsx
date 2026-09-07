import Link from 'next/link'
import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'

interface FooterProps {
  locale: 'en' | 'zh'
}

export default function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale)

  return (
    <footer className="bg-[#1a1b1e] text-white/90 pt-16 pb-12 sm:pt-20 sm:pb-16 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-8 md:pb-12 border-b border-white/10">
          
          {/* Brand & Social Media block */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 sm:space-y-4">
            <Link href={`/${locale}`} className="flex items-center justify-center md:justify-start">
              <Image
                src="/images/logo_dark.svg"
                alt="Shugaosha Logo"
                width={200}
                height={40}
                className="w-[150px] md:w-[200px] h-auto object-contain"
              />
            </Link>
            <p className="text-sm font-light text-white/60 max-w-xs mx-auto md:mx-0 leading-relaxed">
              {locale === 'en' 
                ? 'Supporting balance, alignment, confidence and a more lifted, refined appearance through precise, hands-on facial correction.'
                : '透過精準的徒手面部矯正，支持面部平衡、對齊、自信，以及更提升細緻的外觀。'}
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-1 justify-center md:justify-start">
              <a
                href="https://www.facebook.com/shugaosha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white/85 hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/shugaosha"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white/85 hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links / Menu block */}
          <div className="flex flex-col items-center md:items-start space-y-3 sm:space-y-4">
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link href={`/${locale}`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.aboutUs}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/treatment`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {locale === 'en' ? 'Services' : '服務'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/gift-certificates`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.giftCertificates}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/training`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.training}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#faq`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.faq}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.contact}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/appointment-policy`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.appointmentPolicy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Location block */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 sm:space-y-4 w-full">
            <span className="text-xs font-semibold uppercase tracking-wider text-white block text-center md:text-left">
              {locale === 'en' ? 'Get in Touch' : '聯絡資訊'}
            </span>
            <div className="space-y-2.5 w-full">
              <p className="text-sm font-light text-white/70">
                <span className="font-medium text-white block mb-1">
                  {locale === 'en' ? 'Sydney Studio:' : 'Sydney 工作室:'}
                </span>
                <a
                  href="https://maps.google.com/?q=5+Pittwater+Road,+Gladesville+NSW+2111,+Australia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors underline decoration-white/20 underline-offset-4"
                >
                  5 Pittwater Road, Gladesville NSW 2111, Australia
                </a>
              </p>
              <div className="text-sm font-light text-white/70 space-y-1">
                <p>
                  <span className="font-medium">{locale === 'en' ? 'WhatsApp / SMS:' : 'WhatsApp／短訊:'}</span>{' '}
                  <a href="https://wa.me/61493552213" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    +61 493 552 213
                  </a>
                </p>
                <p>
                  <span className="font-medium">Email:</span>{' '}
                  <a href="mailto:shugaosha@gmail.com" className="hover:text-primary transition-colors">
                    shugaosha@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* General Disclaimer */}
        <div className="pt-8 pb-6 border-b border-white/10 text-left">
          <p className="text-[11px] sm:text-xs font-light text-white/50 leading-relaxed max-w-5xl">
            {locale === 'en'
              ? 'Shugaosha reserves the right to amend its website content, services, policies and terms at any time. Information provided on this website is general in nature and does not constitute medical advice. Individual responses and results may vary. Nothing on this website excludes or limits any rights or remedies that cannot lawfully be excluded under applicable law. In the event of any inconsistency between language versions, the English version shall prevail.'
              : 'Shugaosha 保留隨時修改網站內容、服務、政策及條款的權利。本網站所提供的資料只屬一般資訊，並不構成醫療建議。每個人的反應及效果可能有所不同。本網站任何內容均不排除或限制適用法律下不能合法排除的任何權利或補救。如不同語言版本之間存在任何不一致，概以英文版本為準。'}
          </p>
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 space-y-2.5 md:space-y-0 text-center md:text-left">
          <p className="text-xs font-light text-white/40">
            {locale === 'en' ? '© 2026 Shugaosha. All Rights Reserved.' : '© 2026 Shugaosha. 版權所有。'}
          </p>
          
          <div className="py-1 md:py-0">
            <span className="text-xs font-medium tracking-widest uppercase text-white/50 block">
              {locale === 'en' ? 'Precision • Balance • Harmony' : '精準・平衡・和諧'}
            </span>
          </div>

          <div className="text-xs font-light text-white/30">
            <p>
              {locale === 'en' ? 'Website by ' : '網頁開發：'}
              <a
                href="https://rydesign.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/60 transition-colors"
              >
                RyDesign
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
