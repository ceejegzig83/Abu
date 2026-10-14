import {
  Project,
  NewsArticle,
  LegislativeActivity,
  CommunitySubmission,
  MediaItem,
  SiteSettings,
  AdminUser,
} from '../types';

export const initialSiteSettings: SiteSettings = {
  representativeName: 'Hon. Jibril Abu II',
  publicIdentity: 'Wisdombank',
  constituency: 'Ajaokuta Constituency, Kogi State',
  stateAssembly: 'Kogi State House of Assembly',
  committeeRole: 'Chairman, House Committee on Lands',
  tagline: 'Building Connections. Advancing Ajaokuta.',
  officialEmail: 'info@honjibrilabu.ng',
  officialPhone: '+234 (0) 800-AJAOKUTA',
  officeAddress: 'Constituency Liaison Office, Ajaokuta LGA, Kogi State, Nigeria',
  contactHours: 'Monday – Friday: 9:00 AM – 4:00 PM WAT',
  facebookUrl: 'https://www.facebook.com/ABU-JIBRIL-II',
  feedConfig: {
    provider: 'facebook',
    enabled: true,
    pageUrl: 'https://www.facebook.com/ABU-JIBRIL-II',
    pageName: 'ABU JIBRIL II',
    widgetId: '',
    showFallbackOnFailure: true,
  },
  emergencyNotice: '',
};

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    slug: 'ajaokuta-ultra-modern-hospital-initiative',
    title: 'Ajaokuta Ultra-Modern Hospital Initiative',
    category: 'Healthcare',
    summary:
      'Advocacy and planning framework for upgrading healthcare infrastructure and tertiary medical access in Ajaokuta Constituency.',
    description:
      'The Ajaokuta Ultra-Modern Hospital Initiative is a proposed legislative and stakeholder partnership aimed at addressing secondary and tertiary healthcare deficits within Ajaokuta. The project proposal emphasizes maternal health units, pediatric care facilities, emergency trauma response, and affordable community diagnostics for industrial and rural residents alike.',
    location: 'Ajaokuta Township / Adogo Axis, Kogi State',
    status: 'proposed',
    featured: true,
    publishedAt: '2025-01-15',
    updatedAt: '2025-02-10',
    targetBeneficiaries: 'Estimated 150,000+ residents across Ajaokuta LGA and transit corridors',
    verificationNote:
      'Content Draft: Proposed legislative intervention currently at the advocacy and stakeholder engagement phase. Status awaiting formal state executive capital appropriation.',
    evidenceUrls: [
      'https://kogistate.gov.ng',
      'https://kogistateassembly.gov.ng',
    ],
    progressUpdates: [
      {
        date: '2025-02-10',
        title: 'Community Needs Assessment Completed',
        description:
          'Consultative meetings held with local healthcare practitioners and community leaders on priority clinical facilities.',
      },
      {
        date: '2025-01-15',
        title: 'Preliminary Motion Drafted',
        description:
          'Motion on the rehabilitation and upgrading of health centers across Ajaokuta introduced on the floor of the Assembly.',
      },
    ],
  },
  {
    id: 'proj-2',
    slug: 'road-infrastructure-and-water-access',
    title: 'Road Infrastructure and Clean Water Access Program',
    category: 'Roads & Infrastructure',
    summary:
      'Comprehensive constituency assessment targeting strategic feeder road repairs and solar-powered motorized boreholes across rural wards.',
    description:
      'Access to potable drinking water and motorable farm-to-market roads remain high priorities for agricultural communities within Ajaokuta Constituency. This initiative documents community water points requiring rehabilitation and identifies priority arterial feeder roads connecting agrarian settlements to major markets.',
    location: 'Multiple Wards (Geregu, Upake, Adogo, Eganyi, Ebiya)',
    status: 'announced',
    featured: true,
    publishedAt: '2025-01-28',
    updatedAt: '2025-02-20',
    targetBeneficiaries: 'Agrarian communities, local traders, school pupils, and market women',
    verificationNote:
      'Content Draft: Announced program undergoing hydrological survey and engineering reconnaissance. Formal contracting details will be published upon verification.',
    evidenceUrls: [],
    progressUpdates: [
      {
        date: '2025-02-20',
        title: 'Water Point Survey Commenced',
        description:
          'Inspection teams identified 14 non-functional hand pumps across 6 wards for potential solar borehole conversion.',
      },
      {
        date: '2025-01-28',
        title: 'Program Scope Formulated',
        description:
          'Working group established with community youth leaders to map out high-traffic rural feeder roads.',
      },
    ],
  },
  {
    id: 'proj-3',
    slug: 'constituency-support-and-palliatives',
    title: 'Constituency Support and Palliative Distribution Initiative',
    category: 'Constituency Support',
    summary:
      'Targeted welfare packages, educational grants, and economic relief materials distributed directly to vulnerable families and students.',
    description:
      'In response to economic realities, the Office of Hon. Jibril Abu II conducts periodic constituency outreach drives providing staple food palliatives, academic bursaries for tertiary scholars, and support stipends for widows and aged constituents across all polling units in Ajaokuta.',
    location: 'Constituency-Wide (All 14 Wards of Ajaokuta LGA)',
    status: 'ongoing',
    featured: true,
    publishedAt: '2024-11-20',
    updatedAt: '2025-03-01',
    targetBeneficiaries: 'Widows, elderly citizens, students, and low-income households',
    verificationNote:
      'Verified ongoing outreach program administered through registered community ward coordinators.',
    evidenceUrls: [],
    progressUpdates: [
      {
        date: '2025-03-01',
        title: 'Quarter 1 Support Phase',
        description:
          'Distribution of educational notebooks, exam fee subsidies, and staple foods across Adogo and Geregu wards.',
      },
      {
        date: '2024-12-18',
        title: 'Year-End Community Outreach',
        description:
          'Festive season relief bags and emergency medical subsidies disbursed to over 1,200 vulnerable constituents.',
      },
    ],
  },
  {
    id: 'proj-4',
    slug: 'ajaokuta-land-tenure-security-advocacy',
    title: 'Ajaokuta Land Administration & Tenure Documentation Outreach',
    category: 'Land Administration',
    summary:
      'Public enlightenment campaigns and stakeholder dialog on land rights, customary tenure protection, and sustainable zoning in Kogi State.',
    description:
      'Under the leadership of Hon. Jibril Abu II as Chairman of the House Committee on Lands, this initiative engages customary landholders, industrial zones, and the State Bureau of Lands to ensure transparent boundary dispute resolutions and accessible land title registration.',
    location: 'Ajaokuta Urban and Peri-Urban Agricultural Corridors',
    status: 'ongoing',
    featured: false,
    publishedAt: '2024-10-12',
    updatedAt: '2025-02-15',
    targetBeneficiaries: 'Landowners, farmers, prospective industrial investors, and housing developers',
    verificationNote:
      'Legislative oversight and public consultation series anchored by the House Committee on Lands.',
    evidenceUrls: ['https://kogistateassembly.gov.ng'],
    progressUpdates: [
      {
        date: '2025-02-15',
        title: 'Stakeholder Consultation on Customary Boundaries',
        description:
          'Roundtable convened with community traditional rulers and surveyors to preempt boundary disputes.',
      },
    ],
  },
  {
    id: 'proj-5',
    slug: 'youth-vocational-skills-acquisition',
    title: 'Youth Technical & Vocational Skills Empowerment Scheme',
    category: 'Youth & Women Empowerment',
    summary:
      'Vocational training programs in modern fabrication, solar installation, and digital literacy for Ajaokuta youths.',
    description:
      'Leveraging Ajaokuta’s historical foundation as an industrial crucible, this planned empowerment scheme aims to sponsor selected youths for intensive certifications in solar PV installations, industrial welding, and computer literacy to enhance employability.',
    location: 'Ajaokuta Technical College / Skill Hubs',
    status: 'awaiting_verification',
    featured: false,
    publishedAt: '2025-02-01',
    updatedAt: '2025-02-28',
    targetBeneficiaries: 'Unemployed youths and secondary school leavers in Ajaokuta Constituency',
    verificationNote:
      'Curriculum partnership with technical instructors under preliminary review. Registration dates will be gazetted.',
    evidenceUrls: [],
  },
];

export const initialNews: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'house-committee-on-lands-oversight-briefing',
    title: 'Hon. Jibril Abu II Chairs Strategic Session of the House Committee on Lands',
    excerpt:
      'The House Committee on Lands convenes key stakeholders to review land reforms, title processing transparency, and dispute resolution mechanisms in Kogi State.',
    body: `LOKOJA, KOGI STATE — Hon. Jibril Abu II, Chairman of the House Committee on Lands in the Kogi State House of Assembly, presided over a pivotal legislative briefing today focusing on modernizing land administration processes, accelerating certificate of occupancy processing, and safeguarding indigenous community land rights across the state.

Addressing committee members and ministry representatives, the lawmaker emphasized that land remains the foremost catalyst for economic prosperity, agricultural security, and industrial investment in Kogi State. 

"Our legislative mandate is rooted in ensuring that land administration in Kogi State is transparent, equitable, and progressive," Hon. Jibril stated. "We must eliminate bureaucratic bottlenecks that stifle legitimate property developers while resolutely protecting customary landholders from unlawful encroachment."

The committee resolved to conduct scheduled oversight tours of state land zonal offices and foster closer collaboration with local government land officers.`,
    category: 'Legislative Update',
    author: 'Office of Hon. Jibril Abu II',
    publishedAt: '2025-02-18',
    updatedAt: '2025-02-18',
    status: 'published',
    featured: true,
  },
  {
    id: 'news-2',
    slug: 'constituency-briefing-ajaokuta-development-priorities',
    title: 'Wisdombank Holds Consultative Townhall with Ajaokuta Ward Leaders',
    excerpt:
      'Community representatives, youth organizations, and market women leaders gather in Ajaokuta to deliberate on primary constituency priorities and infrastructure needs.',
    body: `AJAOKUTA, KOGI STATE — In demonstration of his steadfast commitment to participatory representation, Hon. Jibril Abu II (popularly known as Wisdombank) hosted a comprehensive consultative townhall with community leaders, women leaders, youth representatives, and artisanal associations drawn from across Ajaokuta Constituency.

The session provided a transparent platform for constituents to directly articulate their localized requirements regarding rural feeder road maintenance, primary school repairs, potable water access, and healthcare facility upgrades.

Hon. Jibril reiterated that genuine democratic representation requires continuous two-way communication between elected officials and the people they serve. He pledged that all prioritized submissions will form the core of his legislative motions and executive interventions in the forthcoming legislative quarters.`,
    category: 'Community Engagement',
    author: 'Media Unit',
    publishedAt: '2025-01-22',
    updatedAt: '2025-01-22',
    status: 'published',
    featured: true,
  },
  {
    id: 'news-3',
    slug: 'motion-on-ajaokuta-steel-corridor-infrastructure',
    title: 'Legislative Motion on Federal-State Partnership for Ajaokuta Infrastructure Corridor',
    excerpt:
      'Lawmaker calls for expedited rehabilitation of transit arterial roads and strategic infrastructure surrounding the Ajaokuta industrial hub.',
    body: `LOKOJA — During plenary proceedings at the Kogi State House of Assembly, Hon. Jibril Abu II presented a key motion advocating enhanced collaboration between the State Executive and Federal agencies toward the maintenance of critical transport arteries and public infrastructure around Ajaokuta.

Highlighting the historic and economic significance of Ajaokuta as Nigeria's premier metallurgical hub, the lawmaker noted that quality infrastructure is vital to support economic revival and protect public safety on regional highways.

The motion was warmly received by colleagues across the chamber, with multiple lawmakers seconding the plea for proactive road remediation and joint patrol security reinforcements along transit corridors.`,
    category: 'Legislative Update',
    author: 'Legislative Affairs Bureau',
    publishedAt: '2024-11-14',
    updatedAt: '2024-11-14',
    status: 'published',
    featured: false,
  },
  {
    id: 'news-4',
    slug: 'palliative-distribution-reaches-vulnerable-households',
    title: 'Constituency Palliative Support Disbursed to Vulnerable Families Across Wards',
    excerpt:
      'Coordinated welfare distribution reaches over 1,000 households in Ajaokuta LGA as part of ongoing social safety net efforts.',
    body: `AJAOKUTA — Over 1,000 vulnerable households, widows, and low-income families across Ajaokuta Constituency received food staples and humanitarian support packages under the quarterly welfare program instituted by Hon. Jibril Abu II.

The exercise was coordinated through non-partisan community committees to guarantee that aid reached the most needy residents in both riverine and hinterland settlements.

Community elders praised the lawmaker's proactive concern for the underprivileged, noting that timely intervention eases economic burdens and fosters communal solidarity.`,
    category: 'Constituency Support',
    author: 'Constituency Liaison Office',
    publishedAt: '2024-12-22',
    updatedAt: '2024-12-22',
    status: 'published',
    featured: false,
  },
];

export const initialLegislativeActivities: LegislativeActivity[] = [
  {
    id: 'leg-1',
    title: 'Motion for the Urgent Rehabilitation of Critical Feeder Roads in Ajaokuta LGA',
    activityType: 'motion',
    date: '2025-02-12',
    session: '8th Assembly, 2nd Session',
    summary:
      'Moved a formal motion urging the State Ministry of Works and Infrastructure to conduct emergency palliative grading on farm-to-market arterial roads in Ajaokuta.',
    fullDetails:
      'The motion drew parliamentary attention to the deteriorating state of rural roads linking agrarian communities such as Upake, Eganyi, and Adogo to regional markets. Hon. Jibril argued that post-harvest losses among local cassava and grain farmers could be drastically curtailed through prompt intervention. The motion was passed with unanimous resolution for transmission to the State Executive.',
    committeeRole: 'Sponsor & Member representing Ajaokuta',
    outcomes: 'Passed and transmitted to the Ministry of Works for survey and intervention planning.',
  },
  {
    id: 'leg-2',
    title: 'Committee on Lands Investigative Hearing on Boundary Demarcations & Title Processing',
    activityType: 'committee_meeting',
    date: '2025-01-30',
    session: '8th Assembly, 2nd Session',
    summary:
      'Chaired an interactive oversight session with officials of the Kogi State Geographic Information System (KOGIS) and Bureau of Lands.',
    fullDetails:
      'Under the leadership of Hon. Jibril Abu II, the House Committee on Lands reviewed ongoing digitization of land records, verified fees, and streamlined issuance timelines for statutory rights of occupancy. Recommendations were adopted to eliminate touting and protect customary farm allotments from arbitrary alienation.',
    committeeRole: 'Chairman, House Committee on Lands',
    outcomes: 'Adoption of a 5-point action framework on transparent cadastral indexing and prompt dispute settlement.',
  },
  {
    id: 'leg-3',
    title: 'Deliberation on Public Health Facility Upgrades in Mining & Industrial Corridors',
    activityType: 'house_proceeding',
    date: '2024-10-24',
    session: '8th Assembly, 1st Session',
    summary:
      'Contributed extensively during debate on primary healthcare revitalizations, with specific emphasis on industrial community safety.',
    fullDetails:
      'Argued the imperative of equipping rural clinics with respiratory care supplies, antivenom serums, and reliable solar refrigeration for vaccine storage in industrial and agrarian constituencies like Ajaokuta.',
    committeeRole: 'Member Representing Ajaokuta',
    outcomes: 'Incorporated into the Assembly Committee on Health oversight agenda.',
  },
  {
    id: 'leg-4',
    title: 'Official Statement on Peaceful Coexistence and Communal Unity in Ajaokuta',
    activityType: 'official_statement',
    date: '2024-09-18',
    session: 'Public Communication',
    summary:
      'Issued a widely circulated call for inter-ethnic harmony, youth productivity, and vigilance across all communities in Ajaokuta.',
    fullDetails:
      'Hon. Jibril Abu II called upon traditional rulers, youth organizations, and community development associations to remain united and prioritize peaceful resolution of any communal disputes. He reaffirmed that sustainable development thrives solely in an atmosphere of mutual respect and peace.',
    committeeRole: 'Legislative Representative',
    outcomes: 'Commended by community elder councils and youth coalitions across the constituency.',
  },
];

export const initialSubmissions: CommunitySubmission[] = [
  {
    id: 'sub-1',
    referenceCode: 'AJK-2025-8391',
    fullName: 'Musa Abdullahi',
    email: 'musa.abdullahi.sample@gmail.com',
    phone: '+234 803 000 1234',
    community: 'Geregu Ward',
    category: 'Water and Sanitation',
    subject: 'Request for Repair of Solar Borehole Facility',
    description:
      'The motorized solar borehole servicing the central market square in Geregu experienced an inverter malfunction three weeks ago. Residents currently rely on unprotected stream water. We kindly request the intervention of the constituency office.',
    location: 'Central Market Square, Geregu',
    preferredContact: 'phone',
    consent: true,
    status: 'under_review',
    createdAt: '2025-02-14T09:30:00Z',
    updatedAt: '2025-02-16T14:20:00Z',
    internalNotes:
      'Constituency engineering liaison contacted. Technicians scheduled for on-site diagnostic of solar inverter module.',
    publicUpdates: [
      {
        id: 'upd-1',
        timestamp: '2025-02-14T10:00:00Z',
        status: 'received',
        publicMessage:
          'Submission received and assigned reference code AJK-2025-8391. Forwarded to the constituency development desk.',
        author: 'Constituency Desk Officer',
      },
      {
        id: 'upd-2',
        timestamp: '2025-02-16T14:20:00Z',
        status: 'under_review',
        publicMessage:
          'Field assessment team notified. An engineering technician has been assigned to inspect the pump inverter.',
        author: 'Case Officer',
      },
    ],
  },
  {
    id: 'sub-2',
    referenceCode: 'AJK-2025-4109',
    fullName: 'Grace Ojoma Danjuma',
    email: 'grace.danjuma.sample@yahoo.com',
    phone: '+234 812 000 5678',
    community: 'Adogo Ward',
    category: 'Healthcare',
    subject: 'Basic First Aid & Maternal Supplies for Community Clinic',
    description:
      'The maternity clinic in Adogo is in urgent need of delivery kits, disposable gloves, and basic antimalarial drugs for expectant mothers.',
    location: 'Adogo Primary Health Post',
    preferredContact: 'email',
    consent: true,
    status: 'response_provided',
    createdAt: '2025-01-20T11:15:00Z',
    updatedAt: '2025-01-26T16:00:00Z',
    internalNotes:
      'Facilitated provision of emergency medical supplies in collaboration with local primary health board.',
    publicUpdates: [
      {
        id: 'upd-3',
        timestamp: '2025-01-20T11:30:00Z',
        status: 'received',
        publicMessage: 'Petition logged and prioritized under emergency healthcare support.',
        author: 'Desk Officer',
      },
      {
        id: 'upd-4',
        timestamp: '2025-01-26T16:00:00Z',
        status: 'response_provided',
        publicMessage:
          'Emergency maternal supply consignment dispatched and delivered to the officer in charge of Adogo Clinic on Jan 26, 2025.',
        author: 'Liaison Officer',
      },
    ],
  },
  {
    id: 'sub-3',
    referenceCode: 'AJK-2025-1972',
    fullName: 'Ibrahim O. Salihu',
    email: 'ibrahim.salihu.sample@gmail.com',
    phone: '+234 705 000 8901',
    community: 'Upake Community',
    category: 'Road and Infrastructure',
    subject: 'Culvert Collapse Near Upake Farm Access Road',
    description:
      'Heavy rainfall damaged the drainage culvert connecting the main village road to agricultural farmlands, preventing produce trucks from accessing the farms.',
    location: 'Upake East Boundary Road',
    preferredContact: 'sms',
    consent: true,
    status: 'referred',
    createdAt: '2025-02-05T08:45:00Z',
    updatedAt: '2025-02-12T10:10:00Z',
    internalNotes:
      'Referred to Local Government Works Department and Kogi State Ministry of Rural Development.',
    publicUpdates: [
      {
        id: 'upd-5',
        timestamp: '2025-02-05T09:00:00Z',
        status: 'received',
        publicMessage: 'Submission logged.',
        author: 'Desk Officer',
      },
      {
        id: 'upd-6',
        timestamp: '2025-02-12T10:10:00Z',
        status: 'referred',
        publicMessage:
          'Formally referred to the Ministry of Rural Development with an accompanying recommendation letter from the Office of Hon. Jibril Abu II.',
        author: 'Legislative Assistant',
      },
    ],
  },
];

export const initialMediaItems: MediaItem[] = [
  {
    id: 'med-0',
    title: 'Official Portrait of Hon. Jibril Abu II (Wisdombank)',
    mediaType: 'photo',
    url: '/images/hon-jibril-abu.jpg',
    altText: 'Official portrait photograph of Hon. Jibril Abu II',
    caption: 'Official portrait of Hon. Jibril Abu II, Member Representing Ajaokuta Constituency in the Kogi State House of Assembly and Chairman, House Committee on Lands.',
    category: 'Legislative Activities',
    publishedAt: '2025-02-25',
    eventDate: '2025-02-20',
  },
  {
    id: 'med-1',
    title: 'Plenary Session at Kogi State House of Assembly',
    mediaType: 'photo',
    url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    altText: 'Legislative chamber during plenary proceedings in Lokoja',
    caption: 'Hon. Jibril Abu II in consultation with fellow legislators during legislative proceedings.',
    category: 'Legislative Activities',
    publishedAt: '2025-02-14',
    eventDate: '2025-02-12',
  },
  {
    id: 'med-2',
    title: 'House Committee on Lands Oversight Engagement',
    mediaType: 'photo',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    altText: 'Committee meeting room with documents and committee members seated',
    caption: 'Oversight meeting on state land management and cadastral documentation.',
    category: 'Committee Work',
    publishedAt: '2025-01-30',
    eventDate: '2025-01-29',
  },
  {
    id: 'med-3',
    title: 'Constituency Stakeholders Consultative Townhall',
    mediaType: 'photo',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    altText: 'Audience gathered for community civic townhall meeting',
    caption: 'Dialogue with community leaders, youth heads, and women representatives in Ajaokuta.',
    category: 'Community Engagement',
    publishedAt: '2025-01-22',
    eventDate: '2025-01-20',
  },
  {
    id: 'med-4',
    title: 'Educational and Palliative Outreach Support',
    mediaType: 'photo',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    altText: 'School supplies and educational materials for students',
    caption: 'Educational support materials prepared for distribution to pupils across Ajaokuta wards.',
    category: 'Constituency Support',
    publishedAt: '2024-12-22',
    eventDate: '2024-12-20',
  },
];

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'usr-admin-1',
    name: 'Hon. Jibril Abu II (Super Admin)',
    email: 'admin@honjibrilabu.ng',
    role: 'admin',
  },
  {
    id: 'usr-editor-1',
    name: 'Media Director',
    email: 'media@honjibrilabu.ng',
    role: 'editor',
  },
  {
    id: 'usr-officer-1',
    name: 'Constituency Liaison Officer',
    email: 'liaison@honjibrilabu.ng',
    role: 'case_officer',
  },
];
