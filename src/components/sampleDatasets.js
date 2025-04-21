const sampleDatasets = [
  // Dataset Type 1
  {
    id: "DS001",
    name: "Primary Care Clinical Notes",
    pageUrl: "/index.php/home/datasets/primary-care-clinical-notes/",
    category: "Medical Records",
    specifications: {
      "Dataset Type": "Clinical",
      "Record Count": "250,000",
      "Data Format": "FHIR",
      "Dataset Size": ["1.5GB", "3 Million Records"],
      "Source Type": "Hospital Network",
      "Time Period": ["2018-2020"],
      Demographics: [
        "Adult",
        "Pediatric",
        "Geriatric",
        "Urban",
        "Rural",
        "Diverse",
      ],
      Certification: ["HIPAA Compliant", "De-identified"],
    },
    description:
      "De-identified primary care visit notes with diagnoses, treatments, and outcomes.",
    downloadUrl: "/wp-content/uploads/2025/04/primary-care-dataset-summary.pdf",
    sourceAttribution: "National Health Information Network",
  },

  // Dataset Type 2
  {
    id: "DS002",
    name: "Hospital Admission Records",
    pageUrl: "/index.php/home/datasets/hospital-admission-records/",
    category: "Medical Records",
    specifications: {
      "Dataset Type": "Clinical",
      "Record Count": "120,000",
      "Data Format": "CSV",
      "Dataset Size": ["800MB", "1.2 Million Records"],
      "Source Type": "Hospital Network",
      "Time Period": ["2019-2021"],
      Demographics: [
        "Adult",
        "Pediatric",
        "Geriatric",
        "Urban",
        "Rural",
        "Diverse",
      ],
      Certification: ["HIPAA Compliant", "De-identified"],
    },
    description:
      "De-identified hospital admission records including demographics, diagnoses, and length of stay.",
    downloadUrl:
      "/wp-content/uploads/2025/04/hospital-admission-dataset-summary.pdf",
    sourceAttribution: "University Hospital Consortium",
  },
  {
    id: "DS003",
    name: "Emergency Department Visits",
    pageUrl: "/index.php/home/datasets/emergency-department-visits/",
    category: "Medical Records",
    specifications: {
      "Dataset Type": "Clinical",
      "Record Count": "350,000",
      "Data Format": "FHIR",
      "Dataset Size": ["2.1GB", "4.5 Million Records"],
      "Source Type": "Hospital Network",
      "Time Period": ["2020-2022"],
      Demographics: [
        "Adult",
        "Pediatric",
        "Geriatric",
        "Urban",
        "Rural",
        "Diverse",
      ],
      Certification: ["HIPAA Compliant", "De-identified"],
    },
    description:
      "De-identified emergency department visit data with triage assessments, diagnoses, and outcomes.",
    downloadUrl:
      "/wp-content/uploads/2025/04/emergency-visits-dataset-summary.pdf",
    sourceAttribution: "National Emergency Medicine Database",
  },

  // Community Health
  {
    id: "DS004",
    name: "Community Health Survey",
    pageUrl: "/index.php/home/datasets/community-health-survey/",
    category: "Community",
    specifications: {
      "Dataset Type": "Survey",
      "Record Count": "75,000",
      "Data Format": "CSV",
      "Dataset Size": ["500MB", "750,000 Records"],
      "Source Type": "Public Health Department",
      "Time Period": ["2021-2022"],
      Demographics: ["Adult", "Urban", "Rural", "Diverse"],
      Certification: ["IRB Approved", "De-identified"],
    },
    description:
      "Comprehensive community health survey data covering social determinants of health, wellness behaviors, and healthcare access.",
    downloadUrl:
      "/wp-content/uploads/2025/04/community-health-survey-summary.pdf",
    sourceAttribution: "Regional Public Health Coalition",
  },
  {
    id: "DS005",
    name: "Social Determinants of Health",
    pageUrl: "/index.php/home/datasets/sdoh-dataset/",
    category: "Community",
    specifications: {
      "Dataset Type": "Survey",
      "Record Count": "100,000",
      "Data Format": "CSV",
      "Dataset Size": ["750MB", "1.1 Million Records"],
      "Source Type": "Public Health Department",
      "Time Period": ["2020-2022"],
      Demographics: ["Adult", "Urban", "Rural", "Diverse"],
      Certification: ["IRB Approved", "De-identified"],
    },
    description:
      "Comprehensive dataset on social determinants of health including housing, food security, transportation, and healthcare access.",
    downloadUrl: "/wp-content/uploads/2025/04/sdoh-dataset-summary.pdf",
    sourceAttribution: "National Social Determinants Collaborative",
  },

  // Educational Records
  {
    id: "DS006",
    name: "Medical Education Outcomes",
    pageUrl: "/index.php/home/datasets/medical-education-outcomes/",
    category: "Educational Records",
    specifications: {
      "Dataset Type": "Educational",
      "Record Count": "25,000",
      "Data Format": "JSON",
      "Dataset Size": ["300MB", "450,000 Records"],
      "Source Type": "Academic Institution",
      "Time Period": ["2015-2022"],
      Demographics: ["Graduate Students", "Faculty"],
      Certification: ["IRB Approved", "De-identified"],
    },
    description:
      "Longitudinal tracking of medical education outcomes from multiple institutions, including performance metrics and career trajectories.",
    downloadUrl:
      "/wp-content/uploads/2025/04/medical-education-outcomes-summary.pdf",
    sourceAttribution: "Association of Academic Medical Centers",
  },
  {
    id: "DS007",
    name: "Healthcare Workforce Training",
    pageUrl: "/index.php/home/datasets/healthcare-workforce-training/",
    category: "Educational Records",
    specifications: {
      "Dataset Type": "Educational",
      "Record Count": "40,000",
      "Data Format": "CSV",
      "Dataset Size": ["250MB", "550,000 Records"],
      "Source Type": "Academic Institution",
      "Time Period": ["2018-2022"],
      Demographics: ["Graduate Students", "Faculty", "Staff"],
      Certification: ["IRB Approved", "De-identified"],
    },
    description:
      "Comprehensive dataset on healthcare workforce training programs, including educational interventions, assessment methods, and outcomes.",
    downloadUrl:
      "/wp-content/uploads/2025/04/healthcare-workforce-training-summary.pdf",
    sourceAttribution: "Health Professions Education Consortium",
  },

  // Clinical Trials
  {
    id: "DS008",
    name: "Completed Clinical Trials",
    pageUrl: "/index.php/home/datasets/completed-clinical-trials/",
    category: "Clinical Trials",
    specifications: {
      "Dataset Type": "Research",
      "Record Count": "15,000",
      "Data Format": "CSV/JSON",
      "Dataset Size": ["1.2GB", "2.5 Million Records"],
      "Source Type": "Research Institution",
      "Time Period": ["2010-2022"],
      Demographics: ["Adult", "Pediatric", "Geriatric", "Diverse"],
      Certification: ["IRB Approved", "De-identified", "CONSORT Compliant"],
    },
    description:
      "De-identified patient-level data from completed clinical trials across multiple therapeutic areas and phases.",
    downloadUrl:
      "/wp-content/uploads/2025/04/clinical-trials-dataset-summary.pdf",
    sourceAttribution: "Clinical Research Data Consortium",
  },
  {
    id: "DS009",
    name: "Pharmaceutical Trial Results",
    pageUrl: "/index.php/home/datasets/pharmaceutical-trial-results/",
    category: "Clinical Trials",
    specifications: {
      "Dataset Type": "Research",
      "Record Count": "10,000",
      "Data Format": "CSV/JSON",
      "Dataset Size": ["900MB", "1.8 Million Records"],
      "Source Type": "Research Institution",
      "Time Period": ["2012-2022"],
      Demographics: ["Adult", "Geriatric", "Diverse"],
      Certification: ["IRB Approved", "De-identified", "CONSORT Compliant"],
    },
    description:
      "Comprehensive dataset of de-identified pharmaceutical trial results including efficacy, safety, and pharmacokinetic data.",
    downloadUrl:
      "/wp-content/uploads/2025/04/pharmaceutical-trials-summary.pdf",
    sourceAttribution: "Open Pharmaceutical Research Initiative",
  },

  // Public Health
  {
    id: "DS010",
    name: "Population Health Indicators",
    pageUrl: "/index.php/home/datasets/population-health-indicators/",
    category: "Public Health",
    specifications: {
      "Dataset Type": "Epidemiological",
      "Record Count": "500,000",
      "Data Format": "CSV",
      "Dataset Size": ["1.5GB", "3.2 Million Records"],
      "Source Type": "Government Agency",
      "Time Period": ["2015-2022"],
      Demographics: ["All Ages", "National Coverage", "Diverse"],
      Certification: ["Quality Assured", "Public Domain"],
    },
    description:
      "Comprehensive population health indicators at county, state, and national levels including mortality, morbidity, and risk factors.",
    downloadUrl:
      "/wp-content/uploads/2025/04/population-health-indicators-summary.pdf",
    sourceAttribution: "National Center for Health Statistics",
  },
  {
    id: "DS011",
    name: "Disease Surveillance Data",
    pageUrl: "/index.php/home/datasets/disease-surveillance-data/",
    category: "Public Health",
    specifications: {
      "Dataset Type": "Epidemiological",
      "Record Count": "350,000",
      "Data Format": "CSV/JSON",
      "Dataset Size": ["2.1GB", "4.8 Million Records"],
      "Source Type": "Government Agency",
      "Time Period": ["2018-2022"],
      Demographics: ["All Ages", "National Coverage", "Diverse"],
      Certification: ["Quality Assured", "Public Domain"],
    },
    description:
      "National disease surveillance data covering infectious and chronic disease prevalence, geographic distribution, and temporal trends.",
    downloadUrl: "/wp-content/uploads/2025/04/disease-surveillance-summary.pdf",
    sourceAttribution: "Centers for Disease Control and Prevention",
  },
];

export default sampleDatasets;
