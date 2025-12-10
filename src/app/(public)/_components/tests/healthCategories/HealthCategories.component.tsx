'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { Activity, Brain, Droplets, Heart, Shield, Zap, Fish, Dna, Stethoscope, Target, Users, Apple, TestTubeDiagonal, Icon, NotebookPen } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { containerVariants, slideLeftVariant } from '@/utils/animation.util'
const healthCategories = [
  {
    title: 'Metabolic & Blood Sugar ',
    icon: Activity,
    markersCount: '8 markers',
    markers: ['Fasting glucose', 'HbA1c', 'Insulin', 'C-peptide', 'HOMA-IR'],
    moreMarkers: ['Fructosamine', 'OGTT (2hr glucose)', 'Leptin'],
  },
  {
    title: 'Lipid & Cardiovascular ',
    icon: Heart,
    markersCount: '17 markers',
    markers: ['Total cholesterol', 'LDL cholesterol (direct)', 'HDL cholesterol', 'Triglycerides', ' Non-HDL cholesterol'],
    moreMarkers: ['ApoB', 'ApoA1', 'Lp(a)', 'Homocysteine', 'hs-CRP', 'NT-proBNP', 'Troponin I', 'Lp-PLA2', 'Remnant cholesterol', 'LDL particle number', 'LDL size/pattern', 'HDL large/LDL medium'],
  },
  {
    title: 'Liver & Detoxification',
    icon: Stethoscope,
    markersCount: '7 markers',
    markers: ['AST ', 'ALT ', 'GGT ', 'ALP', 'Bilirubin (total) '],
    moreMarkers: ['Albumin', 'Total protein'],
  },
  {
    title: 'Kidney & Electrolyte ',
    icon: Droplets,
    markersCount: '7 markers',
    markers: ['Creatinine', 'eGFR', 'BUN', 'Uric acid', ' Cystatin C'],
    moreMarkers: ['Sodium', 'Potassium'],
  },
  {
    title: 'Thyroid ',
    icon: Zap,
    markersCount: '6 markers',
    markers: ['TSH ', 'Free T4', 'Free T3', 'Reverse T3', 'TPOAb'],
    moreMarkers: ['Thyroglobulin Ab'],
  },
  {
    title: 'Adrenal & Stress ',
    icon: Target,
    markersCount: '3 markers',
    markers: ['Cortisol (serum, morning)', 'DHEA-S', 'ACTH'],
  },
  {
    title: 'Sex Hormones & Fertility',
    icon: Users,
    markersCount: '7 markers',
    markers: ['Testosterone (total)', 'Testosterone (free)', 'SHBG', 'Estradiol', 'Progesterone'],
    moreMarkers: ['FSH', 'LH'],
  },
  {
    title: 'Nutrient Status',
    icon: Apple,
    markersCount: '14 markers',
    markers: ['Vitamin D (25-OH)', 'Vitamin B12', 'Folate (serum)', 'Vitamin B6', 'Iron'],
    moreMarkers: ['Ferritin', 'Soluble Transferrin Receptor (sTfR)', 'Transferrin', 'TIBC', 'Zinc', 'Copper', 'Methylmalonic Acid (MMA)', 'Magnesium (serum)', 'Selenium'],
  },
  {
    title: 'Inflammation & Immune ',
    icon: Shield,
    markersCount: '8 markers',
    markers: ['WBC count', 'Neutrophils', 'Lymphocytes', 'Monocytes', 'Eosinophils'],
    moreMarkers: ['	Basophils', 'Platelets', 'hs-IL-6'],
  },
  {
    title: 'Blood Health & Haematology',
    icon: TestTubeDiagonal,
    markersCount: '8 markers',
    markers: ['RBC count', 'Hemoglobin', 'Hematocrit', 'MCV', 'MCH'],
    moreMarkers: ['MCHC', 'RDW', 'Reticulocyte count'],
  },
  {
    title: 'Bone & Mineral Health',
    icon: Brain,
    markersCount: '3 markers',
    markers: ['Parathyroid hormone (PTH)', 'Calcium (total)', 'Phosphate'],
  },
  {
    title: 'Cancer Markers ',
    icon: Activity,
    markersCount: '3 markers',
    markers: ['PSA (Prostate-Specific Antigen) – for male members CA125 (Ovarian Cancer Marker) – for female members', 'CEA (Carcinoembryonic Antigen)', 'AFP (Alpha-fetoprotein)'],
  },
  {
    title: 'Advanced Metabolic & Hormonal',
    icon: Droplets,
    markersCount: '3 markers',
    markers: ['IGF-1 (Insulin-like Growth Factor 1)', 'Androstenedione', 'Prolactin'],
  },
  {
    title: 'Heavy Metals & Environmental',
    icon: Shield,
    markersCount: '3 markers',
    markers: ['Lead (blood)', 'Mercury (blood)', 'Aluminium (blood)'],
  },
  {
    title: 'Special Risk/Genetic',
    icon: Dna,
    markersCount: '1 markers',
    markers: ['ApoE genotype'],
  },
  {
    title: 'Fatty Acids',
    icon: Fish,
    markersCount: '2 markers',
    markers: ['Omega-3 index', 'Omega-6:Omega-3 ratio'],
  },
]
const rationaleNotes = [
  'Every test is available through major Australian pathology laboratories.',
  'No redundancy: Each marker adds unique value for screening, risk assessment, or diagnosis.',
  'Genetic markers are limited to those with high prevalence or strong clinical actionability in Australia (HFE, ApoE).',
  'Heavy metals (lead, mercury, aluminium) are included due to environmental relevance in some Australian regions.',
  'Advanced cardiovascular risk is comprehensively covered, including ApoE, ApoB, Lp(a), NT-proBNP, Lp-PLA2, remnant cholesterol, and advanced lipid subfractions.',
  'Bone health is covered with PTH, calcium, and phosphate.',
  'Inflammation is robustly assessed with hs-CRP and high-sensitivity Interleukin-6 (hs-IL-6), a key marker of chronic inflammation and longevity risk.',
  'Fatty acid status (Omega-3 index, Omega-6:Omega-3 ratio) and metabolic hormones (Leptin, IGF-1) are included for their strong links to longevity and chronic disease risk.',
  'No “exotic” or low-yield markers (e.g., rare hormones, niche vitamins, or advanced genetics) are included unless highly actionable for the general population.',
  'The panel is designed for maximum clinical utility, longevity, and preventive health, while remaining practical and accessible for the Australian market.',
]
export default function HealthCategories() {
  return (
    <section className="pb-12 bg-white">
      <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
          <motion.div variants={slideLeftVariant} transition={{ type: 'spring', stiffness: 150, damping: 12 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {healthCategories.map((category, index) => {
                const [open, setOpen] = useState(false)

                return (
                  <Card key={index} className="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 p-4 sm:p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`p-2 bg-[#15AF9D]/10 rounded-lg`}>
                        <category.icon className={`h-5 w-5 sm:h-6 sm:w-6 text-[#0B3029]`} />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">{category.title}</h3>
                        <p className="inline-flex items-center rounded-full bg-secondary text-secondary-foreground text-xs sm:text-sm px-2.5 py-0.5 font-semibold">{category.markersCount || 0}</p>
                      </div>
                    </div>

                    <Collapsible open={open} onOpenChange={setOpen}>
                      <div className="columns-2 gap-4 text-xs sm:text-sm text-gray-600 [column-fill:balance]">
                        {/* Main markers */}
                        {category.markers.map((marker, idx) => (
                          <div key={idx} className="break-inside-avoid mb-2">
                            • {marker}
                          </div>
                        ))}

                        {/* Collapsible content */}
                        <CollapsibleContent className="contents">
                          {category.moreMarkers?.map((marker, idx) => (
                            <div key={idx + category.markers.length} className="break-inside-avoid mb-2">
                              • {marker}
                            </div>
                          ))}
                        </CollapsibleContent>

                        {/* More / Show less button */}
                        {Array.isArray(category.moreMarkers) && (
                          <CollapsibleTrigger asChild>
                            <div
                              className={`
                                text-blue-600 font-medium cursor-pointer select-none break-inside-avoid mt-1
                                ${category.markers.length % 2 === 0 ? 'col-span-full block w-full' : ''}
                              `}
                            >
                              {open ? 'Show less' : `+ ${category.moreMarkers.length} more`}
                            </div>
                          </CollapsibleTrigger>
                        )}
                      </div>
                    </Collapsible>
                  </Card>
                )
              })}
            </div>
          </motion.div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-6">
          <Card className="bg-white shadow-sm border rounded-xl md:p-6">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <NotebookPen className="w-5 h-5 mt-1" />
                Rationale & Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 text-sm sm:text-base text-gray-700 pl-5">
                {rationaleNotes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  )
}
