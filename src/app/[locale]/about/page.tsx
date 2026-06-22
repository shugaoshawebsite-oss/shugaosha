import { getDictionary } from '@/utils/dictionary'
import { getTeam } from '@/utils/dataService'
import { Award, Compass, Star, MapPin } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const team = await getTeam()

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 pb-24">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-soft-bg to-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary block">
            {dict.about.title}
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-foreground tracking-tight">
            {dict.about.subtitle}
          </h1>
          <p className="text-sm sm:text-base font-light text-charcoal/80 max-w-xl mx-auto leading-relaxed">
            {locale === 'en'
              ? 'Our mission is to help restore balance, alignment, and harmony through non-surgical Japanese techniques.'
              : '我們致力於透過溫和的日式小顏手法，協助您恢復平衡、對稱與身心和諧。'}
          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        <div className="border-b border-gray-100 pb-6">
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {dict.about.foundersTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {team.map((member) => (
            <div 
              key={member._id}
              className="bg-white border border-gray-100/60 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start hover:shadow-md transition-shadow duration-300"
            >
              {/* Profile Icon Placeholder */}
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold shadow-inner">
                {(member.name[locale] || member.name.en).charAt(0)}
              </div>

              {/* Bio Details */}
              <div className="space-y-4 flex-grow">
                <div>
                  <h3 className="text-xl font-medium text-foreground">
                    {member.name[locale] || member.name.en}
                  </h3>
                  <span className="text-xs font-medium text-primary uppercase tracking-wide block mt-1">
                    {member.role[locale] || member.role.en}
                  </span>
                </div>
                <p className="text-sm font-light text-charcoal/80 leading-relaxed">
                  {member.bio[locale] || member.bio.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="bg-soft-bg border-y border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {locale === 'en' ? 'Quality & Trust' : '榮譽與信賴'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {dict.about.awardsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 p-8 rounded-xl text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-foreground tracking-wide">
                {locale === 'en' ? 'Award Finalist' : '傑出商業獎入圍'}
              </h3>
              <p className="text-sm font-light text-charcoal/80">
                {locale === 'en'
                  ? '🏆 2026 Northern Districts Local Business Awards Finalist'
                  : '🏆 2026年 Northern Districts 當地傑出商業獎決賽入圍'}
              </p>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-xl text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-foreground tracking-wide">
                {locale === 'en' ? 'Outstanding Services' : '卓越美容服務'}
              </h3>
              <p className="text-sm font-light text-charcoal/80">
                {locale === 'en'
                  ? 'Recognized for outstanding and professional beauty alignment services.'
                  : '技術與理念榮獲業界肯定，提供最優質的日式面部調整服務。'}
              </p>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-xl text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-foreground tracking-wide">
                {locale === 'en' ? '5-Star Reviews' : '5星好評推薦'}
              </h3>
              <p className="text-sm font-light text-charcoal/80">
                {locale === 'en'
                  ? 'Consistently rated 5 stars by verified clients across Australia & Hong Kong.'
                  : '在 Google 及社交平台上，獲得澳洲與香港客人的全五星滿分推薦。'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Science & Philosophy Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Philosophy Details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {locale === 'en' ? 'Philosophy' : '品牌理念'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight">
                {dict.about.philosophyTitle}
              </h2>
            </div>
            
            <div className="space-y-6 text-base font-light text-charcoal/80 leading-relaxed">
              <p>
                {locale === 'en'
                  ? 'Our approach is rooted in the concepts of Balance, Harmony, and Wellbeing. We believe that facial symmetry is closely connected with internal comfort, postural alignment, and muscle memory.'
                  : '我們的技術核心在於「平衡、對稱、和諧」。我們深信面部的對稱美感與身體內部張力、生活姿勢及肌肉記憶密切相關。'}
              </p>
              <div className="border-l-2 border-primary pl-6 py-1 italic font-normal text-foreground">
                {locale === 'en'
                  ? '“Less Force. More Understanding. We Don’t Change Your Face.”'
                  : '「更少力量。更多理解。我們不改變您的臉。」'}
              </div>
              <p>
                {locale === 'en'
                  ? 'By adjusting bone gaps and relaxing deep tension naturally, we help bring back the original, balanced contours of your features without the need for needles, machines, or surgery.'
                  : '透過溫和地調整骨骼間隙與釋放肌肉深層張力，我們在無需打針、無需儀器及手術的狀態下，幫助您找回原本自然對稱的完美輪廓。'}
              </p>
            </div>
          </div>

          {/* Right Column: Relocation Announcement */}
          <div className="lg:col-span-6 bg-primary/[0.02] border border-primary/5 rounded-2xl p-8 sm:p-12 space-y-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-medium text-foreground">
              {dict.about.locationNotice}
            </h3>
            <p className="text-sm font-light text-charcoal/85 leading-relaxed">
              {locale === 'en'
                ? 'We are delighted to share that our primary clinic has relocated to a spacious, light-filled brand new space in Gladesville. Visit us for an elevated wellness experience.'
                : '非常高興向大家宣佈，我們的核心診所已搬遷至 Gladesville 全新寬敞且光線充足的新址，提供更舒適、奢華的放鬆體驗。'}
            </p>
            <div className="pt-2">
              <p className="text-sm font-medium text-foreground">
                5 Pittwater Road, Gladesville NSW 2111
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
