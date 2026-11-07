// Mock plant data for ALMOST EXTINCT
// Note: Population figures and conservation statuses are for demonstration purposes.
// Real data should be verified against IUCN Red List and primary sources.

export const MAX_CAPACITY = 50;

export const plants = [
  {
    id: 1,
    common_name: "Corpse Lily",
    scientific_name: "Rafflesia arnoldii",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    short_description: "The world's largest individual flower, blooming only for days in the rainforests of Sumatra and Borneo.",
    full_description: "Rafflesia arnoldii is a parasitic plant found in the rainforests of Sumatra and Borneo. It produces the largest individual flower of any flowering plant, reaching up to 1 metre in diameter and weighing up to 11 kg. The plant has no leaves, stems, or roots — it exists entirely as a parasite within the tissues of Tetrastigma vines. Its flower emits the smell of rotting flesh to attract carrion flies for pollination, earning it the common name 'corpse flower'. Blooms last only 5–7 days before decomposing. Habitat destruction and over-collection have made sightings increasingly rare.",
    estimated_population: 50,
    country: "Indonesia",
    habitat: "Tropical Rainforest",
    conservation_status: "CR",
    threats: ["Habitat destruction", "Illegal collection", "Host vine loss", "Forest fragmentation"],
    conservation_efforts: ["Protected area designation in Sumatra", "Community-based host vine conservation", "Ecotourism programmes to fund local protection"],
    interesting_facts: [
      "Has no roots, stems, or leaves — entire plant is the flower",
      "Takes up to 9 months to develop before blooming",
      "Bloom lasts only 5–7 days",
      "Female and male blooms must open simultaneously to pollinate, an extremely rare event"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-01-15",
    last_verified_at: "2024-06-01",
    approval_status: "approved"
  },
  {
    id: 2,
    common_name: "Kokia cookei",
    scientific_name: "Kokia cookei",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    short_description: "A Hawaiian tree known from a single surviving individual, grafted onto a related species to prevent total extinction.",
    full_description: "Kokia cookei is one of the rarest plants on Earth. Native to the Hawaiian island of Moloka'i, this small tree was discovered in 1860 and has been reduced to a single surviving individual. The last wild tree burned in a fire in 1978; the sole remaining plant exists as a graft on a related species at the Waimea Arboretum on O'ahu. Conservation efforts have produced a small number of grafted specimens, but natural reproduction remains essentially impossible. Its brilliant red tubular flowers once attracted native Hawaiian honeycreepers as pollinators.",
    estimated_population: 3,
    country: "United States (Hawaiʻi)",
    habitat: "Dry Forest",
    conservation_status: "CR",
    threats: ["Habitat loss", "Fire", "Loss of native pollinators", "Invasive species"],
    conservation_efforts: ["Ex-situ grafting at Waimea Arboretum", "Seed banking", "Botanical garden cultivation"],
    interesting_facts: [
      "The last wild individual burned in a fire in 1978",
      "All surviving individuals are grafts from that single tree",
      "Native honeycreeper pollinators are themselves endangered"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-01-20",
    last_verified_at: "2024-05-10",
    approval_status: "approved"
  },
  {
    id: 3,
    common_name: "Dragon Blood Tree",
    scientific_name: "Dracaena cinnabari",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    short_description: "An otherworldly umbrella-shaped tree producing blood-red resin, native only to Yemen's Socotra Archipelago.",
    full_description: "Dracaena cinnabari is a remarkable tree endemic to the Socotra Archipelago of Yemen, often described as one of the most alien-looking plants on Earth. Its distinctive umbrella-shaped canopy is an adaptation to the arid, cloud-shrouded highlands of Socotra. The tree produces a deep crimson resin known as 'dragon's blood,' prized since ancient times as a dye, medicine, and varnish. Climate change is altering the monsoon patterns that the trees depend on for moisture, and cyclones have caused widespread destruction in recent years. Regeneration rates are dangerously slow.",
    estimated_population: 300,
    country: "Yemen",
    habitat: "Subtropical Dry Shrubland",
    conservation_status: "VU",
    threats: ["Climate change", "Cyclone damage", "Overgrazing", "Reduced fog and rainfall", "Conflict-related instability"],
    conservation_efforts: ["UNESCO World Heritage site designation for Socotra", "Seed banking", "International research collaborations"],
    interesting_facts: [
      "Its canopy acts like a giant umbrella to collect fog moisture",
      "The red resin was believed in ancient times to be dragon's blood",
      "Trees can live for hundreds of years",
      "Socotra has been called the 'Galápagos of the Indian Ocean'"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-02-05",
    last_verified_at: "2024-06-15",
    approval_status: "approved"
  },
  {
    id: 4,
    common_name: "Western Underground Orchid",
    scientific_name: "Rhizanthella gardneri",
    image: "https://images.unsplash.com/photo-1490750967868-88df5691166a?w=800&q=80",
    short_description: "A completely subterranean orchid that spends its entire life underground, never emerging into sunlight.",
    full_description: "Rhizanthella gardneri is one of the most extraordinary plants ever discovered. It is entirely subterranean — it flowers, pollinates, and sets seed completely underground, never emerging into the light. The plant was first discovered in Western Australia in 1928 when a farmer was ploughing a field. It is parasitic on the mycorrhizal fungi that associate with broom bush (Melaleuca uncinata) shrubs. Flowers are tiny, clustered into a head just below the soil surface, and are believed to be pollinated by insects attracted by scent. Only around 50 populations are known, with many in serious decline.",
    estimated_population: 50,
    country: "Australia",
    habitat: "Mallee Shrubland",
    conservation_status: "CR",
    threats: ["Land clearing", "Altered fire regimes", "Fungal host disruption", "Agricultural expansion"],
    conservation_efforts: ["Protected reserves in Western Australia", "Research into underground propagation", "Land management agreements with private landholders"],
    interesting_facts: [
      "Spends its entire life cycle underground — the only known orchid to do so",
      "Cannot photosynthesize — entirely dependent on fungal hosts",
      "Was unknown to science until 1928",
      "Flowers can only be detected by trained searchers probing the soil"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-02-18",
    last_verified_at: "2024-04-30",
    approval_status: "approved"
  },
  {
    id: 5,
    common_name: "Café Marron",
    scientific_name: "Ramosmania rodriguesii",
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80",
    short_description: "Rediscovered by a schoolboy on Rodrigues Island after being declared extinct — now the last of its kind.",
    full_description: "Ramosmania rodriguesii, known as Café Marron, was thought to be completely extinct until 1980, when a schoolboy found a solitary surviving individual on the tiny island of Rodrigues in the Indian Ocean. This single tree, sheltered and intensively protected ever since, remains the only known individual of the species. The Royal Botanic Gardens, Kew, has successfully propagated the plant through cuttings and micropropagation, keeping it from immediate extinction. The species produces attractive white flowers and was formerly used by islanders as a cold remedy.",
    estimated_population: 1,
    country: "Mauritius (Rodrigues Island)",
    habitat: "Island Subtropical Forest",
    conservation_status: "CR",
    threats: ["Habitat destruction", "Invasive species", "Historically only one wild individual known"],
    conservation_efforts: ["Propagation programme at Kew Gardens", "Reintroduction trials on Rodrigues", "Seedbank preservation"],
    interesting_facts: [
      "Only one wild individual has ever been confirmed",
      "Was rediscovered by a schoolboy who showed his teacher a pressed specimen",
      "Kew Gardens produced viable cuttings after years of failed attempts",
      "Has been reintroduced in small numbers to Rodrigues"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-03-01",
    last_verified_at: "2024-05-20",
    approval_status: "approved"
  },
  {
    id: 6,
    common_name: "Wood's Cycad",
    scientific_name: "Encephalartos woodii",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
    short_description: "Possibly the loneliest plant on Earth — no female has ever been found, making natural reproduction impossible.",
    full_description: "Encephalartos woodii holds the tragic distinction of being the loneliest plant on Earth. Only a single clump of male plants was ever found, in a forest in KwaZulu-Natal, South Africa, in 1895. No female plant of this species has ever been discovered. Without a female, natural sexual reproduction is impossible. The original plants were removed to botanical gardens, and all living specimens today are offsets of that single original clump — genetically identical. Unless a female is discovered in the wild (considered extremely unlikely), the species cannot sexually reproduce. It is preserved in botanic gardens worldwide.",
    estimated_population: 7,
    country: "South Africa",
    habitat: "Afromontane Forest",
    conservation_status: "CR",
    threats: ["No female plant ever found", "Cannot reproduce sexually", "Original habitat destroyed"],
    conservation_efforts: ["Living collections maintained at Kew and Durban Botanic Gardens", "Genetic research into creating female through hybridization", "Protected status in South Africa"],
    interesting_facts: [
      "No female has ever been found — the entire species is male",
      "All living specimens are clones of a single plant discovered in 1895",
      "Cycads are living fossils — relatives date back 280 million years",
      "May be the rarest plant on Earth in terms of genetic diversity"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-03-10",
    last_verified_at: "2024-06-01",
    approval_status: "approved"
  },
  {
    id: 7,
    common_name: "Pennantia baylisiana",
    scientific_name: "Pennantia baylisiana",
    image: "https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=80",
    short_description: "Once recognised as the world's rarest tree — a single female plant surviving on New Zealand's Three Kings Islands.",
    full_description: "Pennantia baylisiana was identified as the world's rarest tree by the Guinness Book of Records following the discovery that only a single specimen existed on the remote Three Kings Islands of New Zealand. The tree was first collected by botanist G.T.S. Baylis in 1945. The lone individual is female and cannot self-fertilise, though cuttings taken to botanic gardens have allowed propagation. Reintroduction programmes have planted specimens on the Three Kings Islands and at secure mainland sites. Its small white flowers and black berries are characteristic of the genus.",
    estimated_population: 2,
    country: "New Zealand",
    habitat: "Coastal Forest",
    conservation_status: "CR",
    threats: ["Historically single individual in the wild", "Invasive species", "Extreme geographic isolation"],
    conservation_efforts: ["Ex-situ propagation at New Zealand gardens", "Reintroduction to Three Kings Islands", "Pest control programmes"],
    interesting_facts: [
      "Recognised by Guinness World Records as the world's rarest tree",
      "Only a single individual was found on the remote Three Kings Islands",
      "The islands are uninhabited and difficult to access",
      "Successfully propagated from cuttings taken in the 1980s"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-03-22",
    last_verified_at: "2024-05-15",
    approval_status: "approved"
  },
  {
    id: 8,
    common_name: "Ghost Orchid",
    scientific_name: "Dendrophylax lindenii",
    image: "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=800&q=80",
    short_description: "A leafless, rootless orchid that appears to float in mid-air in the cypress swamps of Florida and Cuba.",
    full_description: "The Ghost Orchid is one of the most elusive and mysterious plants in North America. It has no leaves and no visible roots — it clings to the bark of pond apples and pop ash trees with photosynthetic roots that are almost invisible against the bark. The plant produces ethereal white flowers that appear to float in mid-air, blooming only briefly in summer. Ghost orchids depend entirely on their host trees and on giant sphinx moths for pollination. Florida's population is estimated at around 2,000 plants, though many have never bloomed. Poaching and habitat drainage have caused severe decline.",
    estimated_population: 2000,
    country: "United States (Florida), Cuba",
    habitat: "Swamp Forest",
    conservation_status: "EN",
    threats: ["Poaching", "Habitat drainage", "Altered hydrology", "Air plant collection pressure"],
    conservation_efforts: ["Corkscrew Swamp Sanctuary protection in Florida", "Tissue culture propagation programmes", "Anti-poaching enforcement"],
    interesting_facts: [
      "Has no leaves — photosynthesis occurs entirely through its roots",
      "Blooms can last 1–2 weeks, usually in July and August",
      "Pollinated exclusively by the giant sphinx moth",
      "Subject of Susan Orleans' acclaimed book 'The Orchid Thief'"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-04-01",
    last_verified_at: "2024-06-10",
    approval_status: "approved"
  },
  {
    id: 9,
    common_name: "Jellyfish Tree",
    scientific_name: "Medusagyne oppositifolia",
    image: "https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=800&q=80",
    short_description: "A bizarre and ancient tree once thought extinct, surviving in tiny numbers on granitic rocky slopes in the Seychelles.",
    full_description: "The Jellyfish Tree is so extraordinary that it forms its own family, Medusagynaceae, containing just this single species. Endemic to the Seychelles, it was believed extinct for much of the 20th century until rediscovered in the 1970s. The tree grows on exposed rocky slopes of granitic mountains on Mahé and two other islands. Its seed capsules open in a star shape resembling a jellyfish, giving rise to its common name. Despite successful cultivation in botanical gardens worldwide, the wild population remains critically small. The species produces small white flowers and has unusually ancient evolutionary origins.",
    estimated_population: 86,
    country: "Seychelles",
    habitat: "Granitic Rocky Slope",
    conservation_status: "CR",
    threats: ["Invasive plant species", "Habitat degradation", "Extremely low population", "Seed germination difficulties"],
    conservation_efforts: ["Botanical garden cultivation worldwide", "In-situ habitat protection", "Research into seed germination requirements"],
    interesting_facts: [
      "Forms its own plant family — the only species in Medusagynaceae",
      "Seed capsules open like a jellyfish spreading its tentacles",
      "Believed extinct until rediscovered in the 1970s",
      "One of the rarest plant families on Earth"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-04-10",
    last_verified_at: "2024-05-28",
    approval_status: "approved"
  },
  {
    id: 10,
    common_name: "Suicide Palm",
    scientific_name: "Tahina spectabilis",
    image: "https://images.unsplash.com/photo-1543699565-003b8adda5fc?w=800&q=80",
    short_description: "A towering palm that grows for decades, flowers once in a spectacular mass event, then dies — discovered only in 2008.",
    full_description: "Tahina spectabilis, the Suicide Palm, was entirely unknown to science until 2008 when a French cashew farmer stumbled across a gigantic dying palm in a remote corner of Madagascar. The plant grows slowly for decades, reaching heights of 18 metres, then produces a spectacular terminal inflorescence — a 5-metre branching flowering structure bearing thousands of tiny flowers. After this single flowering event, the entire plant exhausts its resources and dies. When first described, only around 92 adult palms were known. Its spectacular and tragic life cycle makes it one of the most dramatic plants on Earth.",
    estimated_population: 92,
    country: "Madagascar",
    habitat: "Dry Deciduous Forest",
    conservation_status: "CR",
    threats: ["Deforestation", "Agricultural expansion", "Extremely small range", "Slow reproductive cycle"],
    conservation_efforts: ["IUCN assessment and protection", "Seed distribution to botanical gardens", "International conservation attention since discovery"],
    interesting_facts: [
      "Completely unknown to science until 2008",
      "Flowers once in its entire lifetime, then dies",
      "The inflorescence can be seen from aircraft when in bloom",
      "Seeds were distributed to botanical gardens worldwide immediately after discovery"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-04-18",
    last_verified_at: "2024-06-05",
    approval_status: "approved"
  },
  {
    id: 11,
    common_name: "Middlemist's Red",
    scientific_name: "Camellia 'Middlemist's Red'",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80",
    short_description: "Possibly the world's rarest garden plant — only two confirmed specimens exist, one in New Zealand, one in England.",
    full_description: "Middlemist's Red is believed to be the rarest garden plant in the world. It was brought from China to England by botanist John Middlemist in 1804, but has since become extinct in its native China. Today only two confirmed specimens are known to exist: one in the Chiswick House Gardens in London, England, and one at Camellia Grove Arboretum in New Zealand. The plant produces deep rose-pink (not truly red) blooms of exceptional beauty. It represents a living fragment of a lost botanical heritage, entirely dependent on human cultivation for its continued existence.",
    estimated_population: 2,
    country: "United Kingdom / New Zealand (original: China)",
    habitat: "Cultivated (originally subtropical forest)",
    conservation_status: "CR",
    threats: ["Extinct in native range (China)", "Entirely dependent on cultivation", "Disease risk to two known specimens"],
    conservation_efforts: ["Careful cultivation at Chiswick House and Camellia Grove Arboretum", "Propagation attempts from cuttings"],
    interesting_facts: [
      "Extinct in its native China — survives only in cultivation",
      "Only two known specimens exist in the world",
      "Brought to England by John Middlemist in 1804",
      "Despite its name, the flowers are deep rose-pink rather than red"
    ],
    reference_url: "https://www.rhs.org.uk/",
    created_at: "2024-04-25",
    last_verified_at: "2024-05-30",
    approval_status: "approved"
  },
  {
    id: 12,
    common_name: "Venda Cycad",
    scientific_name: "Encephalartos hirsutus",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    short_description: "A critically endangered cycad from South Africa's Limpopo province, with adults numbered in the dozens in the wild.",
    full_description: "Encephalartos hirsutus is one of South Africa's rarest cycads, endemic to a tiny area of Limpopo province in the Vhembe district, historically associated with Venda culture. Wild populations have been devastated by illegal poaching for the lucrative cycad collector market. Adult individuals in the wild are now numbered in the dozens. The species is characterised by densely hairy (hirsute) leaf bases and a compact trunk. South African cycads are among the most heavily poached plants in the world, with specimens fetching thousands of dollars on black markets.",
    estimated_population: 40,
    country: "South Africa",
    habitat: "Bushveld / Rocky Slopes",
    conservation_status: "CR",
    threats: ["Illegal poaching for collectors", "Habitat degradation", "Slow reproduction", "Commercial over-collection"],
    conservation_efforts: ["SANBI cycad conservation programme", "Law enforcement and anti-poaching units", "Microchipping of wild specimens", "Botanical garden propagation"],
    interesting_facts: [
      "Individual specimens sell for thousands of dollars on the black market",
      "Wild adults can be counted in the dozens",
      "South Africa has one of the world's highest cycad extinction risks",
      "Cycads have survived since the age of dinosaurs but face poaching extinction"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-05-02",
    last_verified_at: "2024-06-01",
    approval_status: "approved"
  },
  {
    id: 13,
    common_name: "Franklin Tree",
    scientific_name: "Franklinia alatamaha",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    short_description: "Extinct in the wild since 1803, every living Franklin Tree descends from seeds collected before its disappearance.",
    full_description: "Franklinia alatamaha is one of the most poignant stories in botanical history. This beautiful flowering tree, with its large white blossoms and spectacular autumn foliage, was discovered in 1765 by botanists John and William Bartram along the Altamaha River in Georgia. It was last seen in the wild in 1803 and is now considered extinct in its natural habitat. Every single living Franklin Tree today descends from seeds collected by the Bartrams before its disappearance. The cause of its wild extinction remains unknown, though theories include a water-borne pathogen. It survives only in cultivation.",
    estimated_population: 0,
    country: "United States (Georgia) — Extinct in Wild",
    habitat: "Riverine Forest (now extinct in wild)",
    conservation_status: "CR",
    threats: ["Unknown cause of wild extinction (pre-1803)", "Potential fungal pathogen", "No wild population remains"],
    conservation_efforts: ["Cultivation in botanical gardens worldwide", "Research into historical habitat", "Potential future reintroduction studies"],
    interesting_facts: [
      "Last seen in the wild in 1803 — no one knows why it disappeared",
      "Every living specimen descends from seeds the Bartrams collected",
      "Named after Benjamin Franklin by the Bartram family",
      "Produces beautiful white camellia-like flowers in late summer"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-05-10",
    last_verified_at: "2024-05-25",
    approval_status: "approved"
  },
  {
    id: 14,
    common_name: "Cuban Mahogany",
    scientific_name: "Swietenia mahagoni",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    short_description: "The original mahogany of fine furniture and shipbuilding, now critically endangered from centuries of exploitation.",
    full_description: "Swietenia mahagoni is the original 'true mahogany' — the timber that furnished European palaces and shipyards for centuries. Native to southern Florida and the Caribbean islands, this magnificent hardwood tree was logged so heavily from the 16th century onwards that it was commercially extinct in most of its range by the 1900s. Wild populations are now fragmented and critically small. The species produces large pinnate leaves and distinctive winged seeds. Conservation is complicated by its historical role as an economically valuable timber species, with significant pressure from illegal logging continuing today.",
    estimated_population: 200,
    country: "Cuba, Bahamas, United States (Florida)",
    habitat: "Tropical Dry Forest / Coastal Hammock",
    conservation_status: "EN",
    threats: ["Historical overharvesting", "Illegal logging", "Habitat conversion", "Invasive species", "Hurricane damage"],
    conservation_efforts: ["CITES Appendix II listing", "Protected forests in Cuba", "Florida Keys forest restoration", "Sustainable forestry certification"],
    interesting_facts: [
      "The original 'true mahogany' — different from other mahogany species",
      "Used in Stradivarius violins and 18th-century furniture",
      "Logged to commercial extinction across most of its range before 1900",
      "Florida's remaining hammock trees are among the largest in existence"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-05-15",
    last_verified_at: "2024-06-10",
    approval_status: "approved"
  },
  {
    id: 15,
    common_name: "Bois Dentelle",
    scientific_name: "Elaeocarpus bojeri",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
    short_description: "Among the world's rarest trees, bearing delicate lace-like white flowers, found only on Mauritius's Black River Gorges.",
    full_description: "Elaeocarpus bojeri, known as Bois Dentelle (French for 'lace wood'), is considered one of the rarest trees in the world. Only two mature individuals are known to survive in the wild, both located in the cloud forests of Black River Gorges National Park in Mauritius. The tree produces extraordinarily beautiful white flowers with finely fringed petals resembling delicate lacework, giving it its evocative common name. Its forest has been severely degraded by invasive species, particularly Chinese Guava. Conservation organisations have propagated the species and planted seedlings, but the wild population remains perilously small.",
    estimated_population: 2,
    country: "Mauritius",
    habitat: "Upland Cloud Forest",
    conservation_status: "CR",
    threats: ["Invasive plant species (especially Chinese Guava)", "Habitat degradation", "Extremely low wild population", "Loss of native pollinators"],
    conservation_efforts: ["Black River Gorges National Park protection", "Propagation and replanting by Mauritian Wildlife Foundation", "Invasive species removal programmes"],
    interesting_facts: [
      "Only two mature wild individuals are known",
      "Flowers have intricate fringed petals resembling lace",
      "The surrounding forest has been severely degraded by invasive species",
      "'Bois Dentelle' means 'lace wood' in French"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-05-22",
    last_verified_at: "2024-06-01",
    approval_status: "approved"
  },
  {
    id: 16,
    common_name: "Attenborough's Pitcher Plant",
    scientific_name: "Nepenthes attenboroughii",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    short_description: "A giant carnivorous pitcher plant named after Sir David Attenborough, capable of trapping small vertebrates.",
    full_description: "Nepenthes attenboroughii is one of the largest carnivorous plants in the world, named in honour of naturalist Sir David Attenborough. Discovered in 2007 on the summit of Mount Victoria in Palawan, Philippines, this remarkable pitcher plant produces pitchers large enough to trap and digest not only insects, but also small vertebrates including rats and frogs. The species grows only on the exposed ultramafic (serpentine) summit of a single mountain, an extremely restricted range. Its discovery came from reports by Christian missionaries who had climbed the mountain years earlier. The summit is remote and extremely difficult to access.",
    estimated_population: 100,
    country: "Philippines",
    habitat: "Ultramafic Summit Scrub",
    conservation_status: "CR",
    threats: ["Extremely restricted range (single mountain summit)", "Illegal collection", "Climate change effects on montane habitats", "Poaching for collectors"],
    conservation_efforts: ["IUCN recognition", "Philippine government protected area", "Botanical garden cultivation"],
    interesting_facts: [
      "Named after Sir David Attenborough in 2009",
      "Pitchers can trap and digest small rats and frogs",
      "Grows only on one mountain summit in the Philippines",
      "Discovered from missionary reports before a scientific expedition was mounted"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-05-28",
    last_verified_at: "2024-06-15",
    approval_status: "approved"
  },
  {
    id: 17,
    common_name: "Haleakalā Silversword",
    scientific_name: "Argyroxiphium sandwicense",
    image: "https://images.unsplash.com/photo-1504892381033-98d7f1ca4c6e?w=800&q=80",
    short_description: "A stunning rosette of silver leaves on the summit of Haleakalā volcano — it blooms once then dies, like the stars it resembles.",
    full_description: "The Haleakalā Silversword is one of Hawaiʻi's most iconic plants, found only on the summit of Haleakalā volcano on the island of Maui, at elevations of 2,100–3,050 metres. Its dense rosette of silver-haired leaves reflects sunlight and may help regulate temperature in the extreme volcanic environment. The plant grows for 10–90 years before producing a single spectacular flowering stalk bearing hundreds of purple composite flowers, then dying. It was nearly eliminated in the late 19th and early 20th centuries by cattle and goats. Conservation efforts have dramatically increased numbers from a low of several thousand.",
    estimated_population: 60000,
    country: "United States (Hawaiʻi)",
    habitat: "Alpine Volcanic Desert",
    conservation_status: "VU",
    threats: ["Climate change reducing summit cloud cover", "Invasive species", "Altered fire regimes", "Fungal disease"],
    conservation_efforts: ["Haleakalā National Park protection", "Fencing to exclude ungulates", "Hand-pollination programmes", "Active restoration planting"],
    interesting_facts: [
      "Lives 10–90 years before flowering once, then dying",
      "Silver hairs reflect intense volcanic summit sunlight",
      "Recovered from near-extinction through intensive conservation",
      "Related to the Hawaiian silversword alliance — a remarkable example of adaptive radiation"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-06-01",
    last_verified_at: "2024-06-20",
    approval_status: "approved"
  },
  {
    id: 18,
    common_name: "Antarctic Pearlwort",
    scientific_name: "Colobanthus quitensis",
    image: "https://images.unsplash.com/photo-1491466424936-e304919aada7?w=800&q=80",
    short_description: "One of only two flowering plants that survive on the Antarctic continent, clinging to life in one of Earth's harshest environments.",
    full_description: "Colobanthus quitensis, the Antarctic Pearlwort, is one of only two native flowering plants that survive on the Antarctic continent (the other being Antarctic Hair Grass). Found on the Antarctic Peninsula and subantarctic islands, this tiny cushion-forming plant endures months of complete darkness, freezing temperatures, and intense UV radiation. Climate change is paradoxically expanding its range in some areas while threatening the ecosystem balance. The plant produces tiny, almost invisible yellowish-white flowers. It represents the extreme limit of flowering plant survival on Earth and is a critical indicator species for climate monitoring.",
    estimated_population: 100000,
    country: "Antarctica / Subantarctic Islands",
    habitat: "Antarctic Coastal Rock",
    conservation_status: "LC",
    threats: ["Climate change", "Increased UV-B radiation", "Tourism disturbance", "Ecosystem disruption"],
    conservation_efforts: ["Antarctic Treaty System protection", "Scientific monitoring programmes", "Tourism site management"],
    interesting_facts: [
      "One of only two flowering plants native to Antarctica",
      "Produces tiny yellowish-white flowers smaller than a grain of rice",
      "Can survive being frozen solid",
      "Its range is expanding southward due to climate warming"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-06-05",
    last_verified_at: "2024-06-20",
    approval_status: "approved"
  },
  {
    id: 19,
    common_name: "Coco de Mer",
    scientific_name: "Lodoicea maldivica",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    short_description: "Produces the largest seed of any plant on Earth — a mysterious giant nut that washes ashore on distant beaches, its origin once unknown.",
    full_description: "Lodoicea maldivica, the Coco de Mer, is native to just two islands in the Seychelles: Praslin and Curieuse. It produces the largest seed of any plant on Earth — a double coconut that can weigh up to 25 kg. For centuries, the nuts were found washed ashore across the Indian Ocean and were believed to come from a mysterious underwater palm, giving rise to legends and commanding extravagant prices as curiosities. The palm grows extremely slowly and produces seeds only once every 25 years or so. Only around 8,000 mature individuals are estimated to exist in the wild.",
    estimated_population: 8000,
    country: "Seychelles",
    habitat: "Palm Forest",
    conservation_status: "VU",
    threats: ["Restricted native range (two islands)", "Poaching of seeds", "Habitat degradation", "Fire", "Invasive species"],
    conservation_efforts: ["Vallée de Mai Nature Reserve (UNESCO World Heritage)", "Controlled seed harvesting licences", "Replanting programmes"],
    interesting_facts: [
      "Produces the largest seed of any plant — up to 25 kg",
      "Takes 25 years to produce its first seed after germination",
      "Nuts were found on distant beaches for centuries before the source was discovered",
      "The double-lobed seed was associated with the mythical 'sea coconut'"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-06-08",
    last_verified_at: "2024-06-20",
    approval_status: "approved"
  },
  {
    id: 20,
    common_name: "Texas Wild Rice",
    scientific_name: "Zizania texana",
    image: "https://images.unsplash.com/photo-1468245856972-a0333f3f8293?w=800&q=80",
    short_description: "An aquatic grass found in just 1.5 kilometres of a single Texas river, one of the most range-restricted plants on Earth.",
    full_description: "Zizania texana, Texas Wild Rice, is one of the most endangered aquatic plants in North America. It is found only in the upper 1.5 kilometres of the San Marcos River in Hays County, Texas — one of the most geographically restricted ranges of any plant species on Earth. The plant requires the exceptionally clean, clear spring-fed waters of the San Marcos River. Urban development, water extraction, water quality degradation, and introduced species have all reduced its population. Despite its critical status, it maintains a small population thanks to intensive conservation work and the unique protected status of the San Marcos River.",
    estimated_population: 180,
    country: "United States (Texas)",
    habitat: "Spring-fed River",
    conservation_status: "CR",
    threats: ["Urban development", "Water extraction", "Herbicide runoff", "Invasive species", "Altered water flow"],
    conservation_efforts: ["USFWS recovery plan", "Seed banking", "In-river restoration work", "Water quality monitoring", "Legal protection of San Marcos River"],
    interesting_facts: [
      "Found only in 1.5 km of a single river in the entire world",
      "Requires exceptionally clean, spring-fed water",
      "One of North America's most geographically restricted plants",
      "The San Marcos River has been inhabited by humans for over 12,000 years"
    ],
    reference_url: "https://www.iucnredlist.org/",
    created_at: "2024-06-12",
    last_verified_at: "2024-06-20",
    approval_status: "approved"
  }
];

// Helper to get population classification
export function getPopulationClassification(population) {
  if (population === 0) return { label: "Extinct in Wild", color: "text-red-400", bg: "bg-red-900/40" };
  if (population <= 10) return { label: "Extremely Critical Population", color: "text-red-300", bg: "bg-red-900/50" };
  if (population <= 50) return { label: "Extremely Rare Population", color: "text-orange-300", bg: "bg-orange-900/40" };
  if (population <= 100) return { label: "Very Low Population", color: "text-yellow-300", bg: "bg-yellow-900/40" };
  return { label: `~${population.toLocaleString()} individuals`, color: "text-accent", bg: "bg-forest-light/40" };
}

// Helper to get conservation status info
export function getConservationStatusInfo(status) {
  const statuses = {
    CR: { label: "Critically Endangered", short: "CR", color: "text-red-300", bg: "bg-red-900/50", border: "border-red-800" },
    EN: { label: "Endangered", short: "EN", color: "text-orange-300", bg: "bg-orange-900/40", border: "border-orange-800" },
    VU: { label: "Vulnerable", short: "VU", color: "text-yellow-300", bg: "bg-yellow-900/40", border: "border-yellow-800" },
    NT: { label: "Near Threatened", short: "NT", color: "text-lime-300", bg: "bg-lime-900/30", border: "border-lime-800" },
    LC: { label: "Least Concern", short: "LC", color: "text-green-300", bg: "bg-green-900/30", border: "border-green-800" },
    DD: { label: "Data Deficient", short: "DD", color: "text-gray-300", bg: "bg-gray-800/40", border: "border-gray-700" },
    NE: { label: "Not Evaluated", short: "NE", color: "text-gray-400", bg: "bg-gray-800/30", border: "border-gray-700" },
  };
  return statuses[status] || statuses.NE;
}

export const CONSERVATION_STATUSES = ["CR", "EN", "VU", "NT", "LC", "DD", "NE"];
export const HABITATS = [...new Set(plants.map(p => p.habitat))];
export const COUNTRIES = [...new Set(plants.map(p => p.country.split(',')[0].trim()))];
