export type CompanyProfile = {
  title: string;
  intro: string;
  positioning: string;
  whatWeDo: string[];
  solutionAreas: string[];
  productSupply: string[];
  rfqWorkflow: string[];
  complianceNote: string;
  contactCta: string;
};

export type SalesOnePager = {
  slug: string;
  title: string;
  shortIntro: string;
  clientProblem: string;
  howHiltechHelps: string[];
  typicalScope: string[];
  requestChecklist: string[];
  cta: string;
  relatedSolution?: string;
};

export const companyProfile: CompanyProfile = {
  title: 'HILTECH Company Profile',
  intro: 'HILTECH supports business and industrial teams with physical network infrastructure delivery and project supply coordination across Egypt.',
  positioning: 'A project-focused infrastructure partner for structured connectivity, data room readiness, validation, and RFQ-driven supply.',
  whatWeDo: [
    'Design and implement structured cabling and fiber routes for enterprise facilities.',
    'Prepare data rooms with rack, patching, and pathway organization aligned to operational needs.',
    'Support CCTV and security infrastructure connectivity as part of integrated physical-layer delivery.',
    'Coordinate project supply requests based on confirmed scope, quantities, and availability.',
  ],
  solutionAreas: ['Structured Cabling', 'Fiber Backbone', 'Data Room Infrastructure', 'CCTV Infrastructure', 'Network Testing & Validation', 'Project Supply & RFQ Coordination'],
  productSupply: [
    'Project-based supply for cables, patching components, fiber accessories, cabinets, racks, and related infrastructure items.',
    'Compatibility and availability checks before quotation and delivery planning.',
    'Transparent product references without claiming formal partnership unless explicitly stated.',
  ],
  rfqWorkflow: ['Share project scope and site context.', 'Build or review item list in RFQ Basket.', 'Add quantities, notes, and timeline expectations.', 'Send RFQ request via WhatsApp for coordinated quotation response.'],
  complianceNote: 'Price and availability are provided upon request. Brand and product references describe technology ecosystems and do not imply formal partnerships unless explicitly confirmed.',
  contactCta: 'Contact HILTECH to discuss your requirement and receive a scope-aligned next step.',
};

export const onePagers: SalesOnePager[] = [
  {
    slug: 'structured-cabling',
    title: 'Structured Cabling One-Pager',
    shortIntro: 'Build a stable physical layer that supports business operations, voice/data endpoints, and future expansion.',
    clientProblem: 'Many teams face inconsistent connectivity, unorganized cabling paths, and difficult troubleshooting due to fragmented installation practices.',
    howHiltechHelps: ['Plan endpoint distribution and backbone paths before execution.', 'Implement organized copper cabling routes with cabinet and patch panel discipline.', 'Align installation with labeling and handover readiness to reduce operational risk.'],
    typicalScope: ['CAT6/CAT6A horizontal and vertical routes', 'Patch panels, termination, and pathway accessories', 'Cabinet-side organization and documentation support'],
    requestChecklist: ['Site location and facility type', 'Approximate endpoint count per floor/area', 'Preferred standards or brands (if any)', 'Required delivery or handover window'],
    cta: 'Share your endpoint scope and location to receive a project-ready cabling recommendation.',
    relatedSolution: '/solutions/structured-cabling',
  },
  {
    slug: 'fiber-backbone',
    title: 'Fiber Backbone One-Pager',
    shortIntro: 'Establish high-capacity inter-building or core links with scope-aligned optical backbone planning.',
    clientProblem: 'Backbone bottlenecks and poor fiber route planning can impact uptime, scalability, and long-term maintenance costs.',
    howHiltechHelps: ['Map fiber routes around site constraints and expansion goals.', 'Support cable type and connectivity selection based on project context.', 'Prepare testing-ready backbone delivery workflows for reliable handover.'],
    typicalScope: ['Single-mode and multi-mode fiber routes', 'ODF, splice trays, and patching infrastructure', 'Backbone path organization across buildings or core rooms'],
    requestChecklist: ['Distance and route context', 'Indoor/outdoor routing requirements', 'Expected link capacity and use case', 'Timeline and access readiness'],
    cta: 'Send your backbone path requirements for a coordinated fiber scope review.',
    relatedSolution: '/solutions/fiber-backbone',
  },
  {
    slug: 'data-room-infrastructure',
    title: 'Data Room Infrastructure One-Pager',
    shortIntro: 'Prepare data rooms for clean operation with structured racks, patching zones, and cable management.',
    clientProblem: 'Unstructured technical rooms create operational pressure, downtime risk, and handover complexity for IT teams.',
    howHiltechHelps: ['Organize rack and cabinet placement around access, cooling, and pathway logic.', 'Coordinate patching and power-adjacent layout needs for maintainability.', 'Deliver data room readiness with practical handover orientation.'],
    typicalScope: ['Rack/cabinet planning and arrangement', 'Patching zones and route segregation', 'Cable management and room-level organization'],
    requestChecklist: ['Room dimensions and current condition', 'Number of active/passive devices planned', 'Required cabinet/rack preferences', 'Expected go-live timeline'],
    cta: 'Share your data room constraints and target date to start a readiness plan.',
    relatedSolution: '/solutions/data-rooms',
  },
  {
    slug: 'cctv-infrastructure',
    title: 'CCTV Infrastructure One-Pager',
    shortIntro: 'Deliver physical connectivity for CCTV systems with clear routing, endpoint planning, and integration readiness.',
    clientProblem: 'Security projects often suffer from unclear cable paths, inconsistent endpoint execution, and weak handover structure.',
    howHiltechHelps: ['Plan camera endpoint connectivity across indoor and outdoor zones.', 'Support infrastructure routes that align with surveillance coverage strategy.', 'Coordinate physical-layer setup to simplify commissioning and long-term support.'],
    typicalScope: ['Camera connectivity and structured pathways', 'CCTV-related cabinet and patching arrangements', 'Routing across access points and control areas'],
    requestChecklist: ['Number of cameras and site zones', 'Indoor/outdoor camera distribution', 'Any preferred brands/specifications', 'Monitoring room or NVR location details'],
    cta: 'Send your camera count and location details to receive a practical infrastructure scope.',
    relatedSolution: '/solutions/cctv-infrastructure',
  },
  {
    slug: 'network-testing-validation',
    title: 'Network Testing & Validation One-Pager',
    shortIntro: 'Confirm infrastructure quality through testing workflows that support operational confidence before handover.',
    clientProblem: 'Without structured validation, teams risk unresolved faults, delayed handover, and unclear infrastructure performance.',
    howHiltechHelps: ['Define required test scope based on link type and project stage.', 'Apply Fluke/OTDR-oriented workflows as required by project conditions.', 'Support clear reporting expectations for technical handover.'],
    typicalScope: ['Copper and fiber validation workflows', 'Fault isolation and corrective verification', 'Handover-oriented testing summaries'],
    requestChecklist: ['Link types and quantities to test', 'Required standard or acceptance criteria', 'Site access schedule for testing', 'Handover/reporting format expectations'],
    cta: 'Share your testing requirements to align on validation scope and schedule.',
    relatedSolution: '/solutions/network-testing',
  },
  {
    slug: 'project-supply-rfq',
    title: 'Project Supply & RFQ One-Pager',
    shortIntro: 'Turn your infrastructure requirement into a clear RFQ request with itemized scope and procurement-ready details.',
    clientProblem: 'Incomplete requests slow quotation cycles and create mismatches in brand, compatibility, or delivery expectations.',
    howHiltechHelps: ['Guide clients to submit complete item lists and project notes.', 'Review quantities, compatibility context, and preferred ecosystems.', 'Coordinate response workflow through WhatsApp-based RFQ handling.'],
    typicalScope: ['Cables, fiber accessories, racks/cabinets, patching components', 'Brand/spec alignment and quantity review', 'Project-based availability and quotation support'],
    requestChecklist: ['BOQ or quantity list (if available)', 'Preferred brands/specs (if any)', 'Project location and delivery timeline', 'Any installation/testing expectations tied to supply'],
    cta: 'Build your RFQ Basket and send a complete request for faster coordination.',
    relatedSolution: '/solutions/project-supply-rfq',
  },
];

export const launchCopy = {
  facebookAr: 'إطلاق موقع HILTECH الرسمي أصبح متاح الآن. نوفر حلول البنية التحتية للشبكات للمشروعات التجارية والصناعية: Structured Cabling، Fiber Backbone، تجهيز غرف الداتا، بنية CCTV، واختبارات الشبكات. تقدر تبعت طلبك بسهولة من خلال RFQ Basket أو تتواصل معنا مباشرة على واتساب لبدء التنسيق.',
  facebookEn: 'HILTECH’s official website is now live. We support enterprise and industrial infrastructure projects across structured cabling, fiber backbone, data room readiness, CCTV infrastructure, and network validation. You can submit your requirement through the RFQ Basket or contact us directly on WhatsApp.',
  linkedInEn: 'We are pleased to launch the new HILTECH website, built to support practical B2B infrastructure coordination. The platform introduces clearer pathways for structured cabling, fiber backbone, data room infrastructure, CCTV connectivity, and project-based RFQ supply. Teams can review solutions, prepare scope details, and send RFQ requests directly for coordinated follow-up. We welcome collaboration with facility, procurement, and IT stakeholders planning infrastructure upgrades or new deployments.',
  whatsappAr: 'أهلًا بحضرتك، موقع HILTECH الجديد جاهز الآن 👋\nلو عندكم مشروع بنية تحتية للشبكات أو توريد مشروع، تقدروا تبعتوا التفاصيل من خلال RFQ Basket أو مباشرة على واتساب.\nهنساعدكم في تنظيم الطلب، مراجعة الكميات، والتنسيق على العرض المناسب.',
  whatsappEn: 'Hello from HILTECH 👋\nOur new website is now live for infrastructure project coordination.\nIf you have a network infrastructure or project supply requirement, you can submit details through the RFQ Basket or message us directly on WhatsApp for quick coordination.',
  captionAr: 'موقع HILTECH الجديد جاهز لخدمة طلبات مشروعات البنية التحتية للشبكات. تواصل معنا وابدأ RFQ بسهولة.',
  captionEn: 'The new HILTECH website is live for network infrastructure RFQ coordination. Contact us to get started.',
};

export const salesMessageTemplates = {
  firstOutreachAr: 'أهلًا بحضرتك، معك فريق HILTECH. بنساعد الشركات في تنفيذ وتوريد مشروعات البنية التحتية للشبكات (Structured Cabling / Fiber / Data Room / CCTV). لو عندكم مشروع حالي، ابعتلنا الموقع ونطاق العمل المبدئي ونرجعلكم بخطوة التنسيق المناسبة.',
  firstOutreachEn: 'Hello, this is the HILTECH team. We support companies with network infrastructure implementation and project supply (structured cabling, fiber, data room, and CCTV infrastructure). If you have an active requirement, share your location and initial scope and we will recommend the next coordination step.',
  rfqFollowUpAr: 'متشكرين على إرسال طلب الـ RFQ. جاري مراجعة البنود والكميات، ولو في أي تفاصيل ناقصة (موقع/جدول زمني/مواصفات) هنبعتها لحضرتك مباشرة لتأكيد العرض.',
  rfqFollowUpEn: 'Thank you for submitting your RFQ request. We are reviewing the listed items and quantities. If any project details are still needed (location, timeline, or specs), we will share them promptly to finalize your quotation flow.',
  boqRequestAr: 'لتسريع تجهيز العرض، يفضل إرسال BOQ أو قائمة كميات مبدئية تشمل الأصناف، الكميات، والمواصفات المطلوبة (إن وجدت). ده بيساعدنا نرجعلكم بعرض أدق وفي وقت أسرع.',
  boqRequestEn: 'To accelerate quotation preparation, please share a BOQ or preliminary quantity list including items, quantities, and required specifications (if available). This helps us return with a more accurate offer in less time.',
  afterQuotationAr: 'هل في أي تحديث بخصوص العرض المرسل؟ لو في تعديل على الكميات أو نطاق العمل نقدر نراجع الطلب ونحدث العرض بما يتناسب مع احتياجات المشروع.',
  afterQuotationEn: 'Would you like us to proceed with any updates on the submitted quotation? If quantities or scope have changed, we can review and revise the offer to match the current project requirement.',
  unsureStartAr: 'لو لسه مش واضح تبدأ منين، ابعتلنا نوع الموقع والمطلوب بشكل عام (مثل عدد النقاط أو الكاميرات)، وفريقنا يساعدك ترتب المتطلبات قبل إرسال RFQ كامل.',
  unsureStartEn: 'If you are not sure where to start, share your site type and a high-level requirement (such as endpoint or camera count). Our team can help structure your scope before you submit a full RFQ.',
};
