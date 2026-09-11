import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, ArrowRight, Filter, BookOpen, Clock, Tag, Newspaper } from 'lucide-react';
import { NewsCard } from '../types';
import WordPressPageHeader from '../components/WordPressPageHeader';
import { HERO_BACKGROUNDS } from '../data/heroBackgrounds';

// Structured data reflecting Odu'a Investment's real-world footprint
const mediaData: NewsCard[] = [
  {
    id: '1',
    title: 'Odu’a Investment Announces Strategic 10% Minority Stake Acquisition in FCMB Pensions',
    category: 'News & Events',
    date: '2026-03-17',
    summary: 'Completing the acquisition of a 10% minority equity stake in FCMB Pensions Limited from FCMB Group Plc, following regulatory approvals from PenCom and the Central Bank of Nigeria.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
    content: 'Odu’a Investment Company Limited (“OICL” or “Odu’a”) announces the completion of its acquisition of a 10% minority equity stake in the issued share capital of FCMB Pensions Limited (“FCMB Pensions” or the “Company”) from FCMB Group Plc (“FCMB Group” or the “Group”).\n\nThe acquisition follows the receipt of the requisite approvals from the regulatory authorities – the National Pension Commission (PenCom) and the Central Bank of Nigeria (CBN). The Securities and Exchange Commission (SEC) has also been duly notified.\n\nThe transaction represents a strategic investment by Odu’a in Nigeria’s growing pension industry, a resilient and steadily expanding segment of the country’s financial services sector. It also strengthens FCMB Pensions’ shareholder base, bringing together two established institutions with complementary strengths and a shared commitment to long-term growth and value creation.\n\nThe Group Chairman of Odu’a Investment Company Limited, Otunba Bimbola Ashiru, commenting on the investment, said, “This investment reflects Odu’a’s strategy of partnering with strong institutions operating in sectors that are central to Nigeria’s long-term economic stability and growth. The pension industry plays a critical role in mobilising long-term savings and strengthening the financial system. FCMB Pensions has built a solid platform serving contributors across Nigeria, and we see a significant opportunity to support its continued growth and impact.”\n\nIn his remark, the Group Managing Director of Odu’a Investment Company Limited, Mr. Abdulrahman Yinusa, said, “Our partnership with FCMB Group Plc reflects confidence in FCMB Pensions’ strategy, leadership, and long-term potential. Together, we will work to expand its reach, support its strategic objectives, and deliver sustained value to contributors and other stakeholders.”\n\nAbout Odu’a Investment Company Limited:\nOdu’a Investment Company Limited is a leading investment holding company jointly owned by the governments of the six Southwest states of Nigeria (Oyo, Ogun, Ondo, Osun, Ekiti, and Lagos). The company manages a diversified portfolio across real estate, financial services, hospitality, agriculture, and industrial investments, with a mandate to generate sustainable economic value and support regional development.\n\nAbout FCMB Pensions Limited:\nFCMB Pensions Limited is a licensed pension fund administrator regulated by the National Pension Commission (PenCom). The company provides retirement savings administration and pension management services to individuals and institutions across Nigeria. As of December 2025, it has over ₦1.1 trillion in Assets Under Management (AUM).\n\nSigned:\nVictor Ayetoro\nHead, Branding & Communication',
    author: 'Victor Ayetoro'
  },
  {
    id: '2',
    title: 'Odu’a Investment Appoints Abiodun Bamiduro as Executive Director & Group Chief Financial Officer (GCFO)',
    category: 'News & Events',
    date: '2026-01-02',
    summary: 'Promoting excellence from within: Former Group Financial Controller Abiodun Bamiduro elevated to coordinate group-wide financial strategies, ERP integrations, and Agusto rating frameworks.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    content: 'In a strategic move reinforcing its commitment to financial excellence and grooming leadership from within the Group, the Board of Odu’a Investment Company Limited (OICL) has announced the appointment of Mr. Abiodun Olamide Bamiduro as an Executive Director and the Group Chief Financial Officer (GCFO), effective January 2, 2026.\n\nMr. Bamiduro, a Fellow of The Institute of Chartered Accountants of Nigeria (ICAN), is promoted from within, having served as the Group’s Financial Controller since 2021. His tenure as Financial Controller was marked by significant contributions, including leading the committee that achieved OICL’s first Credit Rating by Agusto & Co, chairing the implementation of a cost-saving Group-wide ERP system, and establishing a robust internal financial control framework.\n\nCommenting on the appointment, the Chairman of OICL, Otunba Bimbola Ashiru, stated: “Mr. Bamiduro is a strategic business leader who has demonstrated an unparalleled understanding of our company’s vision. His exemplary leadership in enhancing our financial governance and driving efficiency gave the Board full confidence that his elevation will provide the strategic stewardship required for our next phase of growth and value delivery to our shareholder states.”\n\nPrior to joining OICL, Mr. Bamiduro spent over 2 decades in the energy industry, which includes a notable 15-year career with Transocean, a global leader in offshore drilling. There, he rose to the position of Finance Manager for Nigeria & Africa Remote Operations, making history as the first Nigerian and African to hold full financial responsibility for one of the company’s largest operational regions. His expertise is comprehensive, covering financial control, treasury, tax management, and complex financial integrations. His strategic acumen is further recognized through his current roles as a Non-Executive Director on the boards of some OICL subsidiaries, including LAGOS AIRPORT HOTEL LTD.\n\nThe Group Managing Director, Mr Abdulrahman Yinusa, in his remarks stated: “This appointment reflects our core practice of rewarding exceptional talent. Mr. Bamiduro’s strategic financial expertise has been pivotal in strengthening our strategic plan. We are confident he will provide the leadership necessary to accelerate our growth and deliver enhanced sustainable value.”\n\nIn his new role, Mr. Bamiduro will join the Board of OICL and assume full responsibility for OICL’s group-wide financial strategy, encompassing capital management, financial planning, investor relations, and financial integrity across the diversified holding company.',
    author: 'Board Secretariat'
  },
  {
    id: '3',
    title: 'Odu’a Investment Makes Inroad into Healthcare with Strategic Investment in Iwosan Investments',
    category: 'News & Events',
    date: '2025-01-29',
    summary: 'A key milestone in the SRC 2025 (Sweat, Revive, and Create) plan to support regional healthcare systems, reverse medical tourism, and expand Lagoon Hospitals\' network.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    content: 'Odu’a Investment Company Limited (OICL), the engine room for economic development of the South West States, has announced a strategic investment in Iwosan Investments Limited, which aims to reverse medical tourism by driving innovation and enhancing access to quality healthcare locally. This strategic initiative aligns with Odu’a Investment’s SRC 2025 (Sweat, Revive, and Create) strategic plan.\n\nAccording to the Group Chairman of Odu’a Investment, Otunba Bimbo Ashiru, “By investing in key sectors, Odu’a is reinforcing its efforts to reposition the region at the forefront of economic development of the country. This initiative demonstrates Odua’s aspirations at economic diversification and establishes a sustainable legacy that can thrive for future generations.”\n\nAdditionally, Odua’s Group Managing Director, Mr. Abdulrahman Yinusa, affirmed that “the revitalized Odu’a Investment Company Limited is focused on implementing strategies that are aligned to its mission and vision as we continue to support investments that will steadily create new opportunities for economic growth in our chosen sectors”.\n\nFounded in 2019, Iwosan Investments Limited is a healthcare platform currently operating five Centres of Excellence for healthcare delivery in Lagos and with plans to expand into other major cities. In 2021, the company acquired Lagoon Hospitals, one of the largest fully integrated healthcare franchises in West Africa. Recently, Iwosan initiated the development of a PPP initiative: the Lagos MediPark, designed to incorporate excellent clinical standards and expertise within a setting of world-class infrastructure, with the objective of increasing access to acute specialty healthcare services to the Nigerian community as embodied in the Iwosan promise of “We will look after you”.',
    author: 'Corporate Communications'
  },
  {
    id: '4',
    title: 'Odu’a Investment Holds 2-Day Board retreat at Lakowe Lakes and Resort, Lagos State',
    category: 'News & Events',
    date: '2025-10-29',
    summary: 'Board and Management assemble at Lakowe Lakes to finalize the SRC 2.0 (2026–2030) strategic roadmap, drawing inspiration from distinguished corporate icons.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    content: 'On Tuesday, October 28, 2025, we took a significant step toward defining the next era of growth journey with the commencement of our SRC 2.0 2026-2030 Board Strategy Retreat at the prestigious Lakowe Lakes Golf and Country Estate, Lagos State.\n\nThis crucial retreat follows a successful Management Strategy Retreat held in October at Ikogosi Warm Springs, underscoring our commitment to a structured, forward-looking approach as the current SRC 1.0 2021-2025 strategy period draws to a close. The primary objective of this retreat is to finalize OICL’s strategy for 2026-2030. This new plan will build upon the substantial successes and critical learnings from the outgoing strategy, which has proven largely effective in steering our transformation.\n\nWe were immensely honoured to have 3 distinguished corporate personalities join us to share invaluable insights on how OICL can set and achieve ambitious goals:\n\n1. Mr. Fola Adeola, Co-Founder of Guaranty Trust Bank (GTB) and Founder of FATE Foundation, who joined us virtually, urged us to see OICL as state-enabled rather than state-owned.\n2. Dr. Segun Ogunsanya, Former MD/CEO of Airtel Africa and current Chairman of Airtel Africa Foundation, gave us an in-depth guide on opportunities in the telcoms sector.\n3. Mr. Deji Alli, Founder of ARM, Mixta Africa, and the visionary behind the retreat’s inspiring location, Lakowe Lakes Golf and Country Estate, spoke to us about infrastructure investment.\n\nThe retreat is a collaborative effort, bringing together the Board of ODU’A Investment Company Limited, led by Group Chairman Otunba Bimbola Ashiru and Group Managing Director, Mr. Abdulrahman Yinusa; Board Chairman and Managing Directors and Chairmen of our subsidiary companies, as well as the Management team and functional head of OICL, to deliberate on new goals and forge actionable implementation plans. To ensure our strategy is grounded in robust economic realities, Dr. Biodun Adedipe, Founder and Principal Consultant of AA Adedipe Consult, provided an in-depth outlook on the global and Nigerian economies.',
    author: 'Corporate Planning'
  },
  {
    id: '5',
    title: 'Agusto & Co Upgrades Odu’a Investment’s Credit Rating to ‘Aa-’ with Stable Outlook',
    category: 'News & Events',
    date: '2025-07-17',
    summary: 'Upgrade reflects Odu’a’s improved operating income, optimized rental earnings, and reinvestment into high-yielding portfolios overseen by top asset managers.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    content: 'Odu’a Investment Company Limited, the investment holding company jointly owned by the six South-West States of Nigeria, is pleased to announce that the leading credit rating agency, Agusto & Co has upgraded its corporate rating to ‘Aa-’ with a Stable Outlook in its recently released 2025 Corporate Rating Report.\n\nThe upgrade from the previous rating of A+ to Aa- reflects Odu’a Investment’s improved operating income and cash flow, driven by higher dividends from portfolio companies, increased investment returns from non-equity assets, and stronger rental earnings. The rating also acknowledges the Company’s strategic repositioning, including divestments from underperforming assets and reinvestment in high-yielding portfolios managed by reputable asset managers.\n\nCommenting on the rating, OICL Group Chairman, Otunba Bimbo Ashiru said that “This rating upgrade confirms our Board’s commitment to prudent financial management, strategic portfolio optimization, and sustainable value creation for our shareholders. It underscores Odu’a Investment’s resilience and adaptability in navigating economic headwinds while pursuing growth in critical sectors of the economy.”\n\nGroup Managing Director/CEO, Mr. Abdulrahman Yinusa added that “The improved rating reflects the impact of our ongoing 2020–2025 Strategic Plan which focuses on sweating assets, reviving legacy investments, and creating new income streams. As we prepare for the next phase of growth, we stay committed to strengthening our operational efficiency and delivering superior returns to our stakeholders.”',
    author: 'Financial Communications'
  },
  {
    id: '6',
    title: 'Agribusiness Milestone: SWAgCo Launches Odu’a Agro-Industrial Hub in Ekiti State',
    category: 'News & Events',
    date: '2025-06-17',
    summary: 'In partnership with the British American Tobacco Nigeria Foundation (BATNF), SWAgCo establishes a premier central maize micro-enterprise and agronomy hub in Oke-Ako.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    content: 'Through its dedicated agribusiness vehicle, South West Agricultural Company Limited (SWAgCo), Odu’a Investment Company Limited (OICL) has launched its Odu’a Agro-Industrial Hub in Ekiti State.\n\nThe Formal Opening of the Agro-Industrial Hub which took place on Tuesday, 17th June 2025 at Oke-Ako, Ikole Local Government Area of Ekiti State was graced by His Excellency, Executive Governor of Ekiti State, Mr Biodun Oyebanji alongside traditional rulers, government officials, and key stakeholders from the agricultural sector. The ceremony also featured the Flag-off of the Sustainable Development Project of Maize Micro-Enterprises in Ekiti State in partnership with British American Tobacco Nigeria Foundation (BATNF) within the Hub and aimed to enhance maize productivity, improve access to quality inputs and extension services and promote sustainable agricultural practices. The project is being implemented by Westlink Integrated Agriculture Limited, the operating arm of SWAgCo limited.\n\nSpeaking at the event, His Excellency Governor Biodun Oyebanji, who was represented by the Chief of Staff, Mr. Niyi Adebayo appreciated the move as timely and transformative, he said “the initiative aligns perfectly with the administration’s vision to empower farmers and drive inclusive economic growth”. He commended Odu’a Investment, BATNF and SWAgCo for bringing this vision to reality.\n\nThe Group Managing Director of Odu’a Investment Company, Mr. Abdulrahman Yinusa, said that the project is a manifestation of OICL’s commitment to strategic partnerships that delivers impact. “This hub at Oke-Ako Ekiti will be more than a production site. It is a platform designed to bring together actors across the agricultural value chain: from land development and input suppliers to mechanization, processing, storage, and logistics services”.',
    author: 'SWAgCo Press Desk'
  },
  {
    id: '7',
    title: 'Odu’a Investment Management Visits University of Ibadan and The Polytechnic, Ibadan',
    category: 'News & Events',
    date: '2025-06-04',
    summary: 'Building bridges of academic synergy: GMD Abdulrahman Yinusa explores partnerships in technical education, digital innovation, and agricultural modeling.',
    image: 'https://i.postimg.cc/6p1ymM2R/1749470777287.jpg',
    content: 'Last week, the leadership of Odu’a Investment Company Limited (OICL), led by Group Managing Director Mr. Abdulrahman Yinusa, paid courtesy visits to the University of Ibadan and The Polytechnic, Ibadan. These visits are part of OICL’s broader engagement strategy to build meaningful partnerships with institutions that shape the South-West region’s development.\n\nThe OICL delegation included Mrs. Abiola Ajayi, Company Secretary and Head of Legal (also Executive Secretary of the Odu’a Investment Foundation); Engr. Olusoji Sangobiyi, Technical Assistant to the GMD; Mr. Victor Ayetoro, Head of Branding and Communications; and Mr. Kazeem Oguntoyinbo, Branding and Communications Manager.\n\nAt the University of Ibadan, the team was received by Deputy Vice-Chancellor (Academic), Prof. Aderonke Baiyeroju, who welcomed them on behalf of the Vice-Chancellor, Prof. Kayode Adebowale. She emphasized the university’s commitment to partnerships and that the visit aligns with the University’s “Gown and Town” philosophy. Both organizations explored synergies with OICL\'s subsidiaries, SWAgCo (agriculture) and SWIT (technology).\n\nAt The Polytechnic, Ibadan, the OICL team was received by the Acting Rector, Dr. Abideen Lasisi. Addressing the Polytechnic\'s leadership, Mr. Yinusa stressed the importance of technical education and synergy with businesses. As a gesture of honor, the Acting Rector conferred upon Mr. Yinusa the title of Honorary Ambassador of The Polytechnic, Ibadan.',
    author: 'Academic Relations'
  },
  {
    id: '8',
    title: 'CORPORATE DISCLAIMER: Zero Affiliation or Shareholding in O’odua Infraco Resources Limited',
    category: 'Disclaimers',
    date: '2026-01-07',
    summary: 'Official statement alerting the general public, telecommunications, and business communities that Odu’a Investment holds no stock or link to O’odua Infraco.',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800',
    content: 'THIS IS TO INFORM THE GENERAL PUBLIC THAT ODU’A INVESTMENT COMPANY LIMITED (or “OICL”) IS NOT A SHAREHOLDER NOR DOES IT HAVE ANY INTEREST WHATSOEVER IN O’ODUA INFRACO RESOURCES LIMITED.\n\nODU’A INVESTMENT COMPANY LIMITED IS A LIMITED LIABILITY COMPANY REGISTERED IN 1976 TO TAKE OVER THE INVESTMENTS AND BUSINESS INTERESTS OF THE FORMER WESTERN NIGERIA DEVELOPMENT CORPORATION (“WNDC”).\n\nTHE SHAREHOLDERS OF ODU’A INVESTMENT COMPANY LIMITED ARE THE SIX STATE GOVERNMENTS OF OYO, ONDO, OGUN, OSUN, EKITI AND LAGOS. THE GENERAL PUBLIC, ESPECIALLY THE TELECOMMUNICATIONS BUSINESS COMMUNITY, SHOULD HEREBY TAKE NOTE.\n\nAS AT THE DATE OF THIS PUBLICATION, ODU’A INVESTMENT COMPANY LIMITED DOES NOT OWN ANY FIBRE OPTIC LICENSE, NEITHER IS IT INVOLVED IN ANY DISCUSSION ON THE GRANT OF RIGHT OF WAYS OR CONCESSIONS FOR OPTIC FIBRE OR THE LAYING OF FIBRE OPTIC CABLES IN THE SOUTH WEST OR ANY OTHER PART OF THE FEDERAL REPUBLIC OF NIGERIA.\n\nSIGNED\nOICL MANAGEMENT',
    author: 'OICL Management'
  },
  {
    id: '9',
    title: 'ALERT DISCLAIMER: No Investment Offerings on COSMOLEX Telegram Group or cosmolex.com',
    category: 'Disclaimers',
    date: '2025-06-12',
    summary: 'Public warning against unauthorized and fraudulent investment groups falsely purporting to be associated with OICL.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    content: 'The product and claims made about specific products and services on the Telegram messaging platform COSMOLEX or the website (cosmolex.com) are not from Odu’a Investment Company Limited (OICL), with its Head Office at Cocoa House, Ibadan.\n\nInformation or services on the Telegram Messaging platform, including any products or services purporting to be from OICL, are illegal.\n\nThe material contained on this messaging platform, which has recently come to our attention, should not be relied upon as the basis for making any sort of investment decision. Any reliance you place on such material is therefore strictly at your own risk.\n\nOdu\'a Investment Company Limited operates with transparency and high institutional governance standards, and does not conduct public financial advice or raise funds through Telegram groups or unauthorized domains.',
    author: 'OICL Secretariat'
  },
  {
    id: '10',
    title: 'Main Exhibition Gallery & Central Gourd Art Sculpture',
    category: 'Museum & Hall of Fame',
    date: '2025-06-24',
    summary: 'A wide-angle view of the main exhibition gallery featuring wooden flooring, a bamboo ceiling, wall-mounted historical panels, angled document counters, and a central gourd art sculpture.',
    image: 'https://i.postimg.cc/6qjfZqtr/Whats-App-Image-2026-09-10-at-09-18-44.jpg',
    content: 'ODU’A MUSEUM & HALL OF FAME was conceptualized by Odu’a Investment Company Limited on the upper levels of Cocoa House to reflect a memory of classical gild of history, technology, people and culture, arts and crafts as they relate to occupation and ingenuity of the past.\n\nThe exhibition gallery features wooden flooring, handcrafted bamboo ceilings, angled document reading counters, and an iconic central gourd art sculpture standing in the middle of the hall.\n\nThe gallery showcases:\n- Royal regalia & sacred beaded crowns\n- Traditional pottery and cooking utensils\n- Historical warfare implements and the 1886 Kiriji Peace Treaty\n- Memories of the past (vintage technology)\n- Hall of Fame honoring Yoruba achievers\n\nTo book a guided educational tour, please contact:\n- Victor (08035645584)\n- Seun (08157262452)',
    author: 'Museum Curators'
  },
  {
    id: '11',
    title: 'Yoruba Peace Treaty (1886) & Warfare Implements Showcase',
    category: 'Museum & Hall of Fame',
    date: '2025-06-24',
    summary: 'A two-tier museum display section featuring the top section titled "Yoruba Peace Treaty (1886)" with informational boards, and the bottom section labeled "Warfare Implements".',
    image: 'https://i.postimg.cc/fy2fdyDx/Whats-App-Image-2026-09-10-at-09-18-47.jpg',
    content: 'This dual-tier exhibit documents the conflict resolution and martial history of Western Nigeria. The top tier features informational boards and archival documents of the 1886 Kiriji/Ekiti-Parapo Peace Treaty that ended 16 years of war, while the lower glass case displays authentic blacksmith-forged flintlock muzzle rifles and combat iron blades.',
    author: 'Curator Staff'
  },
  {
    id: '12',
    title: 'Memories of the Past (Ohun Elo Igbà Atijó) — Vintage Technology',
    category: 'Museum & Hall of Fame',
    date: '2025-06-20',
    summary: 'A recessed wall exhibit titled "Memories of the Past (Ohun Elo Igbà Atijó)" featuring three shelves containing vintage technology items.',
    image: 'https://i.postimg.cc/RhsLth41/Whats-App-Image-2026-09-10-at-09-18-48.jpg',
    content: 'The "Ohun Elo Igbà Atijó" installation presents three illuminated shelves preserving historical communication and industrial items: an antique vacuum-tube television, manual typewriter, portable gramophone, rotary desk telephones, vintage cameras, and cast-iron manual sewing machines that shaped 20th-century daily life.',
    author: 'Heritage Curators'
  },
  {
    id: '13',
    title: 'Vintage Hand-Crank Gramophone & Vinyl Turntable Platter',
    category: 'Museum & Hall of Fame',
    date: '2025-06-18',
    summary: 'A close-up shot of an opened vintage black hand-crank gramophone with a vinyl record on the turntable platter and a sign reading "GRAMOPHONE".',
    image: 'https://i.postimg.cc/fy2fdyDY/Whats-App-Image-2026-09-10-at-09-18-50.jpg',
    content: 'This preserved wind-up mechanical gramophone played a vital role in capturing and distributing early Yoruba music, highlife recordings, and historic speeches on 78 RPM shellac and vinyl discs during the pre- and post-independence eras.',
    author: 'Sound & Audio Curators'
  },
  {
    id: '14',
    title: 'Hall of Fame: Chief M.K.O. Abiola & Chief Obafemi Awolowo Panels',
    category: 'Museum & Hall of Fame',
    date: '2025-06-15',
    summary: 'Biographical exhibit panels celebrating the towering leadership of Bashorun M.K.O. Abiola and Premier Obafemi Awolowo in the Hall of Fame room.',
    image: 'https://i.postimg.cc/VvGWtvmg/Whats-App-Image-2026-09-10-at-09-18-52.jpg',
    content: 'Visitors reflect before detailed biographical panels detailing Chief Obafemi Awolowo, architect of Cocoa House and visionary leader of Western Nigeria, and Chief Moshood Kashimawo Olawale (M.K.O.) Abiola, business pioneer and defender of Nigerian democratic sovereignty.',
    author: 'Hall of Fame Historians'
  },
  {
    id: '15',
    title: 'Guided Educational Tours: University College Hospital (UCH) Panel',
    category: 'Museum & Hall of Fame',
    date: '2025-06-12',
    summary: 'A museum tour guide in traditional tunic leading visitors through historical panels documenting the University College Hospital, Ibadan.',
    image: 'https://i.postimg.cc/rsnN4sMh/Whats-App-Image-2026-09-10-at-09-18-54.jpg',
    content: 'Knowledgeable museum docents dressed in cultural attire lead daily guided walkthroughs for students, tourists, and researchers. Featured here is the institutional archive detailing the foundation of University College Hospital (UCH) Ibadan, the first teaching hospital in Nigeria.',
    author: 'Museum Docent Team'
  },
  {
    id: '16',
    title: 'Traditional Yoruba Beaded Crown (Ade) with Bird Motifs & Strands',
    category: 'Museum & Hall of Fame',
    date: '2025-06-10',
    summary: 'A detailed sculpture of a traditional Yoruba beaded crown (Ade) crafted in yellow and orange beads with bird motifs and cascading veil strands.',
    image: 'https://i.postimg.cc/908Y90CL/Whats-App-Image-2026-09-10-at-09-18-55-(1).jpg',
    content: 'This sacred Ade Nla is intricately woven with yellow and amber seed beads. Perched bird figures (Eye) evoke spiritual vigilance and the ancestral power of motherhood, while cascading beaded strands drape downward to shield the monarch\'s sacred face during royal investitures.',
    author: 'Royal Regalia Curators'
  },
  {
    id: '17',
    title: 'Hall of Fame: Herbert Macaulay, Lt. Col. Fajuyi & Sapara Williams',
    category: 'Museum & Hall of Fame',
    date: '2025-06-08',
    summary: 'Wall panels detailing the heroic contributions of nationalist Herbert Macaulay, Gov. Adekunle Fajuyi, and pioneer lawyer Christopher Sapara Williams.',
    image: 'https://i.postimg.cc/VvGWtvmG/Whats-App-Image-2026-09-10-at-09-18-55.jpg',
    content: 'Honoring pioneers who exemplified Omoluabi integrity: Herbert Samuel Macaulay, founder of Nigerian nationalism; Lt. Colonel Francis Adekunle Fajuyi, revered military governor of Western Nigeria; and Christopher Alexander Sapara Williams, Nigeria\'s first indigenous lawyer (called to the Bar in 1888).',
    author: 'Biographical Archive'
  }
];

interface MediaProps {
  initialCategory?: string;
  onCategoryChange?: (category: string) => void;
  news?: NewsCard[];
  sidebarEnabled?: boolean;
  onNavigate?: (page: string) => void;
  primaryColor?: string;
}

export default function Media({
  initialCategory = 'All',
  onCategoryChange,
  news,
  sidebarEnabled,
  onNavigate,
  primaryColor
}: MediaProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedArticle, setSelectedArticle] = useState<NewsCard | null>(null);

  React.useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const categories = ['All', 'News & Events', 'Museum & Hall of Fame', 'Disclaimers'];

  // Filter logic based on search input and active category pills
  const activeNews = (news !== undefined && news !== null) ? news : mediaData;

  const filteredMedia = useMemo(() => {
    return activeNews.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeNews, searchQuery, selectedCategory]);

  const featuredArticle = activeNews[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 pb-16"
    >
      {/* WordPress-Style Header with Breadcrumbs */}
      <WordPressPageHeader
        title="Media & Corporate Insights"
        subtitle="Official press statements, corporate milestones, event briefs, and strategic narratives shaping economic progress in Southwest Nigeria."
        badge="Press & Newsroom"
        breadcrumbs={[
          { label: 'Media', page: 'Media' },
          { 
            label: selectedCategory === 'All' ? 'Latest Publications' : selectedCategory, 
            active: true 
          }
        ]}
        onNavigate={onNavigate || (() => {})}
        backgroundImage={HERO_BACKGROUNDS.media}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* Featured Story Spotlight */}
        {featuredArticle && searchQuery === '' && selectedCategory === 'All' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-16 bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 relative h-64 sm:h-96 lg:h-full min-h-[350px]">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Tag size={12} />
                Featured Highlight
              </div>
            </div>
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3 block">
                {featuredArticle.category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-4">
                {featuredArticle.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {featuredArticle.summary}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {featuredArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  3 min read
                </span>
              </div>
              <button 
                onClick={() => setSelectedArticle(featuredArticle)}
                className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold transition-all group w-fit"
              >
                Read Full Story 
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Dynamic Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search news, press releases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Dedicated Museum Experience Callout Banner */}
        {selectedCategory === 'Museum & Hall of Fame' && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-neutral-900 to-neutral-950 text-white border border-emerald-800/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#fce303]">
                <span>🏛️ Living Yoruba Heritage Sanctuary</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
                Odu'a Museum & Hall of Fame at Cocoa House
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                Explore the complete interactive virtual gallery featuring all 8 authentic photographic exhibits, curatorial breakdowns, Omoluabi induction criteria, and guided tour reservations on Floor 24 of Cocoa House.
              </p>
            </div>
            <button
              onClick={() => onNavigate?.('Museum and Hall Of Fame')}
              className="px-5 py-3 rounded-xl bg-[#fce303] hover:bg-[#ebd302] text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Explore Full Museum Page</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* News & Releases Grid Container */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMedia.map((item) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-900 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {item.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {item.summary}
                  </p>
                  <button 
                    onClick={() => setSelectedArticle(item)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer group mt-auto"
                  >
                    Read Detailed Post
                    <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search / Filter State */}
        {filteredMedia.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200"
          >
            <div className="inline-flex p-4 bg-slate-50 text-slate-400 rounded-full mb-4">
              <BookOpen size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No media elements match</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              We couldn't find any press releases or news matching your query. Try selecting another filter tag or editing your search.
            </p>
          </motion.div>
        )}

        {/* Interactive Detailed Modal View */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
              onClick={() => setSelectedArticle(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 sm:h-80 w-full">
                  <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/75 p-2 rounded-full cursor-pointer transition-colors"
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6 sm:p-10">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="bg-emerald-50 text-emerald-800 font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                      {selectedArticle.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar size={13} />
                      {selectedArticle.date}
                    </span>
                    {selectedArticle.author && (
                      <span className="text-xs text-slate-400">
                        • Written by {selectedArticle.author}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
                    {selectedArticle.title}
                  </h2>
                  <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 border-t border-slate-100 pt-6">
                    <p className="font-semibold text-slate-800">
                      {selectedArticle.summary}
                    </p>
                    <p>
                      {selectedArticle.content || 'Detailed report text is currently compiled within internal databases. Please check back shortly as corporate archives are updated.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}