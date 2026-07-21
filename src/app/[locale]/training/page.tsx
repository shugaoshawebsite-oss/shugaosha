import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import {
  BookOpen,
  Award,
  Users,
  Eye,
  Heart,
  Clipboard,
  Shield,
  CheckSquare,
  Briefcase,
  ArrowRight,
  Clock,
} from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

const courseModules = [
  { icon: BookOpen, en: 'Japanese Small Face Correction Philosophy', zh: '日本小顏矯正哲學' },
  { icon: Eye, en: 'Facial Observation & Assessment', zh: '面部觀察與評估' },
  { icon: Heart, en: 'Authentic Japanese Hands-on Techniques', zh: '正宗日式手感技術' },
  { icon: Users, en: 'Guided Practical Training', zh: '指導實踐訓練' },
  { icon: Clipboard, en: 'Treatment Flow', zh: '療程流程' },
  { icon: Briefcase, en: 'Professional Consultation', zh: '專業諮詢' },
  { icon: Shield, en: 'Safety & Contraindications', zh: '安全事項與禁忌' },
  { icon: CheckSquare, en: 'Final Practical Assessment', zh: '最終實踐評估' },
]

const whoIsItFor = {
  en: [
    'Beauty therapists and facial practitioners',
    'Salon and clinic owners',
    'Wellness professionals',
    'Individuals looking for a career change',
    'Parents returning to work after raising children',
    'Anyone wishing to learn a flexible professional skill',
    'Beginners with no previous experience',
  ],
  zh: [
    '美容治療師及面部護理師',
    '美容院及診所負責人',
    '健康養生專業人士',
    '有意轉換職業的人士',
    '育兒後重返工作的父母',
    '希望學習靈活專業技能的人士',
    '無任何相關經驗的初學者',
  ],
}

export default async function TrainingPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 pb-24">

      {/* ── Hero ── */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <Image src="/assets/images/hero4.webp" alt="Training" fill priority className="object-cover opacity-80" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24">
          <span className="type-label text-charcoal/70 block mb-3">
            {locale === 'en' ? 'Professional Training' : '專業培訓'}
          </span>
          <h1 className="type-hero text-charcoal max-w-2xl">
            {locale === 'en' ? 'Training' : '培訓課程'}
          </h1>
          <p className="type-body text-charcoal/80 max-w-xl mt-4">
            {locale === 'en'
              ? 'Learn Authentic Japanese Kogao. Build a Professional Career.'
              : '學習正宗日本小顏術，建立專業職業生涯。'}
          </p>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-6">
        <p className="text-base sm:text-lg font-light text-charcoal/80 leading-relaxed">
          {locale === 'en'
            ? 'Shugaosha offers professional training in authentic Japanese Small Face Correction (Japanese Kogao), based on the official curriculum of the Japan Small Face Correction Association (JSFA), Japan.'
            : '修顏社提供正宗日本小顏矯正（Japanese Kogao）的專業培訓，基於日本小顏矯正協會（JSFA）官方課程編排。'}
        </p>
        <p className="text-base sm:text-lg font-light text-charcoal/80 leading-relaxed">
          {locale === 'en'
            ? 'Designed for beauty professionals, career changers and anyone passionate about learning a specialised hands-on technique, the programme provides practical skills, recognised certification and the confidence to build a professional practice.'
            : '本課程專為美容專業人士、轉行者及任何熱衷於學習專業徒手技術的人士而設計，提供實用技能、認證證書，並幫助您建立自信以開展專業實踐。'}
        </p>
      </section>

      {/* ── Official Certification ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 sm:p-12 lg:p-16 space-y-8">
          <div className="space-y-3">
            <span className="type-label text-primary block">
              {locale === 'en' ? 'Official Certification' : '官方認證'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {locale === 'en' ? 'Official Japanese Kogao Certification' : '日本官方小顏矯正認證'}
            </h2>
            <p className="text-base font-medium text-foreground">
              {locale === 'en' ? 'Learn through Australia’s Official JSFA Representative' : '跟隨日本小顏矯正協會官方澳洲代表學習'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clipboard,
                title: locale === 'en' ? 'Official JSFA Curriculum' : '官方 JSFA 課程',
                desc: locale === 'en'
                  ? 'Based on the official curriculum of the Japan Small Face Correction Association (JSFA), Japan.'
                  : '基於日本小顏矯正協會（JSFA）的官方課程編排。',
              },
              {
                icon: Users,
                title: locale === 'en' ? "Australia’s Official JSFA Representative" : '官方澳洲 JSFA 代表',
                desc: locale === 'en'
                  ? 'Learn directly from Teresa Soo, the Official Australian Representative of the Japan Small Face Correction Association (JSFA) and Australia’s only JSFA Certified Instructor.'
                  : '直接師從 Teresa Soo，她是日本小顏矯正協會（JSFA）官方澳洲代表，也是澳洲唯一的 JSFA 認證導師。',
              },
              {
                icon: Award,
                title: locale === 'en' ? 'Official Japanese Certification' : '日本官方認證',
                desc: locale === 'en'
                  ? 'Students who successfully complete the final practical assessment receive an Official Certificate issued by the Japan Small Face Correction Association (JSFA), Japan.'
                  : '成功通過最終實踐評估的學生將獲得由日本小顏矯正協會（JSFA）頒發的官方證書。',
              },
              {
                icon: BookOpen,
                title: locale === 'en' ? 'Structured Learning' : '系統化學習',
                desc: locale === 'en'
                  ? 'Structured theory, practical demonstrations, guided hands-on practice and a final practical assessment.'
                  : '包括系統化理論、實踐示範、指導實作練習以及最終的實踐評估。',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 space-y-3 border border-gray-100 text-center md:text-left">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto md:mx-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                <p className="text-sm font-light text-charcoal/75 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet Your Instructor ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <span className="type-label text-primary block mb-3">
                {locale === 'en' ? 'Meet Your Instructor' : '認識您的導師'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                Teresa Soo
              </h2>
            </div>

            <ul className="space-y-3 inline-block text-left mx-auto lg:mx-0 block">
              {[
                locale === 'en' ? 'Founder of Shugaosha' : '修顏社創辦人',
                locale === 'en'
                  ? 'Official Australian Representative of the Japanese Small Face Correction Association (JSFA)'
                  : 'JSFA 日本小顏矯正協會官方澳洲代表',
                locale === 'en'
                  ? "Australia's Only JSFA Certified Instructor"
                  : '澳洲唯一 JSFA 認證導師',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-light text-charcoal/80">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-sm font-light text-charcoal/75 leading-relaxed">
              {locale === 'en'
                ? 'As both an instructor and practising therapist, Teresa continues to work with real clients while teaching. Her combination of authentic Japanese training, clinical experience and practical application allows students to develop confidence, precision and professional skills that can be applied immediately in practice.'
                : '作為既是導師又是執業治療師的 Teresa，在授課的同時持續為真實客戶提供服務。她將正宗的日式培訓、豐富的臨床經驗與實際應用相結合，幫助學生建立自信、精準度與專業技能，並能立即應用於日常實踐中。'}
            </p>
          </div>

          {/* Instructor photo */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <Image
                src="/assets/images/img17.webp"
                alt={locale === 'en' ? 'Professional portrait · Photo with Japanese instructor · Official certificate' : 'Teresa 專業相 · 日本老師合照 · 官方證書'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Course Overview ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-10">
        <div>
          <span className="type-label text-primary block mb-3">
            {locale === 'en' ? 'What You Will Learn' : '課程內容'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Course Overview' : '課程概覽'}
          </h2>
          <p className="type-body text-charcoal/70 mt-3 max-w-2xl">
            {locale === 'en'
              ? 'The training combines both theory and practical learning, allowing students to progressively develop the knowledge, technique and confidence required for professional practice.'
              : '課程結合理論與實踐學習，讓學生逐步建立專業實踐所需的知識、技術與自信。'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {courseModules.map(({ icon: Icon, en, zh }) => (
            <div
              key={en}
              className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3 hover:border-primary/20 hover:shadow-sm transition-all duration-300 group text-center sm:text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300 mx-auto sm:mx-0">
                <Icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <p className="text-xs font-medium text-charcoal/85 leading-snug">
                {locale === 'en' ? en : zh}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* ── Who Is This For ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div>
              <span className="type-label text-primary block mb-3">
                {locale === 'en' ? 'Is This Right for Me?' : '適合我嗎？'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                {locale === 'en' ? 'Who Is This Training For?' : '培訓課程適合誰？'}
              </h2>
            </div>
            <p className="type-body text-charcoal/70">
              {locale === 'en'
                ? 'This programme is suitable for anyone interested in learning a professional hands-on facial technique. It is ideal for:'
                : '此課程適合任何有興趣學習專業手感面部技術的人士，尤其適合：'}
            </p>
            <div className="flex justify-center lg:justify-start">
              <ul className="space-y-3 inline-block text-left">
                {whoIsItFor[locale].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-light text-charcoal/80">
                    <ArrowRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm font-medium text-primary pt-2">
              {locale === 'en'
                ? 'No previous experience is required.'
                : '無需任何相關經驗。'}
            </p>
          </div>

          <div className="bg-soft-bg border border-gray-100 rounded-2xl p-8 space-y-5 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-base font-medium text-foreground">
              {locale === 'en' ? 'Course Format' : '課程形式'}
            </h3>
            <div className="flex justify-center lg:justify-start">
              <ul className="space-y-3 inline-block text-left">
                {[
                  locale === 'en' ? 'Structured theory sessions' : '系統化理論課堂',
                  locale === 'en' ? 'Practical demonstrations' : '實踐示範',
                  locale === 'en' ? 'Guided hands-on practice' : '指導實習練習',
                  locale === 'en' ? 'Final practical assessment' : '最終實踐評估',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-light text-charcoal/80">
                    <span className="mt-2 w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Certification ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-10">
        <div>
          <span className="type-label text-primary block mb-3">
            {locale === 'en' ? 'After You Graduate' : '畢業後'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Certification & Professional Practice' : '認證與專業實踐'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: locale === 'en' ? 'Official JSFA Certificate' : 'JSFA 官方證書',
              desc: locale === 'en'
                ? 'Students who successfully pass the final practical assessment will receive an Official Certificate issued by the Japan Small Face Correction Association (JSFA), Japan.'
                : '成功通過最終實踐評估的學生將獲得由日本小顏矯正協會（JSFA）頒發的官方證書。',
            },
            {
              icon: Briefcase,
              title: locale === 'en' ? 'Practice-Ready Skills' : '即用實踐技能',
              desc: locale === 'en'
                ? 'The course is designed to prepare students for real client treatments through practical training and professional assessment.'
                : '課程旨在通過實踐培訓和專業評估，讓學生做好為真實客戶提供療程的準備。',
            },
            {
              icon: Users,
              title: locale === 'en' ? 'Professional Confidence' : '專業自信',
              desc: locale === 'en'
                ? 'Upon graduation, students will have the practical skills and confidence to begin offering authentic Japanese Small Face Correction treatments as part of their professional services or future business.'
                : '畢業後，學生將具備實務技能和自信，可開始在其專業服務或未來業務中提供正宗日本小顏矯正療程。',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-2xl p-7 space-y-4 hover:shadow-sm transition-shadow duration-300 text-center md:text-left">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto md:mx-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-sm font-light text-charcoal/75 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Graduation Photos */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { src: '/assets/images/img16.webp', alt: locale === 'en' ? 'Graduation Photo 1' : '畢業相片 1' },
            { src: '/assets/images/img20.webp', alt: locale === 'en' ? 'Graduation Photo 2' : '畢業相片 2' },
          ].map((img, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <p className="text-xs font-light text-charcoal/50 text-center">
          {locale === 'en'
            ? 'Certification is awarded only after successfully passing the final practical assessment.'
            : '認證僅在成功通過最終實踐評估後頒發。'}
        </p>
      </section>

      {/* ── The Shugaosha Way (Coming Soon) ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="relative overflow-hidden bg-charcoal/[0.03] border border-charcoal/10 rounded-3xl p-8 sm:p-12">
          <div className="space-y-4 max-w-2xl">
            <span className="type-label text-primary block">
              {locale === 'en' ? 'The Shugaosha Way' : '修顏社之道'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {locale === 'en' ? 'Continuing Professional Development' : '持續專業發展'}
            </h2>
            <p className="type-body text-charcoal/70 leading-relaxed">
              {locale === 'en'
                ? "The Shugaosha Way represents Teresa's ongoing professional development pathway, built upon years of clinical experience and practical application. Designed for practitioners wishing to further refine their skills beyond the official Japanese certification, this advanced training focuses on observation, precision, treatment planning and professional confidence."
                : '修顏社之道代表 Teresa 持續的專業發展路徑，建立於多年臨床經驗與實踐應用之上。專為希望在官方日本認證基礎上進一步精進技能的從業者而設，此進階培訓聚焦於觀察、精準度、療程規劃及專業自信。'}
            </p>
            <p className="text-sm font-light text-charcoal/60">
              {locale === 'en'
                ? 'Further details will be announced as the programme continues to develop.'
                : '詳情將隨課程持續發展而公佈。'}
            </p>
          </div>

          {/* Coming Soon badge */}
          <div className="mt-8 sm:mt-0 sm:absolute sm:top-12 sm:right-12">
            <span className="inline-block bg-charcoal/8 text-charcoal/50 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
              {locale === 'en' ? 'Coming Soon' : '即將推出'}
            </span>
          </div>
        </div>
      </section>

      {/* ── Student Experience (placeholder gallery) ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-8">
        <div>
          <span className="type-label text-primary block mb-3">
            {locale === 'en' ? 'Student Experience' : '學生體驗'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Learning in Practice' : '實踐中學習'}
          </h2>
          <p className="type-body text-charcoal/70 mt-3 max-w-2xl">
            {locale === 'en'
              ? 'Learning is practical, supportive and focused on real technique application. Students progress through demonstrations, guided practice, practical assessment and professional development, helping them build confidence step by step throughout their learning journey.'
              : '學習是實踐性的、具有支持性的，並專注於真實技術應用。學生通過示範、指導練習、實踐評估和專業發展逐步進步，在整個學習旅程中一步步建立自信。'}
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { src: '/assets/images/img22.webp', label: locale === 'en' ? 'Training Session' : '培訓課堂' },
            { src: '/assets/images/img27.webp', label: locale === 'en' ? 'Hands-on Practice' : '實習練習' },
            { src: '/assets/images/img29.webp', label: locale === 'en' ? 'Graduation' : '畢業典禮' },
            { src: '/assets/images/img21.webp', label: locale === 'en' ? 'Certificates' : '證書頒授' },
          ].map((img, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100"
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Enquiries CTA ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 sm:p-14 text-center space-y-6">
          <span className="type-label text-primary block">
            {locale === 'en' ? 'Interested?' : '有興趣？'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Enquiries' : '課程查詢'}
          </h2>
          <p className="type-body text-charcoal/70 max-w-lg mx-auto">
            {locale === 'en'
              ? 'For more information about our training programmes, upcoming courses and enrolment, please contact us.'
              : '如需了解更多有關我們培訓課程、即將開辦課程及報名的資訊，請聯絡我們。'}
          </p>
          <a
            href="https://wa.me/61493552213?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20the%20training%20programme."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-primary text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02]"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {locale === 'en' ? 'Enquire About Training' : '查詢培訓課程'}
          </a>
        </div>
      </section>

    </div>
  )
}
