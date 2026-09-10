import Image from 'next/image'
import Link from 'next/link'
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
  Quote,
  CheckCircle2,
} from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

const courseModules = [
  { icon: BookOpen, en: 'Japanese Small Face Correction Principles', zh: '日本小顏矯正原理' },
  { icon: Eye, en: 'Facial Observation & Assessment', zh: '面部觀察與評估' },
  { icon: Shield, en: 'Safety & Contraindications', zh: '安全事項與禁忌' },
  { icon: Heart, en: 'Japanese Hands-On Techniques', zh: '日本徒手技術' },
  { icon: Users, en: 'Guided Hands-On Practice', zh: '指導式實務練習' },
  { icon: Clipboard, en: 'Session Structure & Flow', zh: '服務結構與流程' },
  { icon: Briefcase, en: 'Client Consultation & Communication', zh: '客戶諮詢與溝通' },
  { icon: CheckSquare, en: 'Final Practical Assessment', zh: '最終實務考核' },
]

const whoIsItFor = {
  en: [
    'Beauty professionals and facial practitioners',
    'Salon, studio and wellness professionals',
    'New migrants looking to build a practical professional skill in Australia',
    'Individuals looking for a career change or a fresh start',
    'Parents looking to use their available time to learn a practical skill and build a flexible career around family life',
    'Anyone looking to build a flexible career with greater freedom over their working hours',
  ],
  zh: [
    '美容專業人士及面部護理從業員',
    '美容院、工作室及健康美容行業人士',
    '剛移居澳洲，希望建立一門實用專業技能的人士',
    '希望轉換事業跑道或重新開始的人士',
    '希望善用空餘時間學習實用技能，並建立可配合家庭生活之彈性事業的家長',
    '希望建立更具彈性的事業，能更自由安排工作時間的人士',
  ],
}

const courseFormatItems = {
  en: [
    'Structured theory and facial assessment',
    'Live demonstrations',
    'Small-group, personalised hands-on training',
    'Practice on live models with different facial structures',
    'Close guidance on hand placement, pressure and technique',
    'Final practical assessment',
  ],
  zh: [
    '系統理論及面部評估',
    '真人示範',
    '小班個人化手把手培訓',
    '使用不同面部結構的真人模特進行實習',
    '針對手位、力度及技巧作近距離指導及修正',
    '最終實務考核',
  ],
}

export default async function TrainingPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return (
    <div className="flex flex-col space-y-20 sm:space-y-28 md:space-y-36 pb-24 pt-0">

      {/* ── 1. Hero ── */}
      <section className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center overflow-hidden w-full pt-20 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero4.webp"
            alt="Professional Training"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-16 sm:pb-20 text-left">
          <span className="type-label text-charcoal/70 block mb-3 uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'PROFESSIONAL TRAINING' : '專業培訓'}
          </span>
          <h1 className="type-hero text-charcoal max-w-3xl leading-tight">
            {locale === 'en' ? 'Training' : '培訓課程'}
          </h1>
          <p className="text-xl sm:text-2xl font-light text-primary mt-3 sm:mt-4 tracking-tight leading-snug">
            {locale === 'en' ? (
              <>
                Learn Japanese Small Face Correction.
                <br />
                Build a Professional Career.
              </>
            ) : (
              <>
                學習日本小顏矯正，
                <br />
                開展專業事業。
              </>
            )}
          </p>
        </div>
      </section>

      {/* ── 2. Intro Statement ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-6 scroll-mt-28 text-left">
        <p className="text-base sm:text-lg font-light text-charcoal/85 leading-relaxed">
          {locale === 'en'
            ? 'Shugaosha offers professional training in Japanese Small Face Correction in Australia, based on the official curriculum of the Japan Small Face Correction Certification Association (JSFA), Japan.'
            : 'Shugaosha 在澳洲提供日本小顏矯正專業培訓，課程以日本小顏矯正認證協會（JSFA）的官方課程為基礎。'}
        </p>
        <p className="text-base sm:text-lg font-light text-charcoal/85 leading-relaxed">
          {locale === 'en'
            ? 'Students can undertake the training locally in Australia with Teresa Soo, Australia’s JSFA Representative and Certified Trainer.'
            : '學員可直接在澳洲跟隨澳洲 JSFA 代表及認證導師 Teresa Soo 接受培訓。'}
        </p>
        <p className="text-base sm:text-lg font-light text-charcoal/85 leading-relaxed">
          {locale === 'en'
            ? 'Designed for beauty professionals, career changers and anyone passionate about learning a specialised hands-on technique, the programme combines structured learning, guided practical training and professional assessment to help students develop the skills and confidence required for professional practice.'
            : '課程適合美容專業人士、希望轉換事業方向的人士，以及任何有興趣學習專業徒手技術的人。課程結合系統學習、指導式實務培訓及專業考核，幫助學員建立投入專業實務所需的技巧與信心。'}
        </p>
      </section>

      {/* ── 3. Official Certification ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 sm:p-12 lg:p-16 space-y-8 sm:space-y-10">
          <div className="space-y-3 text-left">
            <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
              {locale === 'en' ? 'OFFICIAL CERTIFICATION' : '官方認證'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {locale === 'en' ? 'Official Japanese Small Face Correction Certification' : '日本小顏矯正官方認證'}
            </h2>
            <p className="text-base font-medium text-foreground">
              {locale === 'en' ? 'Learn through Australia’s JSFA Representative' : '跟隨澳洲 JSFA 代表學習'}
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Clipboard,
                  title: locale === 'en' ? 'JSFA Curriculum' : 'JSFA 課程',
                  desc: locale === 'en'
                    ? 'Based on the official curriculum of the Japan Small Face Correction Certification Association (JSFA), Japan.'
                    : '課程以日本小顏矯正認證協會（JSFA）的官方課程為基礎。',
                },
                {
                  icon: Users,
                  title: locale === 'en' ? 'Australia’s JSFA Representative' : '澳洲 JSFA 代表',
                  desc: locale === 'en'
                    ? 'Learn directly from Teresa Soo, Australia’s JSFA Representative and Certified Trainer of the Japan Small Face Correction Certification Association.'
                    : '由澳洲 JSFA 代表及日本小顏矯正認證協會認證導師 Teresa Soo 親自教授。',
                },
                {
                  icon: Award,
                  title: locale === 'en' ? 'Official JSFA Certification' : 'JSFA 官方認證',
                  desc: locale === 'en'
                    ? 'Students who successfully complete the training and pass the final practical assessment receive an official Diploma issued by the Japan Small Face Correction Certification Association (JSFA), Japan.'
                    : '學員成功完成培訓並通過最終實務考核後，將獲日本小顏矯正認證協會（JSFA）頒發的官方 Diploma。',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-6 sm:p-7 space-y-3.5 border border-gray-100/80 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto sm:mx-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                  <p className="text-xs sm:text-sm font-light text-charcoal/75 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Practice-Ready Hands-On Training */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-4 border border-gray-100/80 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  {locale === 'en' ? 'Practice-Ready Hands-On Training' : '實務導向手把手培訓'}
                </h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm font-light text-charcoal/75 leading-relaxed pt-1">
                {locale === 'en' ? (
                  <>
                    <p>
                      Extensive hands-on training with real models, including one-on-one guidance, live demonstrations and individual technique correction.
                    </p>
                    <p>
                      The programme is designed to help students develop the practical skills, precision and confidence needed to begin working with clients professionally after successful completion and assessment.
                    </p>
                    <p>
                      The focus is not only on learning the techniques, but on applying them effectively and confidently in real client situations.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      透過真人模特實習、一對一指導、現場示範及個別手法糾正，讓學員累積充分的實際操作經驗。
                    </p>
                    <p>
                      課程旨在幫助學員建立所需的實際技巧、精準度及信心，在成功完成課程及通過考核後，具備開始為客戶提供專業服務的實務能力。
                    </p>
                    <p>
                      課程重點不只是學懂技巧，而是懂得如何在真實客戶情況中有效及有信心地運用。
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Meet Your Instructor ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 text-left">
            <div>
              <span className="type-label text-primary block mb-3 uppercase tracking-widest text-xs font-semibold">
                {locale === 'en' ? 'MEET YOUR INSTRUCTOR' : '認識您的導師'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight">
                Teresa Soo
              </h2>
            </div>

            <ul className="space-y-3 text-left">
              {[
                locale === 'en' ? 'Co-founder of Shugaosha' : '修顏社聯合創辦人',
                locale === 'en'
                  ? 'Official Australian Representative of the Japan Small Face Correction Certification Association'
                  : '日本小顏矯正認定協會澳洲官方代表',
                locale === 'en'
                  ? 'Certified Trainer of the Japan Small Face Correction Certification Association'
                  : '日本小顏矯正認定協會認證導師',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-light text-charcoal/85 text-left">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-left flex-1">{item}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-4 pt-2">
              <p className="text-sm sm:text-base font-light text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? 'As both a trainer and practising specialist, Teresa continues to work closely with clients while teaching.'
                  : 'Teresa 除了擔任導師，亦持續親自為客人提供專業服務。'}
              </p>
              <p className="text-sm sm:text-base font-light text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? 'Her combination of professional training in Japan, years of hands-on experience and real-world application allows students to develop precision, confidence and practical skills that can be applied in professional practice.'
                  : '憑藉在日本接受的專業培訓、多年徒手實踐經驗，以及將技術應用於不同面部狀況的經驗，她協助學員逐步建立精準度、信心及能夠實際運用的專業技巧。'}
              </p>
            </div>
          </div>

          {/* Instructor photo in Japan */}
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-md">
            <Image
              src="/assets/images/img17.webp"
              alt={locale === 'en' ? 'Teresa Soo in Japan with JSFA Master' : 'Teresa Soo 於日本小顏研修照片'}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── 5. What You Will Learn (Course Overview) ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-10 scroll-mt-28">
        <div className="text-left space-y-3">
          <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'COURSE OVERVIEW' : '課程內容'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'What You Will Learn' : '你將會學到甚麼'}
          </h2>
          <p className="type-body text-charcoal/75 max-w-2xl">
            {locale === 'en'
              ? 'The programme combines essential theory with extensive hands-on learning, allowing students to progressively develop the knowledge, practical skills, precision and confidence required to work with clients professionally.'
              : '課程結合理論基礎與大量實務操作，讓學員循序漸進地建立專業知識、實際手法、精準度及信心，為日後實際服務客戶做好準備。'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {courseModules.map(({ icon: Icon, en, zh }) => (
            <div
              key={en}
              className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 space-y-3.5 hover:border-primary/30 hover:shadow-sm transition-all duration-300 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                {locale === 'en' ? en : zh}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Who Is This Training For? ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-10 scroll-mt-28">
        <div className="text-left space-y-3">
          <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'WHO IS THIS TRAINING FOR?' : '這個課程適合哪些人？'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Who Is This Training For?' : '這個課程適合哪些人？'}
          </h2>
          <p className="type-body text-charcoal/75 max-w-3xl">
            {locale === 'en'
              ? 'This programme is suitable for anyone interested in learning professional hands-on facial correction techniques. It is ideal for:'
              : '本課程適合任何有興趣學習專業徒手修顏技術的人士，包括：'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {whoIsItFor[locale].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 flex items-start gap-4 hover:border-primary/30 hover:shadow-sm transition-all duration-300 text-left group"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors duration-300 mt-0.5">
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
              <span className="text-sm sm:text-[15px] font-light text-charcoal/90 leading-relaxed text-left pt-1 flex-1">
                {item}
              </span>
            </div>
          ))}

          {/* Experience callout */}
          <div className="md:col-span-2 bg-primary/5 border border-primary/20 rounded-2xl p-5 sm:p-6 flex items-center gap-4 text-left">
            <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 text-primary">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-sm sm:text-[15px] font-medium text-primary tracking-wide flex-1">
              {locale === 'en'
                ? 'No previous experience is required.'
                : '無需任何相關經驗。'}
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Course Format ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-10 scroll-mt-28">
        <div className="text-left space-y-3">
          <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'COURSE FORMAT' : '課程形式'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'How the Training Is Delivered' : '培訓方式'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {courseFormatItems[locale].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 flex items-start gap-4 hover:border-primary/30 hover:shadow-sm transition-all duration-300 text-left group"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors duration-300 mt-0.5">
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
              <span className="text-sm sm:text-[15px] font-light text-charcoal/90 leading-relaxed text-left pt-1 flex-1">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Certification & Professional Practice ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-10 scroll-mt-28">
        <div className="text-left space-y-3">
          <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'AFTER YOU GRADUATE' : '完成課程後'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Certification & Professional Practice' : '認證與專業實務'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {[
            {
              icon: Award,
              title: locale === 'en' ? 'Official JSFA Certification' : 'JSFA 官方認證',
              desc: locale === 'en'
                ? 'Upon successful completion of the training and final practical assessment, students receive an official Diploma issued by the Japan Small Face Correction Certification Association (JSFA), Japan.'
                : '成功完成培訓並通過最終實務考核後，學員將獲日本小顏矯正認證協會（JSFA）頒發的官方 Diploma。',
            },
            {
              icon: Briefcase,
              title: locale === 'en' ? 'Ready for Professional Practice' : '具備投入專業實務的能力',
              desc: locale === 'en'
                ? 'Upon successful completion of the training and final practical assessment, students will have developed the practical skills, precision and confidence to begin working with clients professionally — whether adding a new service to an existing practice or starting a new professional journey.'
                : '成功完成培訓並通過最終實務考核後，學員將建立所需的實際手法、精準度及信心，可開始為客戶提供專業服務，無論是為現有業務增加新服務，或開展新的專業方向。',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-gray-100 rounded-3xl p-7 sm:p-9 space-y-4 hover:border-primary/30 hover:shadow-sm transition-all duration-300 text-left flex flex-col justify-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mx-auto md:mx-0">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm font-light text-charcoal/80 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Graduate & Diploma Photos */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {[
            { src: '/assets/images/img16.webp', alt: locale === 'en' ? 'Graduate receiving official Japanese Diploma' : '畢業學員獲頒日本官方 Diploma' },
            { src: '/assets/images/img20.webp', alt: locale === 'en' ? 'Graduate Certificate Presentation' : '學員證書頒發' },
            { src: '/assets/images/img21.webp', alt: locale === 'en' ? 'Official JSFA Diploma Award' : '日本小顏矯正認定協會 Diploma 頒發' },
          ].map((img, i) => (
            <div
              key={i}
              className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 33vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <p className="text-xs font-light text-charcoal/60 text-center">
          {locale === 'en'
            ? 'Official certification is awarded only after successfully passing the final practical assessment.'
            : '學員必須成功通過最終實習考核，方可獲頒日本官方認證。'}
        </p>
      </section>

      {/* ── 9. The Shugaosha Way ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="relative overflow-hidden bg-charcoal/[0.03] border border-charcoal/10 rounded-3xl p-8 sm:p-12 lg:p-14 text-left">
          <div className="space-y-5 max-w-3xl">
            <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
              THE SHUGAOSHA WAY
            </span>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                The Shugaosha Way
              </h2>
              <p className="text-xl sm:text-2xl font-light text-primary tracking-tight">
                {locale === 'en' ? 'Professional Training' : '專業培訓'}
              </p>
              <p className="text-xs sm:text-sm uppercase tracking-wider text-charcoal/60 font-medium pt-1">
                {locale === 'en' ? 'Developed by Shugaosha' : '由 Shugaosha 創立及發展'}
              </p>
            </div>

            <div className="space-y-3.5 text-sm sm:text-base font-light text-charcoal/80 leading-relaxed pt-2">
              <p>
                {locale === 'en'
                  ? 'The Shugaosha Way is Shugaosha’s own facial correction method, developed through years of hands-on practice, continued refinement and experience working with a wide range of facial structures.'
                  : 'The Shugaosha Way 是 Shugaosha 經過多年實際操作、不斷改良，以及接觸不同面部結構後發展出的自家修顏方法。'}
              </p>
              <p>
                {locale === 'en'
                  ? 'This professional training focuses on detailed facial assessment, precision, layered rebalancing and learning how to adapt the work to each individual face.'
                  : '這個專業培訓著重細緻的面部評估、精準手法、分層調整，以及學習如何因應每一張不同的面作出個人化處理。'}
              </p>
              <p>
                {locale === 'en'
                  ? 'Designed for JSFA graduates and practitioners with relevant hands-on facial experience who wish to further develop their assessment skills, precision and individualised approach to facial correction.'
                  : '課程適合已完成 JSFA 培訓，或已具備相關徒手面部技術經驗的從業員，希望進一步提升評估能力、手法精準度，以及個人化修顏技巧。'}
              </p>
            </div>

            <div className="pt-3">
              <div className="bg-white/90 border border-primary/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-sm shadow-sm">
                <span className="font-medium text-charcoal/85">
                  {locale === 'en' ? 'Build your foundation with JSFA' : '先以 JSFA 建立基礎'}
                </span>
                <span className="text-primary hidden sm:inline font-bold">→</span>
                <span className="text-primary sm:hidden font-bold">↓</span>
                <span className="font-semibold text-primary">
                  {locale === 'en'
                    ? 'Develop your individualised approach through The Shugaosha Way'
                    : '再透過 The Shugaosha Way 發展你的個人化專業手法'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Student Experience & Gallery & Student Review ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-12 scroll-mt-28">
        <div className="text-left space-y-3">
          <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'LEARNING IN PRACTICE' : '實務學習'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Learning in Practice' : '實務學習'}
          </h2>
          <div className="space-y-3 type-body text-charcoal/75 max-w-3xl">
            <p>
              {locale === 'en'
                ? 'Students learn in a highly personalised setting, with close one-on-one or small-group guidance throughout the practical training.'
                : '學員會在高度個人化的學習環境中接受培訓，實務部分以一對一或小班形式進行，讓導師可以更貼身指導及即時修正手法。'}
            </p>
            <p>
              {locale === 'en'
                ? 'Through live demonstrations, hands-on correction and practice with a variety of real models and facial structures, students are able to refine each technique with greater precision and develop the confidence to adapt their skills to different clients.'
                : '透過現場示範、手把手指導，以及接觸不同面形和面部結構的真人模特，學員可以更精準地掌握每項技巧，並建立因應不同客戶作出調整的信心和能力。'}
            </p>
          </div>
        </div>

        {/* Gallery with all existing photos + new Brisbane Kimmy photos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {[
            {
              src: '/assets/training/kimmy_training_1.jpg',
              title: locale === 'en' ? 'Guided Application' : '指導實習',
              desc: locale === 'en' ? 'Guided practice with instructor' : '導師從旁指導實習（Brisbane）',
            },
            {
              src: '/assets/training/kimmy_training_2.jpg',
              title: locale === 'en' ? 'Practical Training' : '徒手技術實習',
              desc: locale === 'en' ? 'Hands-on facial technique' : '徒手技術實習照片（Brisbane）',
            },
            {
              src: '/assets/training/kimmy_training_3.jpg',
              title: locale === 'en' ? 'Japanese JSFA Diploma' : '日本官方 Diploma',
              desc: locale === 'en' ? 'Kimmy receiving JSFA Diploma' : '獲頒日本官方 Diploma（Brisbane）',
            },
            {
              src: '/assets/training/kimmy_training_4.jpg',
              title: locale === 'en' ? 'Certificate Recognition' : '證書獲頒',
              desc: locale === 'en' ? 'Kimmy & Teresa in Brisbane' : 'Kimmy 獲頒認證（Brisbane）',
            },
            {
              src: '/assets/images/img22.webp',
              title: locale === 'en' ? 'Training Session' : '培訓課堂',
              desc: locale === 'en' ? 'Small class instruction' : '細緻小班教學',
            },
            {
              src: '/assets/images/img27.webp',
              title: locale === 'en' ? 'Hands-on Practice' : '實習練習',
              desc: locale === 'en' ? 'Anatomy & bone alignment' : '結構與肌肉實習',
            },
            {
              src: '/assets/images/img29.webp',
              title: locale === 'en' ? 'Specialist Guidance' : '導師示範',
              desc: locale === 'en' ? 'Step-by-step techniques' : '步驟示範與解析',
            },
            {
              src: '/assets/images/img16.webp',
              title: locale === 'en' ? 'Graduation & Diploma' : '官方 Diploma',
              desc: locale === 'en' ? 'Official JSFA Japan Diploma' : '獲頒日本官方 Diploma',
            },
          ].map((img, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Image
                src={img.src}
                alt={img.desc}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                <p className="text-white text-xs font-semibold">{img.title}</p>
                <p className="text-white/80 text-[11px] font-light leading-tight">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Student Reviews / What Our Students Say Section ── */}
        <div className="pt-6 space-y-8">
          <div className="flex items-center gap-3 text-primary">
            <Quote className="w-8 h-8 opacity-40" />
            <span className="type-label text-primary uppercase tracking-widest text-xs font-semibold">
              {locale === 'en' ? 'WHAT OUR STUDENTS SAY' : '學員心聲與評價'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                name: 'Karina',
                review: '“I had a really positive learning experience with Teresa Soo and I’m very satisfied with the training. Teresa is incredibly patient, attentive, and detailed in the way she teaches, which made it very easy for me to understand the techniques and improve quickly. She always took the time to answer all of my questions thoroughly and made sure I felt confident before moving on. I really appreciated her support and guidance throughout the course, and I would definitely recommend her training to anyone interested in Japanese face slimming techniques.”',
              },
              {
                name: 'Kimmy',
                review: '“Learning with Teresa at Shugaosha has been a truly transformative experience. Her patience, profound knowledge of facial anatomy, and meticulous attention to detail gave me so much confidence throughout the hands-on training. She doesn’t just teach a technique; she teaches you how to truly understand precision, flow, and client care. I left the course feeling fully equipped, inspired, and honored to bring this authentic Japanese technique to my clients in Brisbane. I couldn\'t have asked for a better mentor!”',
              },
              {
                name: 'Yen',
                review: '學習小顏術這段旅程，真的為我的人生翻開了全新的一頁。\n\n起初懷著好奇與期待，幸好遇到了非常用心的老師。整個學習過程中，老師總是手把手地耐心教導，從骨骼結構、手法力道的細微調整，到面對客人時的細節處理，毫不保留地傳授經驗。每當我感到迷茫或手法不夠準確時，老師總能在旁邊及時指點，給了我滿滿的安全感與信心。\n\n沒想到當時的一個決定，讓小顏術不僅成為了一門手藝，更變成了我現在每天投入的工作。\n\n我很喜歡現在這份工作。每當看著客人做完項目後帶著滿意與驚喜的笑容離開，那種能用自己的雙手幫別人變美、變得更有自信的成就感，是其他事物無法比擬的。感謝老師當初的悉心栽培，讓我找到了這條能夠為之熱愛並持續努力的方向！',
              },
              {
                name: 'Katie',
                review: '謝謝Teresa 老師的教學\n一開始接觸的時候 有些動作未能掌握\n但老師很有耐性 在每個動作上作出指導 也親自示範 讓我感受力度大小 經過不停的練習及改善 慢慢看到了療程前後的分別 最後得到老師的認可\n\n過程雖然需要更多的時間練習\n但很值得。\n\n應用在美容工作上非常合適\n能夠改善客人的面部問題 令我感到高興。所以我很推薦小颜療程\n既舒適又有效果 。',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#FAF9F6] border border-primary/15 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between text-left shadow-sm"
              >
                <div className="text-sm sm:text-[15px] font-light text-charcoal/90 leading-relaxed italic whitespace-pre-line">
                  {item.review}
                </div>
                <div className="pt-4 border-t border-primary/10">
                  <h4 className="text-base font-semibold text-foreground">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Training Enquiries CTA ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-sm">
          <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'TRAINING ENQUIRIES' : '培訓課程查詢'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Training Enquiries' : '培訓課程查詢'}
          </h2>
          <p className="type-body text-charcoal/75 max-w-xl mx-auto">
            {locale === 'en'
              ? 'For more information about our training programmes, upcoming training dates and enrolment, please contact us.'
              : '如欲了解培訓課程、最新開課安排及報名詳情，歡迎與我們聯絡。'}
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/61493552213?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20the%20training%20programme."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-primary text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-primary/20"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>{locale === 'en' ? 'ENQUIRE ABOUT TRAINING' : '查詢培訓課程'}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
