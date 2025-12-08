export interface Biomarker {
  id: string
  name: string
  value: number
  unit: string
  category: 'good' | 'average' | 'bad'
  normalRange: {
    min: number
    max: number
  }
  description: string
  subcategory: string
}

export const biomarkersData: Biomarker[] = [
  // Lipid Panel
  {
    id: 'total_cholesterol',
    name: 'Total Cholesterol',
    value: 185,
    unit: 'mg/dL',
    category: 'good',
    normalRange: { min: 100, max: 200 },
    description: 'Total amount of cholesterol in blood',
    subcategory: 'Lipid Panel',
  },
  {
    id: 'hdl_cholesterol',
    name: 'HDL Cholesterol',
    value: 58,
    unit: 'mg/dL',
    category: 'good',
    normalRange: { min: 40, max: 100 },
    description: 'Good cholesterol that helps remove other forms of cholesterol',
    subcategory: 'Lipid Panel',
  },
  {
    id: 'ldl_cholesterol',
    name: 'LDL Cholesterol',
    value: 110,
    unit: 'mg/dL',
    category: 'average',
    normalRange: { min: 0, max: 100 },
    description: 'Bad cholesterol that can build up in arteries',
    subcategory: 'Lipid Panel',
  },
  {
    id: 'triglycerides',
    name: 'Triglycerides',
    value: 125,
    unit: 'mg/dL',
    category: 'good',
    normalRange: { min: 0, max: 150 },
    description: 'Type of fat found in blood',
    subcategory: 'Lipid Panel',
  },

  // Basic Metabolic Panel
  {
    id: 'glucose',
    name: 'Glucose',
    value: 92,
    unit: 'mg/dL',
    category: 'good',
    normalRange: { min: 70, max: 100 },
    description: 'Blood sugar level',
    subcategory: 'Basic Metabolic Panel',
  },
  {
    id: 'creatinine',
    name: 'Creatinine',
    value: 0.9,
    unit: 'mg/dL',
    category: 'good',
    normalRange: { min: 0.6, max: 1.2 },
    description: 'Waste product filtered by kidneys',
    subcategory: 'Basic Metabolic Panel',
  },
  {
    id: 'bun',
    name: 'BUN',
    value: 18,
    unit: 'mg/dL',
    category: 'good',
    normalRange: { min: 7, max: 20 },
    description: 'Blood urea nitrogen - kidney function marker',
    subcategory: 'Basic Metabolic Panel',
  },
  {
    id: 'sodium',
    name: 'Sodium',
    value: 140,
    unit: 'mEq/L',
    category: 'good',
    normalRange: { min: 136, max: 145 },
    description: 'Electrolyte that regulates fluid balance',
    subcategory: 'Basic Metabolic Panel',
  },
  {
    id: 'potassium',
    name: 'Potassium',
    value: 4.2,
    unit: 'mEq/L',
    category: 'good',
    normalRange: { min: 3.5, max: 5.0 },
    description: 'Electrolyte important for heart and muscle function',
    subcategory: 'Basic Metabolic Panel',
  },
  {
    id: 'chloride',
    name: 'Chloride',
    value: 102,
    unit: 'mEq/L',
    category: 'good',
    normalRange: { min: 98, max: 107 },
    description: 'Electrolyte that helps maintain fluid balance',
    subcategory: 'Basic Metabolic Panel',
  },
  {
    id: 'co2',
    name: 'CO2',
    value: 24,
    unit: 'mEq/L',
    category: 'good',
    normalRange: { min: 22, max: 29 },
    description: 'Carbon dioxide level in blood',
    subcategory: 'Basic Metabolic Panel',
  },

  // Complete Blood Count
  {
    id: 'wbc',
    name: 'White Blood Cells',
    value: 6.8,
    unit: 'K/μL',
    category: 'good',
    normalRange: { min: 4.0, max: 11.0 },
    description: 'Cells that fight infection',
    subcategory: 'Complete Blood Count',
  },
  {
    id: 'rbc',
    name: 'Red Blood Cells',
    value: 4.6,
    unit: 'M/μL',
    category: 'good',
    normalRange: { min: 4.2, max: 5.4 },
    description: 'Cells that carry oxygen',
    subcategory: 'Complete Blood Count',
  },
  {
    id: 'hemoglobin',
    name: 'Hemoglobin',
    value: 14.2,
    unit: 'g/dL',
    category: 'good',
    normalRange: { min: 12.0, max: 16.0 },
    description: 'Protein that carries oxygen in red blood cells',
    subcategory: 'Complete Blood Count',
  },
  {
    id: 'hematocrit',
    name: 'Hematocrit',
    value: 42,
    unit: '%',
    category: 'good',
    normalRange: { min: 36, max: 46 },
    description: 'Percentage of blood made up of red blood cells',
    subcategory: 'Complete Blood Count',
  },
  {
    id: 'platelets',
    name: 'Platelets',
    value: 280,
    unit: 'K/μL',
    category: 'good',
    normalRange: { min: 150, max: 400 },
    description: 'Cell fragments that help blood clot',
    subcategory: 'Complete Blood Count',
  },

  // Liver Function Tests
  {
    id: 'alt',
    name: 'ALT',
    value: 28,
    unit: 'U/L',
    category: 'good',
    normalRange: { min: 7, max: 35 },
    description: 'Liver enzyme that indicates liver health',
    subcategory: 'Liver Function',
  },
  {
    id: 'ast',
    name: 'AST',
    value: 32,
    unit: 'U/L',
    category: 'good',
    normalRange: { min: 8, max: 40 },
    description: 'Enzyme found in liver and other organs',
    subcategory: 'Liver Function',
  },
  {
    id: 'alkaline_phosphatase',
    name: 'Alkaline Phosphatase',
    value: 85,
    unit: 'U/L',
    category: 'good',
    normalRange: { min: 44, max: 147 },
    description: 'Enzyme related to liver and bone health',
    subcategory: 'Liver Function',
  },
  {
    id: 'bilirubin_total',
    name: 'Total Bilirubin',
    value: 0.8,
    unit: 'mg/dL',
    category: 'good',
    normalRange: { min: 0.3, max: 1.2 },
    description: 'Waste product from red blood cell breakdown',
    subcategory: 'Liver Function',
  },

  // Inflammation Markers
  {
    id: 'crp',
    name: 'C-Reactive Protein',
    value: 1.2,
    unit: 'mg/L',
    category: 'average',
    normalRange: { min: 0, max: 3.0 },
    description: 'Protein that indicates inflammation in the body',
    subcategory: 'Inflammation',
  },
  {
    id: 'esr',
    name: 'ESR',
    value: 12,
    unit: 'mm/hr',
    category: 'good',
    normalRange: { min: 0, max: 20 },
    description: 'Rate at which red blood cells settle',
    subcategory: 'Inflammation',
  },

  // Thyroid Function
  {
    id: 'tsh',
    name: 'TSH',
    value: 2.1,
    unit: 'mIU/L',
    category: 'good',
    normalRange: { min: 0.4, max: 4.0 },
    description: 'Thyroid stimulating hormone',
    subcategory: 'Thyroid Function',
  },
  {
    id: 't4',
    name: 'Free T4',
    value: 1.3,
    unit: 'ng/dL',
    category: 'good',
    normalRange: { min: 0.8, max: 1.8 },
    description: 'Free thyroxine hormone',
    subcategory: 'Thyroid Function',
  },
  {
    id: 't3',
    name: 'Free T3',
    value: 3.2,
    unit: 'pg/mL',
    category: 'good',
    normalRange: { min: 2.3, max: 4.2 },
    description: 'Free triiodothyronine hormone',
    subcategory: 'Thyroid Function',
  },

  // Vitamin Levels
  {
    id: 'vitamin_d',
    name: 'Vitamin D',
    value: 28,
    unit: 'ng/mL',
    category: 'average',
    normalRange: { min: 30, max: 100 },
    description: 'Essential vitamin for bone health',
    subcategory: 'Vitamins',
  },
  {
    id: 'vitamin_b12',
    name: 'Vitamin B12',
    value: 450,
    unit: 'pg/mL',
    category: 'good',
    normalRange: { min: 200, max: 900 },
    description: 'Vitamin essential for nerve function',
    subcategory: 'Vitamins',
  },
  {
    id: 'folate',
    name: 'Folate',
    value: 12,
    unit: 'ng/mL',
    category: 'good',
    normalRange: { min: 3, max: 20 },
    description: 'B vitamin important for DNA synthesis',
    subcategory: 'Vitamins',
  },

  // Cardiac Markers
  {
    id: 'troponin',
    name: 'Troponin I',
    value: 0.02,
    unit: 'ng/mL',
    category: 'good',
    normalRange: { min: 0, max: 0.04 },
    description: 'Protein released when heart muscle is damaged',
    subcategory: 'Cardiac Markers',
  },
  {
    id: 'nt_pro_bnp',
    name: 'NT-proBNP',
    value: 85,
    unit: 'pg/mL',
    category: 'good',
    normalRange: { min: 0, max: 125 },
    description: 'Hormone that indicates heart failure',
    subcategory: 'Cardiac Markers',
  },

  // Protein Markers
  {
    id: 'albumin',
    name: 'Albumin',
    value: 4.2,
    unit: 'g/dL',
    category: 'good',
    normalRange: { min: 3.5, max: 5.0 },
    description: 'Main protein made by the liver',
    subcategory: 'Protein Markers',
  },
  {
    id: 'total_protein',
    name: 'Total Protein',
    value: 7.1,
    unit: 'g/dL',
    category: 'good',
    normalRange: { min: 6.0, max: 8.3 },
    description: 'Total amount of protein in blood',
    subcategory: 'Protein Markers',
  },

  // Additional Metabolic Markers
  {
    id: 'uric_acid',
    name: 'Uric Acid',
    value: 5.2,
    unit: 'mg/dL',
    category: 'good',
    normalRange: { min: 3.5, max: 7.2 },
    description: 'Waste product that can cause gout',
    subcategory: 'Metabolic Panel',
  },
  {
    id: 'phosphorus',
    name: 'Phosphorus',
    value: 3.4,
    unit: 'mg/dL',
    category: 'good',
    normalRange: { min: 2.5, max: 4.5 },
    description: 'Mineral important for bones and teeth',
    subcategory: 'Metabolic Panel',
  },
  {
    id: 'calcium',
    name: 'Calcium',
    value: 9.8,
    unit: 'mg/dL',
    category: 'good',
    normalRange: { min: 8.5, max: 10.5 },
    description: 'Mineral essential for bone health',
    subcategory: 'Metabolic Panel',
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    value: 2.1,
    unit: 'mg/dL',
    category: 'good',
    normalRange: { min: 1.7, max: 2.2 },
    description: 'Mineral involved in many body functions',
    subcategory: 'Metabolic Panel',
  },

  // Iron Studies
  {
    id: 'iron',
    name: 'Iron',
    value: 85,
    unit: 'μg/dL',
    category: 'good',
    normalRange: { min: 60, max: 170 },
    description: 'Mineral essential for oxygen transport',
    subcategory: 'Iron Studies',
  },
  {
    id: 'tibc',
    name: 'TIBC',
    value: 320,
    unit: 'μg/dL',
    category: 'good',
    normalRange: { min: 250, max: 400 },
    description: 'Total iron binding capacity',
    subcategory: 'Iron Studies',
  },
  {
    id: 'ferritin',
    name: 'Ferritin',
    value: 45,
    unit: 'ng/mL',
    category: 'good',
    normalRange: { min: 15, max: 150 },
    description: 'Protein that stores iron',
    subcategory: 'Iron Studies',
  },

  // Hormonal Markers
  {
    id: 'cortisol',
    name: 'Cortisol',
    value: 12,
    unit: 'μg/dL',
    category: 'good',
    normalRange: { min: 6, max: 23 },
    description: 'Stress hormone produced by adrenal glands',
    subcategory: 'Hormones',
  },
  {
    id: 'insulin',
    name: 'Insulin',
    value: 8,
    unit: 'μU/mL',
    category: 'good',
    normalRange: { min: 2, max: 25 },
    description: 'Hormone that regulates blood sugar',
    subcategory: 'Hormones',
  },
  {
    id: 'testosterone',
    name: 'Testosterone',
    value: 450,
    unit: 'ng/dL',
    category: 'good',
    normalRange: { min: 300, max: 1000 },
    description: 'Male sex hormone',
    subcategory: 'Hormones',
  },

  // Additional Biomarkers
  {
    id: 'homocysteine',
    name: 'Homocysteine',
    value: 8.5,
    unit: 'μmol/L',
    category: 'good',
    normalRange: { min: 4, max: 15 },
    description: 'Amino acid linked to heart disease risk',
    subcategory: 'Cardiovascular',
  },
  {
    id: 'ldh',
    name: 'LDH',
    value: 180,
    unit: 'U/L',
    category: 'good',
    normalRange: { min: 140, max: 280 },
    description: 'Enzyme found in many body tissues',
    subcategory: 'Enzyme Panel',
  },
  {
    id: 'cpk',
    name: 'CPK',
    value: 120,
    unit: 'U/L',
    category: 'good',
    normalRange: { min: 30, max: 200 },
    description: 'Enzyme found in heart, brain, and skeletal muscle',
    subcategory: 'Enzyme Panel',
  },
  {
    id: 'amylase',
    name: 'Amylase',
    value: 65,
    unit: 'U/L',
    category: 'good',
    normalRange: { min: 30, max: 110 },
    description: 'Enzyme that helps digest starch',
    subcategory: 'Enzyme Panel',
  },
  {
    id: 'lipase',
    name: 'Lipase',
    value: 28,
    unit: 'U/L',
    category: 'good',
    normalRange: { min: 10, max: 140 },
    description: 'Enzyme that helps digest fats',
    subcategory: 'Enzyme Panel',
  },
]

export const getBiomarkersByCategory = () => {
  const good = biomarkersData.filter((b) => b.category === 'good')
  const average = biomarkersData.filter((b) => b.category === 'average')
  const bad = biomarkersData.filter((b) => b.category === 'bad')

  return { good, average, bad }
}

export const getBiomarkersBySubcategory = () => {
  return biomarkersData.reduce(
    (acc, biomarker) => {
      if (!acc[biomarker.subcategory]) {
        acc[biomarker.subcategory] = []
      }
      acc[biomarker.subcategory].push(biomarker)
      return acc
    },
    {} as Record<string, Biomarker[]>,
  )
}
