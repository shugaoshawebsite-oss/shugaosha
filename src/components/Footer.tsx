import Link from 'next/link'
import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'

interface FooterProps {
  locale: 'en' | 'zh'
}

export default function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale)

  return (
    <footer className="bg-[#1a1b1e] text-white/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand block */}
          <div className="flex flex-col space-y-4">
            <Link href={`/${locale}`} className="flex items-center">
              {/* Using logo_dark.svg (white/light version) for dark background footer */}
              <Image
                src="/images/logo_dark.svg"
                alt="Shugaosha Logo"
                width={200}
                height={40}
                className="w-[150px] md:w-[200px] h-auto object-contain"
              />
            </Link>
            <p className="type-body-sm text-white/60 max-w-xs">
              {locale === 'en' 
                ? 'Authentic Japanese Face Slimming & Facial Realignment. A natural, non-invasive approach to balance, harmony and wellbeing.'
                : '正宗日式小顏矯正與面部平衡術。以最自然、無入侵性的方式，為您找回對稱、和諧與健康狀態。'}
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
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

          {/* Quick links block — sitemap text removed, nav links styled for dark footer */}
          <div className="flex flex-col space-y-4">
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}`} className="type-body-sm text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/treatment`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.treatment}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/success-stories`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.successStories}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.aboutUs}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/news-tours`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.newsTours}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm font-light text-white/70 hover:text-primary transition-colors duration-300">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Location block */}
          <div className="flex flex-col space-y-4">
            <span className="type-label text-white">
              {locale === 'en' ? 'Get in Touch' : '聯絡資訊'}
            </span>
            <div className="space-y-3">
              <p className="type-body-sm text-white/70">
                <span className="font-medium text-white block mb-1">
                  {locale === 'en' ? 'Gladesville Clinic:' : '主要診所地址:'}
                </span>
                5 Pittwater Road, Gladesville NSW 2111, Australia
              </p>
              <div className="text-sm font-light text-white/70 space-y-1">
                <p>
                  <span className="font-medium">{locale === 'en' ? 'WhatsApp / SMS:' : '預約專線:'}</span>{' '}
                  <a href="tel:+61493552213" className="hover:text-primary transition-colors">+61 493552213</a>
                </p>
                <p>
                  <span className="font-medium">Email:</span>{' '}
                  <a href="mailto:shugaosha@gmail.com" className="hover:text-primary transition-colors">shugaosha@gmail.com</a>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs font-light text-white/40 space-y-4 sm:space-y-0">
          <p className="type-caption text-white/40">© {new Date().getFullYear()} Shugaosha.com. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="type-caption text-white/40">{locale === 'en' ? 'Japanese Kogao Association Certified' : '日本小顏矯正協會認證'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
