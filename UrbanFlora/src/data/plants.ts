import { Plant } from '../types';

export const plantsDatabase: Plant[] = [
  {
    id: 1,
    name: 'Gül',
    scientificName: 'Rosa spp.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    category: 'Süs bitkisi',
    desc: 'Gül, bahçelerin ve çiçek aranjmanlarının en klasik çiçeğidir. Sayısız türü ve renk seçeneği ile romantik bahçelerde, park düzenlemelerinde ve kesme çiçek olarak popülerdir. Yaprakları ve çiçekleri hem görsel hem de kokusal olarak estetik bir hava katar.',
    features: 'Dikenli gövdesi vardır, düzenli budama ve güneşli konum sever. Çay ve kozmetik ürünlerinde de gül yaprakları kullanılır.',
    rarity: 2
  },
  {
    id: 2,
    name: 'Lale',
    scientificName: 'Tulipa gesneriana',
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80',
    category: 'Süs bitkisi',
    desc: 'Lale, bahar aylarının simgesi olan soğanlı bir süs bitkisidir. Parlak renkli çiçekleri bahçelerde, parklarda ve sokak düzenlemelerinde sıklıkla kullanılır. Soğanları uygun koşullarda kışı geçirir ve sonraki ilkbaharda yeniden çiçek açar.',
    features: 'Güneşli ve iyi drene edilmiş toprakta en iyi şekilde gelişir. Kesme lale olarak da çiçek düzenlemelerinde tercih edilmektedir.',
    rarity: 2
  },
  {
    id: 3,
    name: 'Zambak',
    scientificName: 'Lilium',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
    category: 'Süs bitkisi',
    desc: 'Zambak, büyük ve gösterişli çiçekleriyle bilinen, ambiyans yaratan bir bahçe bitkisidir. Çoğu türde hoş bir koku taşır ve çiçekleri kesme çiçek olarak da kullanılır. Hem bahçede hem de saksıda yetiştirilebilir.',
    features: 'Nemli, iyi drene edilmiş toprak ve parlak gölgeyi sever. Bazı türleri zehirli öz su içerdiği için çocuklu ve evcil hayvanlı ortamlarda dikkat gerektirir.',
    rarity: 2
  },
  {
    id: 4,
    name: 'Menekşe',
    scientificName: 'Viola odorata',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    category: 'Süs bitkisi',
    desc: 'Menekşe, ince yaprakları ve küçük, zarif çiçekleriyle bahçe zemin örtüsü olarak kullanılan bir süs bitkisidir. Hafif tatlı bir kokusu vardır ve erken ilkbaharda çiçek açar. Soğuk havalara karşı dayanıklı türleri yaygındır.',
    features: 'Nemli, gölgeli alanlarda iyi yetişir. Yaprak ve çiçekleri bazı tariflerde yenilebilir süsleme amacıyla kullanılır.',
    rarity: 1
  },
  {
    id: 5,
    name: 'Karanfil',
    scientificName: 'Dianthus caryophyllus',
    image: 'https://images.unsplash.com/photo-1576016770956-debb63d900bb?auto=format&fit=crop&w=600&q=80',
    category: 'Süs bitkisi / Baharat',
    desc: 'Karanfil, gübreli toprakta yetişen, hoş kokulu pembe ve kırmızı çiçekleriyle bilinen bir süs bitkisidir. Kurutulmuş çiçek tomurcukları baharat olarak kullanılır ve sıcak içeceklere aroma verir. Ayrıca çiçeklerin hoş kokusu, bahçelere keyifli bir ortam katar.',
    features: 'Yarı gölge veya güneşli yerleri sever, düzenli sulama gerektirir. Baharat olarak kullanıldığında yemeklere baharatlı tat ve koku sağlar.',
    rarity: 2
  },
  {
    id: 6,
    name: 'Defne',
    scientificName: 'Laurus nobilis',
    image: 'https://images.unsplash.com/photo-1608797178974-15b35a61d121?auto=format&fit=crop&w=600&q=80',
    category: 'Baharat / Şifa bitkisi',
    desc: 'Defne, sert yapraklı çalı formunda bir bitki olup yemeklere aroma veren yapraklarıyla tanınır. Yaprakları genellikle çorba ve et yemeklerine eklenir, ayrıca mide ve sindirim desteği için çay olarak da kullanılabilir. Zeytin yağı ile uyumlu yetiştirilir ve Akdeniz iklimini sever.',
    features: 'Kuru ve güneşli ortamları tercih eder. Yaprakları çok yönlüdür, hem mutfakta hem de aromaterapide kullanılır.',
    rarity: 1
  },
  {
    id: 7,
    name: 'Lavanta',
    scientificName: 'Lavandula angustifolia',
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80',
    category: 'Şifa / Süs bitkisi',
    desc: 'Lavanta, hoş kokulu mor çiçekleri ve aromaterapik kullanımlarıyla tanınan bir şifa bitkisidir. Banyo tuzları, sabunlar ve uykuya yardımcı yağlar için idealdir. Aynı zamanda bahçede de uzun süreli çiçeklenme sağlar.',
    features: 'Güneşli, iyi drene edilmiş toprakta daha iyi gelişir. Kurutulmuş çiçekleri dekoratif amaçlı kullanılabilir ve arıları çeker.',
    rarity: 2
  },
  {
    id: 8,
    name: 'Nane',
    scientificName: 'Mentha',
    image: 'https://images.unsplash.com/photo-1594007624760-b6f7564d7df6?auto=format&fit=crop&w=600&q=80',
    category: 'Baharat / Şifa bitkisi',
    desc: 'Nane, taze ve ferah aromasıyla mutfaklarda sık kullanılan bir bitkidir. Çay, soslar ve salatalarda hem tat hem de ferahlık sağlar. Sindirimi rahatlatması ve mideyi yatıştırması için de tercih edilir.',
    features: 'Nemli toprak ve yarı gölge alanları sevdiği için balkon ve bahçede rahatça çoğalır. Sık tazelenmesi, güçlü lezzetini korumasına yardımcı olur.',
    rarity: 1
  },
  {
    id: 9,
    name: 'Kekik',
    scientificName: 'Thymus vulgaris',
    image: 'https://images.unsplash.com/photo-1532614338840-ab30cf10eb36?auto=format&fit=crop&w=600&q=80',
    category: 'Baharat / Şifa bitkisi',
    desc: 'Kekik, aromatik yapraklarıyla et yemekleri, çorbalar ve soslarda kullanılan geleneksel bir baharattır. Antibakteriyel özellikleri olduğu düşünüldüğü için doğal bir destek aracı olarak da kullanılır. Güçlü kokusu yemeklere karakter verir.',
    features: 'Güneşli ve iyi drene edilmiş topraklarda en iyi şekilde büyür. Kurutulduğunda aromasını uzun süre korur.',
    rarity: 1
  },
  {
    id: 10,
    name: 'Fesleğen',
    scientificName: 'Ocimum basilicum',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80',
    category: 'Baharat / Şifa bitkisi',
    desc: 'Fesleğen, Akdeniz mutfağının vazgeçilmez bitkisidir; pesto, salata ve makarnalarda kullanılır. Taze yaprakları güçlü bir aroma verir ve sindirime yardımcı olabilecek etken maddeler içerir. Evde saksıda kolayca yetiştirilir.',
    features: 'Sıcak ve güneşli yerleri sever, düzenli sulama ile canlı kalır. Böcekleri uzak tutmaya yardımcı olan doğal bir koku yayar.',
    rarity: 1
  },
  {
    id: 11,
    name: 'Reyhan',
    scientificName: 'Ocimum tenuiflorum',
    image: 'https://images.unsplash.com/photo-1628102371944-ff86e7a2e2d0?auto=format&fit=crop&w=600&q=80',
    category: 'Baharat',
    desc: 'Reyhan, hafif tatlı ve baharatlı bir aromaya sahip yapraklarıyla bilinir. Çaylarda, pilavlarda ve salatalarda lezzet katmak için kullanılır. Taze veya kurutulmuş olarak tüketilebilir.',
    features: 'Yarı gölgeli ve sıcak alanlarda en iyi şekilde gelişir. Yaprakları sıkça toplanarak taze lezzet taze tutulabilir.',
    rarity: 2
  },
  {
    id: 12,
    name: 'Isırgan Otu',
    scientificName: 'Urtica dioica',
    image: 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=600&q=80',
    category: 'Şifa bitkisi',
    desc: 'Isırgan otu, içeriğindeki vitamin ve minerallerle çay olarak tüketilen şifalı bir bitkidir. Cilt ve saç sağlığı için doğal destek olarak kullanılır. Taze toplandığında cilt üzerinde yakıcı etkisi olabilir; bu yüzden genelde kurutulur veya geniş mutfak ekipmanlarıyla haşlanır.',
    features: 'Nemli kumlu toprakları sever ve gölgeli alanlarda iyi yetişir. Kurutulduğunda faydalı çaylar demlenir.',
    rarity: 1
  },
  {
    id: 13,
    name: 'Ihlamur',
    scientificName: 'Tilia cordata',
    image: 'https://images.unsplash.com/photo-1596716075128-662f551c6e26?auto=format&fit=crop&w=600&q=80',
    category: 'Şifa bitkisi / Çayda kullanılır',
    desc: 'Ihlamur, çiçeksi bir aroma ve rahatlatıcı özellikleriyle bilinir. Yaprak ve çiçekleri çay halinde demlenir; uyku ve sinir sistemi üzerinde sakinleştirici etkisi olabilir. Soğuk algınlığı dönemlerinde tercih edilen doğal bir bitkidir.',
    features: 'Ağaç formunda büyür ve ilkbaharda çiçek açar. Kurutulmuş çiçekleri sıcak çaylara ilave edilir.',
    rarity: 2
  },
  {
    id: 14,
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis miller',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80',
    category: 'Şifa bitkisi',
    desc: 'Aloe vera, etli yaprakları ve cildi nemlendiren jeliyle tanınır. Yanıkların ve kuru cildin tedavisine yardımcı olarak doğal bakım ürünlerinde kullanılır. Sıcak iklimlerde yetişen bu bitki, evde minimum bakım gerektirir.',
    features: 'Doğrudan güneş alan iç mekanları sever, aşırı sulamadan kaçınılmalıdır. Yaprak jeli yara izlerinin görünümünü azaltmak için kullanılabilir.',
    rarity: 1
  },
  {
    id: 15,
    name: 'Kaktüs',
    scientificName: 'Cactaceae',
    image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80',
    category: 'Süs bitkisi',
    desc: 'Kaktüsler, az suyla yaşamalarını sürdürebilen dikkate değer süs bitkileridir. İç mekanlarda modern ve minimal bir görünüm sunar. Birçok türü rengarenk çiçekler açar ve saksı dekorasyonuna karakter katar.',
    features: 'Nadiren sulama yeterlidir; fazla su çürümeye neden olur. Güneşli pencere kenarlarında en iyi şekilde büyür.',
    rarity: 1
  },
  {
    id: 16,
    name: 'Çam',
    scientificName: 'Pinus',
    image: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&w=600&q=80',
    category: 'Ağaç / Orman bitkisi',
    desc: 'Çam, ormanların temel ağaç türlerinden biridir ve genellikle iğne yapraklıdır. Reçine, odun ve peyzaj amaçlı kullanımı yaygındır. Kuru topraklara dayanıklıdır ve dağlık alanlarda sıkça görülür.',
    features: 'Soğuğa dayanıklıdır ve nemli toprakları tercih eder. Kış mevsiminde de yeşil kalan yapraklarıyla peyzaja canlılık katar.',
    rarity: 1
  },
  {
    id: 17,
    name: 'Meşe',
    scientificName: 'Quercus',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
    category: 'Ağaç / Orman bitkisi',
    desc: 'Meşe, güçlü gövdesi ve uzun ömrüyle orman ekosistemlerinde önemli bir ağaç türüdür. Odunu mobilya ve inşaatta kullanılır. Sonbaharda yaprak döker, geniş bir gölge yüzeyi oluşturur.',
    features: 'Geniş alanlarda serbestçe büyür ve kök sistemi derindir. Yetişkin ağaçları yıllar içinde devasa boyutlara ulaşabilir.',
    rarity: 2
  },
  {
    id: 18,
    name: 'Kavak',
    scientificName: 'Populus',
    image: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=600&q=80',
    category: 'Ağaç / Orman bitkisi',
    desc: 'Kavak, hızlı büyüyen bir ağaç türü olarak su kenarlarında ve rüzgâr kıranlarında tercih edilir. Hafif odunu kontrplak ve kağıt üretiminde kullanılır. Genç dallarından yeni sürgünler kolaylıkla alınabilir.',
    features: 'Nemli ve sulak bölgeleri sever. Kısa süre içinde yüksek boylara ulaşır.',
    rarity: 1
  },
  {
    id: 19,
    name: 'Söğüt',
    scientificName: 'Salix',
    image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600&q=80',
    category: 'Ağaç / Orman bitkisi',
    desc: 'Söğüt, ince dalları ve eğimli gövdesiyle nehir kenarlarında yaygın bir ağaçtır. Hafif bir hava ve suya yakın alanları sever. Geleneksel olarak gölge ve yeşillik sağlar.',
    features: 'Suya yakın topraklarda en iyi şekilde büyür. Dal ve çubukları dokuma işlerinde kullanılabilir.',
    rarity: 1
  },
  {
    id: 20,
    name: 'Palmiye',
    scientificName: 'Arecaceae',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80',
    category: 'Tropikal bitki',
    desc: 'Palmiye, tropikal iklimlerde yaygın olarak büyüyen zarif bir bitkidir. Uzun, yelpaze şeklindeki yaprakları ve ince gövdesi ile hem iç mekan hem de dış mekan dekorasyonunda kullanılır. Sahil sıcaklıklarına dayanıklıdır.',
    features: 'Sıcak ve nemli ortamları sever. Kafe, plaza ve otel bahçelerinde sıkça tercih edilir.',
    rarity: 2
  },
  {
    id: 21,
    name: 'Yabani Papatya',
    scientificName: 'Matricaria chamomilla',
    image: 'https://images.unsplash.com/photo-1600077106724-946750eeaf3c?auto=format&fit=crop&w=600&q=80',
    category: 'Şifa bitkisi',
    desc: 'Yabani papatya, sakinleştirici etkisiyle bilinen doğal bir çay bitkisidir. Özellikle sindirimi destekleyen bir bitki olarak kullanılır.',
    features: 'Güneşli alanları sever. Toprağı hafif ve iyi drene edilmiş olmalıdır.',
    rarity: 1
  }
];

export const mapPlantsData: Plant[] = [
  {
    id: 1,
    name: 'Sakura (Süs Kirazı)',
    scientificName: 'Prunus serrulata',
    lat: 35.6762,
    lng: 139.6503,
    rarity: 3,
    category: 'Çiçekler',
    scope: 'global',
    distance: '8,950 km',
    date: '12 Haz 2026',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=600&q=80',
    desc: 'Sakura, ilkbaharda pembe çiçekleriyle doğayı süsleyen, Japon kültüründe yaşamın geçiciliğini ve yenilenmeyi simgeleyen büyüleyici bir ağaçtır.',
    uploader: {
      name: 'Yuto Takahashi',
      username: '@yuto_t',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      level: '18',
      followed: false
    }
  },
  {
    id: 2,
    name: 'Dev Sekoya Ağacı',
    scientificName: 'Sequoiadendron giganteum',
    lat: 37.7749,
    lng: -122.4194,
    rarity: 3,
    category: 'Ağaçlar',
    scope: 'global',
    distance: '10,210 km',
    date: '10 Haz 2026',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
    desc: 'Dev Sekoya, hacimsel olarak dünyanın en büyük ağaç türüdür. Binlerce yıl yaşayabilir ve devasa kırmızı gövdeleriyle bilinir.',
    uploader: {
      name: 'Emma Watson',
      username: '@emma_w',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      level: '15',
      followed: false
    }
  },
  {
    id: 3,
    name: 'Amazon Nilüferi',
    scientificName: 'Victoria amazonica',
    lat: -3.1190,
    lng: -60.0217,
    rarity: 3,
    category: 'Çiçekler',
    scope: 'global',
    distance: '10,870 km',
    date: '08 Haz 2026',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
    desc: 'Nymphaeaceae ailesinden dev bir su nilüferidir. Yaprakları 3 metre çapa ulaşabilir ve 40-50 kg ağırlığı taşıyabilir.',
    uploader: {
      name: 'Carlos Silva',
      username: '@carlos_s',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      level: '24',
      followed: false
    }
  },
  {
    id: 4,
    name: 'Kral Protea',
    scientificName: 'Protea cynaroides',
    lat: -33.9249,
    lng: 18.4241,
    rarity: 3,
    category: 'Çiçekler',
    scope: 'global',
    distance: '8,430 km',
    date: '11 Haz 2026',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
    desc: 'Güney Afrika\'nın ulusal çiçeğidir. Çapı 30 cm\'ye ulaşabilen büyük, çanak şeklindeki pembe ve kırmızı renkli çiçekleri vardır.',
    uploader: {
      name: 'Zola Ndlovu',
      username: '@zola_n',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      level: '19',
      followed: false
    }
  },
  {
    id: 5,
    name: 'Japon Gülü',
    scientificName: 'Hibiscus rosa-sinensis',
    lat: 40.9925,
    lng: 29.0345,
    rarity: 2,
    category: 'Çiçekler',
    scope: 'local',
    distance: '620m',
    date: '10 Haz 2026',
    image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80',
    desc: 'Egzotik görünümlü, büyük ve canlı renkli çiçekleriyle bilinen Japon Gülü, sıcak iklimleri seven, park ve bahçelerde sıkça yetiştirilen popüler bir çalı bitkisidir.',
    uploader: {
      name: 'Elif Yılmaz',
      username: '@elif_y',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      level: '16',
      followed: false
    }
  },
  {
    id: 6,
    name: 'Deve Tabanı (Monstera)',
    scientificName: 'Monstera deliciosa',
    lat: 40.9851,
    lng: 29.0388,
    rarity: 1,
    category: 'Çiçekler',
    scope: 'local',
    distance: '1.2km',
    date: '08 Haz 2026',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
    desc: 'Yapraklarındaki delikli ve yırtmaçlı karakteristik yapısıyla tanınan Deve Tabanı, kökeni Orta Amerika yağmur ormanları olan tropikal bir iç mekan bitkisidir.',
    uploader: {
      name: 'Zeynep Kaya',
      username: '@zeynep_k',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      level: '10',
      followed: false
    }
  },
  {
    id: 7,
    name: 'Tıbbi Lavanta',
    scientificName: 'Lavandula angustifolia',
    lat: 40.9962,
    lng: 29.0318,
    rarity: 1,
    category: 'Çiçekler',
    scope: 'local',
    distance: '530m',
    date: '11 Haz 2026',
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80',
    desc: 'Mor çiçek başakları ve dinlendirici kokusuyla bilinen Lavanta, kozmetik, tıp ve peyzaj alanında yaygın olarak kullanılan çok yıllık bir çalı bitkisidir.',
    uploader: {
      name: 'Caner Akın',
      username: '@caner_akin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      level: '12',
      followed: false
    }
  },
  {
    id: 8,
    name: 'İngiliz Sarmaşığı',
    scientificName: 'Hedera helix',
    lat: 40.9948,
    lng: 29.0232,
    rarity: 1,
    category: 'Ağaçlar',
    scope: 'local',
    distance: '380m',
    date: '13 Haz 2026',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80',
    desc: 'Her dem yeşil tırmanıcı bir sarmaşık türüdür. Duvarları ve ağaç gövdelerini kaplayarak kentsel alanlarda dikey yeşillendirme için sıklıkla tercih edilir.',
    uploader: {
      name: 'Ahmet Yılmaz',
      username: '@ahmet_y',
      avatar: 'https://images.unsplash.com/photo-1620122303020-43ec4b6cf7f8?auto=format&fit=crop&w=150&q=80',
      level: '8',
      followed: false
    }
  },
  {
    id: 9,
    name: 'Kestane Ağacı',
    scientificName: 'Castanea sativa',
    lat: 40.1826,
    lng: 29.0665,
    rarity: 1,
    category: 'Ağaçlar',
    scope: 'turkey',
    distance: '80 km',
    date: '10 Haz 2026',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
    desc: 'Bursa ve Marmara bölgesinin vazgeçilmezi olan Anadolu Kestanesi, sonbaharda verimliliğiyle ve görkemli gövdesiyle öne çıkar. Türkiye\'nin en önemli orman ağaçlarından biridir.',
    uploader: {
      name: 'Burak Demir',
      username: '@burak_d',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&q=80',
      level: '11',
      followed: false
    }
  },
  {
    id: 10,
    name: 'Toros Sediri',
    scientificName: 'Cedrus libani',
    lat: 37.0200,
    lng: 30.7156,
    rarity: 3,
    category: 'Ağaçlar',
    scope: 'turkey',
    distance: '450 km',
    date: '03 Haz 2026',
    image: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&w=600&q=80',
    desc: 'Toros Dağları\'nın görkemli sembolü ve Türkiye\'nin en önemli endemik ağaçlarından biri. 40 metre yüksekliğe ulaşan bu sedir türü, Lübnanlıların ulusal sembolüdür.',
    uploader: {
      name: 'Kemal Toros',
      username: '@kemal_t',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      level: '18',
      followed: false
    }
  }
];
