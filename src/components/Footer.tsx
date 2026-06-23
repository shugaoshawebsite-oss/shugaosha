import Link from 'next/link'
import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'

interface FooterProps {
  locale: 'en' | 'zh'
}

export default function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale)

  return (
    <footer className="bg-soft-bg border-t border-gray-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-gray-200/60">
          
          {/* Brand block */}
          <div className="flex flex-col space-y-4">
            <Link href={`/${locale}`} className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Shugaosha Logo"
                width={200}
                height={40}
                className="w-[150px] md:w-[200px] h-auto object-contain"
              />
            </Link>
            <p className="text-sm font-light text-charcoal/75 leading-relaxed max-w-xs">
              {locale === 'en' 
                ? 'Authentic Japanese Face Slimming & Facial Realignment. A natural, non-invasive approach to balance, harmony and wellbeing.'
                : '正宗日式小顏矯正與面部平衡術。以最自然、無入侵性的方式，為您找回對稱、和諧與健康狀態。'}
            </p>
          </div>

          {/* Quick links block */}
          <div className="flex flex-col space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              {locale === 'en' ? 'Sitemap' : '網頁導覽'}
            </span>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}`} className="text-sm font-light text-charcoal/80 hover:text-primary transition-colors duration-300">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/success-stories`} className="text-sm font-light text-charcoal/80 hover:text-primary transition-colors duration-300">
                  {dict.nav.successStories}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-sm font-light text-charcoal/80 hover:text-primary transition-colors duration-300">
                  {dict.nav.aboutUs}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/news-tours`} className="text-sm font-light text-charcoal/80 hover:text-primary transition-colors duration-300">
                  {dict.nav.newsTours}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm font-light text-charcoal/80 hover:text-primary transition-colors duration-300">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Location block */}
          <div className="flex flex-col space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
              {locale === 'en' ? 'Get in Touch' : '聯絡資訊'}
            </span>
            <div className="space-y-3">
              <p className="text-sm font-light text-charcoal/80 leading-relaxed">
                <span className="font-medium text-charcoal/90 block mb-1">
                  {locale === 'en' ? 'Gladesville Clinic:' : '主要診所地址:'}
                </span>
                5 Pittwater Road, Gladesville NSW 2111, Australia
              </p>
              <div className="text-sm font-light text-charcoal/80 space-y-1">
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
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs font-light text-charcoal/60 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Shugaosha.com. All rights reserved.</p>
          <div className="flex space-x-6">
            <span>{locale === 'en' ? 'Japanese Kogao Association Certified' : '日本小顏矯正協會認證'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
