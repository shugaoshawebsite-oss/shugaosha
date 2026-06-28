import fs from 'fs/promises'
import path from 'path'

// Interfaces representing the payload format defined in gemini.md
export interface LocaleString {
  en: string
  zh: string
}

export interface LocaleText {
  en: string
  zh: string
}

export interface Service {
  _id: string
  title: LocaleString
  slug: { current: string }
  description: LocaleText
  benefits: LocaleString[]
  price?: number
  duration?: string
  imageRelativeUrl?: string
}

export interface Celebrity {
  _id: string
  name: LocaleString
  role: LocaleString
  quote: LocaleText
  imageRelativeUrl?: string
}

export interface CaseStudy {
  _id: string
  title: LocaleString
  sessionsCount: number
  category: '4-session' | '8-session' | 'maintenance'
  beforeImageRelativeUrl: string
  afterImageRelativeUrl: string
  description?: LocaleText
}

export interface ClientReview {
  _id: string
  clientName: string
  location: string
  rating: number
  reviewText: LocaleText
}

export interface TeamMember {
  _id: string
  name: LocaleString
  role: LocaleString
  bio: LocaleText
  imageRelativeUrl?: string
}

export interface TourSchedule {
  _id: string
  city: LocaleString
  dates: string[]
  isActive: boolean
}

// ==========================================
// FALLBACK / SEED DATA FROM SHUGAOSHA.COM
// ==========================================

const fallbackServices: Service[] = [
  {
    _id: 's1',
    title: {
      en: 'Japanese Face Slimming Realignment (Kogao)',
      zh: '正宗日本小顏矯正術'
    },
    slug: { current: 'japanese-face-slimming-realignment' },
    description: {
      en: 'Our skull is made up of 22 bones. With age and improper posture, the gaps between the bones continue to widen, resulting in facial misalignment. This gentle, hands-on treatment corrects gaps between bones and repositions bone collaterals to achieve a natural, refined appearance.',
      zh: '我們頭骨由22塊骨塊組成。隨著年齡增長和不良姿勢，骨塊間的缝隙不斷加濶，導致面部歪斜與不對稱。日式小顏矯正通過最自然、最安全的專業手感，改善面部骨骼間的缝隙，塑造臉部輪廓，達至小顏與提拉效果。'
    },
    benefits: [
      { en: 'Promotes a more lifted and refined appearance.', zh: '面部提拉與收緊，重塑精緻臉廓。' },
      { en: 'Encourages facial balance and symmetry.', zh: '調整左右臉對稱度，使五官更均勻。' },
      { en: 'Helps reduce the appearance of puffiness & swelling.', zh: '促進淋巴與血液循環，快速減輕面部水腫。' },
      { en: 'Supports a fresher, more rejuvenated skin look.', zh: '改善血流代謝，使皮膚煥發自然光澤。' },
      { en: 'Encourages deep relaxation and release of facial tension.', zh: '深層放鬆面部肌肉，釋放生活壓力。' },
      { en: 'Supports overall wellbeing and jaw opening alignment.', zh: '調整顎骨平衡，使牙關咬合開合更順暢。' }
    ],
    price: 198,
    duration: '60 mins',
    imageRelativeUrl: '/images/service_realignment.jpg'
  }
]

const fallbackCelebrities: Celebrity[] = [
  {
    "_id": "c1",
    "name": {
      "en": "Luisa Leitao",
      "zh": "黎芷珊"
    },
    "role": {
      "en": "Renowned host / actress of Hong Kong",
      "zh": "著名主持人 / 演員"
    },
    "quote": {
      "en": "I feel that the Kogao treatment is really useful for me. Because I had puffiness and a baby face, I feel my face is much less puffy after the treatment. Now that I can feel my facial bones are more defined, it makes me feel very good. I think the most important thing in Kogao is the technique; everyone's hand technique is different, but Teresa and Charles have excellent technique and the results last a long time. I love eating and used to have a round face, but after Kogao, I noticed my face doesn't get fat again even if I eat more, maintaining the contoured Kogao effect. Furthermore, my face used to be slightly asymmetrical with the right side being larger, but after the treatment, I feel my face is balanced and no longer uneven—it feels like my facial structure has been realigned to the correct position. Since it is non-invasive, I find it really great.",
      "zh": "我覺得小顏術對我嚟講真係好有用，因為我本身有水腫同埋包包面，做咗小顏之後我覺得我塊面冇咁水腫，依家摸到個面骨細咗令我感覺非常之好。我覺得做小顏最緊要係個手勢，每個人做嘅手勢都唔同，但係Teresa 同 Charles 嘅手勢係非常之好，效果可以last好耐。我本身好鍾意食嘢，都好包包面，但係做咗小顏之後，我發覺我就算食多咗嘢都唔會肥返，即係keep到小顏個感覺。加上本身我塊面係有啲鴛鴦，右邊面大啲，但係做咗小顏之後我覺得塊面balance左，冇之前咁鴛鴦，即係幫我塊面啪返啱個位，而且因為小顏冇入侵性，所以我覺得幾好。"
    },
    "imageRelativeUrl": "/assets/celebrity/dd68f78e-2618-445d-ad27-8bc1b1e79a14_edi.avif"
  },
  {
    "_id": "c2",
    "name": {
      "en": "Helen Tam",
      "zh": "譚玉瑛"
    },
    "role": {
      "en": "Renowned host / actress of Hong Kong",
      "zh": "著名主持人 / 演員"
    },
    "quote": {
      "en": "Although I am not an overweight person, after doing the Kogao treatment recently, I really feel Teresa has her ways. I feel my facial contours are significantly more defined, and my blood circulation has improved. It is truly unbelievable that such results can be achieved using only manual techniques without any machinery.",
      "zh": "我雖然唔係一個肥人，本來最近做咗小顏呢一個事情呢，我又覺得Teresa真係有啲辦法喎, 我覺得自己嘅輪廓呢… 就好明顯就更加突出啦… 同埋自己嘅血氣都循環得好啲，相對呢我就覺得只係用人手唔係機器又可以有一個咁嘅效果, 某程度真係匪夷所思👍"
    },
    "imageRelativeUrl": "/assets/celebrity/5F23DDFD-EF12-458F-B8BF-EAC05F8C1ACA.avif"
  },
  {
    "_id": "c3",
    "name": {
      "en": "Max Cheung",
      "zh": "張達倫"
    },
    "role": {
      "en": "Renowned actor of Hong Kong and China",
      "zh": "著名演員"
    },
    "quote": {
      "en": "Thank you Charles and Teresa for showing me what authentic Japanese Kogao is all about. It started with their warm hands, making me completely relaxed, and they explained every step along the way. I realized that aging causes facial features to shift, which in turn affects blood circulation. After the treatment, my contours are visibly restored, and I feel much more energetic. Those who know me know that I previously suffered from facial paralysis, leaving some of my facial muscles weaker. After just two Kogao sessions, I have already seen improvement! Thank you Teresa & Charles.",
      "zh": "多謝 Charles 同 Teresa,令我認識正宗日式小顏是什麼。一齊從溫暖嘅雙手開始，令我整個人都放鬆，每做一個步驟都會講解，原來人會因為歲月而令五官走位，繼而影響血液流通，做完之後，明顯輪廓出返嚟，同精神咗好多。認識我嘅人都知道，我曾經面癱，有啲面部肌肉力量會差啲，當我做完兩次小顏後，已有改善！Thx Teresa & Charles"
    },
    "imageRelativeUrl": "/assets/celebrity/Celebrity_M_Max 02.avif"
  },
  {
    "_id": "c4",
    "name": {
      "en": "Vivian Lai",
      "zh": "黎瑞恩"
    },
    "role": {
      "en": "Famous singer of Hong Kong and China",
      "zh": "著名歌星"
    },
    "quote": {
      "en": "Thank you Teresa for making me more beautiful. I now have full confidence.",
      "zh": "多謝 Teresa 另我變得更靚, 我現在信心十足."
    },
    "imageRelativeUrl": "/assets/celebrity/796F278A-43AE-45DE-9991-9298EF61DACC_edi.avif"
  },
  {
    "_id": "c5",
    "name": {
      "en": "Ben Wong",
      "zh": "黄智賢"
    },
    "role": {
      "en": "Renowned actor of Hong Kong and China",
      "zh": "著名演員"
    },
    "quote": {
      "en": "Although I have only done Kogao once, I can really see the improvement! 👍",
      "zh": "雖然只做了一次小顏，但真係見到有改善👍🏻"
    },
    "imageRelativeUrl": "/assets/celebrity/313E74B5-08C4-48EF-91A6-F22A6F6843BB.avif"
  }
];

const fallbackReviews: ClientReview[] = [
  {
    _id: 'r1',
    clientName: 'Angie Lin, Sheley Yeung & Maggie Han',
    location: 'Australia / Hong Kong',
    rating: 5,
    reviewText: {
      en: "So happy to meet Teresa and Charles, and get to know Japanese Kogao beauty tech. Charles introduced the concept of 'small face' in a professional perspective. Throughout the entire process, Teresa was skillful, friendly and professional. After the treatment, the face slimming effect is obvious, I surely will recommend to my friends.",
      zh: "很高興認識了Teresa和Charles，並了解到日本小顔美容技術。Charles以專業的角度介紹了“小颜”概念。深入而簡潔的解釋使我對接受治療感到興趣和信心。在整個過程中，Teresa既熟練又友善，專業至極。治療後，臉部瘦臉效果顯著，我一定會向我的朋友推薦。"
    }
  },
  {
    _id: 'r2',
    clientName: 'Nancy Tong',
    location: 'Australia',
    rating: 5,
    reviewText: {
      en: "Charles knew what he was doing. I saw immediate improvement on my face after just the first session. Since I finished the 4 treatments, which was about 9 months ago, the result still remains. I highly recommend his service.",
      zh: "Charles知道他在做什麼。在第一次療程後，我立即看到臉部有所改善。自從我約9個月前完成了四次療程，效果仍然保持。我強烈推薦他的服務。"
    }
  },
  {
    _id: 'r3',
    clientName: 'Virginia Degrange',
    location: 'Google Review Client',
    rating: 5,
    reviewText: {
      en: "Thank you for helping me achieve a more youthful look, Charles and Teresa have truly transformed my facial appearance. I feel uplifted and more confident. Grateful for the fantastic service!",
      zh: "感謝你們幫助我實現更年輕的外貌，Charles和Teresa真的改變了我的面容。我感到振奮且更有信心。對於這出色的服務深感感激！"
    }
  }
]

const fallbackCaseStudies: CaseStudy[] = [
  {
    _id: 'cs1',
    title: { en: 'Client Progression A', zh: '客戶療程對照 A' },
    sessionsCount: 4,
    category: '4-session',
    beforeImageRelativeUrl: '/images/case_study_1_before.jpg',
    afterImageRelativeUrl: '/images/case_study_1_after.jpg',
    description: {
      en: 'Significant reduction in cheek width, jaw alignment, and cheekbone symmetry after 4 sessions.',
      zh: '進行4次小顏療程後，顴骨寬度明顯內收，下頜輪廓更具V字感，左右平衡度大幅提升。'
    }
  },
  {
    _id: 'cs2',
    title: { en: 'Client Progression B', zh: '客戶療程對照 B' },
    sessionsCount: 8,
    category: '8-session',
    beforeImageRelativeUrl: '/images/case_study_2_before.jpg',
    afterImageRelativeUrl: '/images/case_study_2_after.jpg',
    description: {
      en: '8-session journey showcasing nose bridge elevation, nasolabial folds reduction, and skin firming.',
      zh: '8次療程的完整蛻變：鼻樑視覺上顯得更高挺，法令紋與笑紋顯著減淡，面部組織整體提拉。'
    }
  },
  {
    _id: 'cs3',
    title: { en: 'Maintenance Client C', zh: '日常保養客戶 C' },
    sessionsCount: 12,
    category: 'maintenance',
    beforeImageRelativeUrl: '/images/case_study_3_before.jpg',
    afterImageRelativeUrl: '/images/case_study_3_after.jpg',
    description: {
      en: 'Long term maintenance result showing sustained face slimming and tone over 12 months.',
      zh: '維持期保養對照：每月一次的例行微調，使精緻的小顏曲線在一年後依然保持完美不反彈。'
    }
  }
]

const fallbackTeam: TeamMember[] = [
  {
    _id: 't1',
    name: { en: 'Teresa Soo', zh: '蘇子賢 (Teresa)' },
    role: { en: 'Japan-Certified Master Specialist and Trainer', zh: '日本認證小顏矯正師 / 總導師' },
    bio: {
      en: "Teresa discovered this non-invasive technique and pursued her advanced certifications and trainer license directly in Japan. Her passion is helping individuals achieve natural, beautiful facial alignment through the warmth and expertise of manual touch.",
      zh: "Teresa 在日本親自學習並取得了正宗小顏矯正師及導師證書，擁有豐富的手感操作與教學經驗。她深信雙手的溫度和理解能啟動面部肌肉的記憶與自愈能力，幫助每位客戶實現最完美的平衡。"
    },
    imageRelativeUrl: '/images/teresa_soo.jpg'
  },
  {
    _id: 't2',
    name: { en: 'Charles Cho', zh: '曹志豪 (Charles)' },
    role: { en: 'Japan-Certified Specialist & Australia-Certified Trainer', zh: '日本認證小顏矯正師 / 澳洲註冊培訓導師' },
    bio: {
      en: "Charles certified in Japan as a specialist and extended his teaching and practice to Australia. He is highly regarded for his precise explanation of skeletal gaps, jaw alignment, and his smooth, relaxing manual style.",
      zh: "Charles 在日本取得小顏認證後，將技術帶回澳洲並成為當地推廣導師。他擅長從面部骨骼結構及解剖原理，向客戶詳細解說五官走位原因，以精準細緻的手法，舒緩咬合關節並重塑臉部對稱線條。"
    },
    imageRelativeUrl: '/images/charles_cho.jpg'
  }
]

const fallbackTours: TourSchedule[] = [
  {
    _id: 'tour1',
    city: { en: 'Hong Kong (Causeway Bay)', zh: '香港 (銅鑼灣)' },
    dates: ['June, July 2024', 'Jan, Feb 2023', 'May-July 2022'],
    isActive: true
  },
  {
    _id: 'tour2',
    city: { en: 'USA (SF Bay Area / LA / Las Vegas)', zh: '美國 (舊金山灣區 / 洛杉磯 / 拉斯維加斯)' },
    dates: ['May, June 2024', 'March - June 2023', 'Oct, Nov 2022'],
    isActive: true
  },
  {
    _id: 'tour3',
    city: { en: 'Canada (Vancouver)', zh: '加拿大 (溫哥華)' },
    dates: ['June 2024', 'June 2023', 'Oct, Nov 2022'],
    isActive: true
  }
]

// ==========================================
// DATA FETCHING SERVICE (WITH MOCK FALLBACKS)
// ==========================================

async function fetchContent<T>(fileName: string, fallback: T): Promise<T> {
  const repo = process.env.GITHUB_CONTENT_REPO
  const branch = process.env.GITHUB_CONTENT_BRANCH || 'main'
  const token = process.env.GITHUB_TOKEN

  if (repo) {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/content/${fileName}`
    try {
      const headers: Record<string, string> = {}
      if (token) {
        headers['Authorization'] = `token ${token}`
      }
      const response = await fetch(url, {
        headers,
        next: { revalidate: 60 }
      })
      if (response.ok) {
        return await response.json() as T
      }
      console.warn(`Failed to fetch ${fileName} from GitHub (status: ${response.status}), trying local filesystem`)
    } catch (error) {
      console.error(`Error fetching ${fileName} from GitHub:`, error)
    }
  }

  // Fallback to local file system
  try {
    const filePath = path.join(process.cwd(), 'content', fileName)
    const fileData = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(fileData) as T
  } catch (error) {
    console.error(`Error reading ${fileName} from local file system:`, error)
    return fallback
  }
}

export async function getServices(): Promise<Service[]> {
  return fetchContent<Service[]>('services.json', fallbackServices)
}

export async function getCelebrities(): Promise<Celebrity[]> {
  return fetchContent<Celebrity[]>('celebrities.json', fallbackCelebrities)
}

export async function getReviews(): Promise<ClientReview[]> {
  return fetchContent<ClientReview[]>('reviews.json', fallbackReviews)
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return fetchContent<CaseStudy[]>('caseStudies.json', fallbackCaseStudies)
}

export async function getTeam(): Promise<TeamMember[]> {
  return fetchContent<TeamMember[]>('team.json', fallbackTeam)
}

export async function getTours(): Promise<TourSchedule[]> {
  return fetchContent<TourSchedule[]>('tours.json', fallbackTours)
}
