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
  Clock,
  Quote,
  CheckCircle2,
} from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

const courseModules = [
  { icon: BookOpen, en: 'Japanese Small Face Correction Philosophy', zh: '日本小顏矯正理念' },
  { icon: Eye, en: 'Facial Observation & Assessment', zh: '面部觀察與評估' },
  { icon: Heart, en: 'Authentic Japanese Hands-on Techniques', zh: '正統日本徒手技術' },
  { icon: Users, en: 'Guided Practical Training', zh: '指導實習' },
  { icon: Clipboard, en: 'Session Flow', zh: 'Session 流程' },
  { icon: Briefcase, en: 'Professional Consultation', zh: '專業諮詢' },
  { icon: Shield, en: 'Safety & Contraindications', zh: '安全守則與不適合情況' },
  { icon: CheckSquare, en: 'Final Practical Assessment', zh: '最終實習考核' },
]

const whoIsItFor = {
  en: [
    'Beauty professionals and facial practitioners',
    'Salon and studio owners',
    'Wellness professionals',
    'Individuals looking for a career change',
    'Parents returning to work after raising children',
    'Anyone wishing to develop a flexible professional skill',
    'Beginners with no previous experience',
  ],
  zh: [
    '美容師及面部護理從業員',
    '美容院及工作室負責人',
    '身心健康行業專業人士',
    '希望轉換事業方向的人士',
    '育兒後準備重返職場的家長',
    '希望掌握具彈性的專業技能的人士',
    '沒有相關經驗的初學者',
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
            {locale === 'en' ? 'Training' : '專業課程'}
          </h1>
          <p className="text-xl sm:text-2xl font-light text-primary mt-3 sm:mt-4 tracking-tight">
            {locale === 'en'
              ? 'Learn Authentic Japanese Small Face Correction. Build a Professional Career.'
              : '學習正統日本小顏矯正　開展專業發展之路'}
          </p>
        </div>
      </section>

      {/* ── 2. Intro Statement ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-6 scroll-mt-28">
        <p className="text-base sm:text-lg font-light text-charcoal/85 leading-relaxed">
          {locale === 'en'
            ? 'Shugaosha offers professional training in authentic Japanese Small Face Correction, based on the official curriculum of the Japan Small Face Correction Certification Association (JSFA), Japan.'
            : '修顏社提供正統日本小顏矯正專業培訓，課程以日本小顏矯正認定協會的官方課程為基礎。'}
        </p>
        <p className="text-base sm:text-lg font-light text-charcoal/85 leading-relaxed">
          {locale === 'en'
            ? 'Designed for beauty professionals, career changers and anyone passionate about learning a specialised hands-on technique, the programme combines structured learning, guided practical training and professional assessment to help students develop the skills and confidence required for professional practice.'
            : '課程適合美容專業人士、希望轉換事業方向的人士，以及對專業徒手技術有興趣的人士。透過有系統的學習、實習指導及專業考核，協助學員逐步掌握專業實踐所需的技術及信心。'}
        </p>
      </section>

      {/* ── 3. Official Certification ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 sm:p-12 lg:p-16 space-y-10">
          <div className="space-y-3 text-left">
            <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
              {locale === 'en' ? 'OFFICIAL CERTIFICATION' : '官方認證'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {locale === 'en' ? 'Official Japanese Small Face Correction Certification' : '日本官方小顏矯正認證'}
            </h2>
            <p className="text-base font-medium text-foreground">
              {locale === 'en' ? 'Learn through Australia’s Official JSFA Representative' : '由日本小顏矯正認定協會澳洲官方代表親自教授'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clipboard,
                title: locale === 'en' ? 'Official JSFA Curriculum' : '日本協會官方課程',
                desc: locale === 'en'
                  ? 'Based on the official curriculum of the Japan Small Face Correction Certification Association (JSFA), Japan.'
                  : '課程以日本小顏矯正認定協會的官方培訓內容為基礎。',
              },
              {
                icon: Users,
                title: locale === 'en' ? "Australia’s Official JSFA Representative" : '澳洲官方代表',
                desc: locale === 'en'
                  ? 'Learn directly from Teresa Soo, the official Australian Representative and a Certified Trainer of the Japan Small Face Correction Certification Association.'
                  : '由日本小顏矯正認定協會澳洲官方代表及認證導師 Teresa Soo 親自教授。',
              },
              {
                icon: Award,
                title: locale === 'en' ? 'Official JSFA Certification' : 'JSFA 官方認證',
                desc: locale === 'en'
                  ? 'Students who successfully complete the training and pass the final practical assessment receive an official Diploma issued by the Japan Small Face Correction Certification Association (JSFA), Japan.'
                  : '完成培訓並通過最終實務考核的學員，將獲由日本小顏矯正認定協會（JSFA）頒發的正式證書。',
              },
              {
                icon: BookOpen,
                title: locale === 'en' ? 'Structured Learning' : '系統化學習',
                desc: locale === 'en'
                  ? 'Structured theory, practical demonstrations, guided hands-on practice and a final practical assessment.'
                  : '課程包括理論、技術示範、指導實習及最終實習考核。',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 sm:p-7 space-y-3.5 border border-gray-100/80 text-left shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                <p className="text-xs sm:text-sm font-light text-charcoal/75 leading-relaxed">{desc}</p>
              </div>
            ))}
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
                <li key={i} className="flex items-start gap-3 text-sm font-light text-charcoal/85">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{item}</span>
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
            {locale === 'en' ? 'WHAT YOU WILL LEARN' : '課程內容'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Course Overview' : '課程概覽'}
          </h2>
          <p className="type-body text-charcoal/75 max-w-2xl">
            {locale === 'en'
              ? 'The training combines theory and practical learning, allowing students to progressively develop the knowledge, technique and confidence required for professional practice.'
              : '課程結合理論與實習，讓學員循序漸進地建立專業實踐所需的知識、技術及信心。'}
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

      {/* ── 6. Is This Right For Me? ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-left">
            <div>
              <span className="type-label text-primary block mb-3 uppercase tracking-widest text-xs font-semibold">
                {locale === 'en' ? 'IS THIS RIGHT FOR ME?' : '這個課程適合我嗎？'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                {locale === 'en' ? 'Who Is This Training For?' : '課程適合對象'}
              </h2>
            </div>
            <p className="type-body text-charcoal/75">
              {locale === 'en'
                ? 'This programme is suitable for anyone interested in learning a professional hands-on facial correction technique. It is ideal for:'
                : '本課程適合希望學習專業徒手面部矯正技術的人士，包括：'}
            </p>
            <ul className="space-y-3 text-left">
              {whoIsItFor[locale].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-light text-charcoal/85">
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm font-medium text-primary pt-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {locale === 'en'
                  ? 'No previous experience is required.'
                  : '無須任何相關經驗。'}
              </span>
            </p>
          </div>

          <div className="bg-soft-bg border border-gray-100 rounded-3xl p-8 sm:p-10 space-y-6 text-left">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-foreground">
              {locale === 'en' ? 'Course Format' : '課程形式'}
            </h3>
            <ul className="space-y-3.5 text-left">
              {[
                locale === 'en' ? 'Structured theory sessions' : '系統化理論課程',
                locale === 'en' ? 'Practical demonstrations' : '技術示範',
                locale === 'en' ? 'Guided hands-on practice' : '指導徒手實習',
                locale === 'en' ? 'Final practical assessment' : '最終實習考核',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-light text-charcoal/85">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 7. After You Graduate ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-10 scroll-mt-28">
        <div className="text-left space-y-3">
          <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'AFTER YOU GRADUATE' : '完成課程後'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Certification & Professional Practice' : '專業認證與實踐'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: locale === 'en' ? 'Official JSFA Certification' : 'JSFA 官方認證',
              desc: locale === 'en'
                ? 'Students who successfully complete the training and pass the final practical assessment receive an official Diploma issued by the Japan Small Face Correction Certification Association (JSFA), Japan.'
                : '完成培訓並通過最終實務考核的學員，將獲由日本小顏矯正認定協會（JSFA）頒發的正式證書。',
            },
            {
              icon: Briefcase,
              title: locale === 'en' ? 'Practice-Ready Skills' : '實踐所需技能',
              desc: locale === 'en'
                ? 'The programme is designed to prepare students to work confidently with clients through guided practical training and professional assessment.'
                : '課程透過指導實習及專業考核，協助學員建立為客人提供服務所需的實際技巧及信心。',
            },
            {
              icon: Users,
              title: locale === 'en' ? 'Professional Confidence' : '專業自信',
              desc: locale === 'en'
                ? 'Upon graduation, students will have the practical skills and confidence to begin offering authentic Japanese Small Face Correction professionally — whether adding a new service to an existing practice or starting a new professional journey.'
                : '完成課程後，學員將掌握實際操作所需的專業技能與信心，並可將正統日本小顏矯正應用於專業服務中——無論是為現有業務增添一項全新服務，還是開展新的專業方向。',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-3xl p-7 sm:p-8 space-y-4 hover:shadow-sm transition-shadow duration-300 text-left">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="text-xs sm:text-sm font-light text-charcoal/75 leading-relaxed">{desc}</p>
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

      {/* ── 8. The Shugaosha Way (CPD - Coming Soon) ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="relative overflow-hidden bg-charcoal/[0.03] border border-charcoal/10 rounded-3xl p-8 sm:p-12 lg:p-14 text-left">
          <div className="space-y-4 max-w-3xl">
            <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
              THE SHUGAOSHA WAY
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                {locale === 'en' ? 'Advanced Professional Training — The Shugaosha Way' : '進階專業培訓 — 修顏社小顏術'}
              </h2>
              <span className="inline-block bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                {locale === 'en' ? 'Coming Soon' : '即將推出'}
              </span>
            </div>
            <p className="text-sm sm:text-base font-light text-charcoal/80 leading-relaxed">
              {locale === 'en'
                ? 'The Shugaosha Way is Shugaosha’s advanced professional training, developed through years of hands-on practice, continued refinement and experience working with a wide range of facial structures.'
                : '「修顏社小顏術（The Shugaosha Way）」是 Shugaosha 經多年徒手實踐、持續鑽研及不同面部結構的經驗累積而發展出的進階專業培訓。'}
            </p>
            <p className="text-sm sm:text-base font-light text-charcoal/80 leading-relaxed">
              {locale === 'en'
                ? 'The training places a strong emphasis on precision, detailed facial assessment, layered rebalancing and a deeper understanding of facial balance, alignment and contours. It is designed for those who wish to develop or further refine their hands-on skills and bring a more precise, individualised approach into professional practice.'
                : '課程著重精準度、細緻的面部評估、層次式調整，以及對面部平衡、對稱與輪廓的深入理解，適合希望發展或進一步精進徒手技術的人士，將更精準及個人化的調整方式應用於專業實踐之中。'}
            </p>
            <p className="text-xs sm:text-sm font-light text-charcoal/60 pt-2">
              {locale === 'en'
                ? 'Further details will be announced as the programme continues to develop.'
                : '課程仍在持續發展中，詳情將於日後公布。'}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-6 py-2.5 rounded-full bg-gray-200/80 text-charcoal/60 text-xs font-medium tracking-wider uppercase cursor-not-allowed">
                {locale === 'en' ? 'COMING SOON' : '即將推出'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Student Experience & Gallery & Student Review ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-12 scroll-mt-28">
        <div className="text-left space-y-3">
          <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'STUDENT EXPERIENCE' : '學員體驗'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Learning in Practice' : '實踐中學習'}
          </h2>
          <p className="type-body text-charcoal/75 max-w-2xl">
            {locale === 'en'
              ? 'Learning is practical, supportive and focused on real technique application. Students progress through demonstrations, guided practice and practical assessment, building their precision and confidence step by step throughout their learning journey.'
              : '課程著重實際操作，在具支持性的學習環境中，專注於技術的真正應用。學員透過導師示範、指導實習及實習考核，逐步提升精準度、實踐能力及專業信心。'}
          </p>
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

      {/* ── 10. Interested? (Enquiries CTA) ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-sm">
          <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'INTERESTED?' : '有興趣了解更多？'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Enquiries' : '課程查詢'}
          </h2>
          <p className="type-body text-charcoal/75 max-w-lg mx-auto">
            {locale === 'en'
              ? 'For more information about our training programmes, upcoming courses and enrolment, please contact us.'
              : '如欲了解培訓課程、即將開辦的課程及報名詳情，歡迎與我們聯絡。'}
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
