// Sample health data for demonstration
export const sampleHealthSummary = {
  reportGist: {
    overallHealth: {
      status: 'Good',
      score: 82,
    },
    keyMetrics: {
      status: 'Normal',
      withinRange: 8,
      total: 10,
    },
    trends: {
      status: 'Improving',
      change: '+5% improvement',
    },
    highlights: [],
  },

  dietRecommended: {
    foodsToInclude: ['Leafy greens (spinach, kale)', 'Fatty fish (salmon, mackerel)', 'Nuts and seeds', 'Berries and citrus fruits', 'Whole grains (quinoa, oats)', 'Fortified dairy products'],

    foodsToLimit: ['Processed meats', 'Trans fats and fried foods', 'Excessive salt', 'Sugary beverages', 'Refined carbohydrates', 'High sodium canned foods'],

    mealPlanningTips: [
      'Aim for 5-6 small meals throughout the day',
      'Include protein, healthy fats, and complex carbohydrates in each meal',
      'Stay hydrated with 8-10 glasses of water daily',
      'Practice portion control using the plate method',
      'Focus on colorful, nutrient-dense foods',
    ],
  },

  exerciseRecommendations: {
    recommended: [
      {
        type: 'Brisk Walking',
        duration: '30-45 minutes',
        benefits: 'Low impact, improves cardiovascular health',
      },
      {
        type: 'Swimming',
        duration: '30-40 minutes',
        benefits: 'Full body workout, joint-friendly',
      },
      {
        type: 'Light Strength Training',
        duration: '20-30 minutes',
        benefits: 'Maintains muscle mass and bone density',
      },
    ],

    toAvoid: [
      {
        type: 'High-Impact Running',
        reason: 'May stress joints given current knee concerns',
      },
      {
        type: 'Heavy Weightlifting',
        reason: 'Risk of injury without proper form supervision',
      },
      {
        type: 'Contact Sports',
        reason: 'Higher injury risk, not suitable for current fitness level',
      },
    ],
  },
}

// Sample health reports for history and dashboard
export const sampleHealthReports = [
  {
    id: 1,
    userId: 1,
    title: 'Comprehensive Blood Panel',
    reportType: 'Blood Work',
    reportDate: '2024-12-15',
    status: 'ready',
    score: 85,
    summary: 'Overall health indicators are within normal ranges with minor vitamin D deficiency noted.',
    filePath: '/reports/blood-panel-2024-12-15.pdf',
    createdAt: new Date('2024-12-15'),
    metrics: {
      cholesterol: 'Normal',
      glucose: 'Normal',
      vitaminD: 'Low',
    },
  },
  {
    id: 2,
    userId: 1,
    title: 'Annual Physical Exam',
    reportType: 'Physical Exam',
    reportDate: '2024-11-20',
    status: 'ready',
    score: 78,
    summary: 'Physical examination reveals good overall health with recommendations for increased cardiovascular exercise.',
    filePath: '/reports/physical-exam-2024-11-20.pdf',
    createdAt: new Date('2024-11-20'),
    metrics: {
      bloodPressure: 'Normal',
      heartRate: 'Normal',
      bmi: 'Slightly High',
    },
  },
  {
    id: 3,
    userId: 1,
    title: 'Cardiac Stress Test',
    reportType: 'Cardiac',
    reportDate: '2024-10-05',
    status: 'ready',
    score: 92,
    summary: 'Excellent cardiovascular response to stress testing. Heart function is optimal.',
    filePath: '/reports/cardiac-stress-2024-10-05.pdf',
    createdAt: new Date('2024-10-05'),
    metrics: {
      maxHeartRate: 'Excellent',
      recovery: 'Fast',
      endurance: 'Above Average',
    },
  },
  {
    id: 4,
    userId: 1,
    title: 'Nutritional Assessment',
    reportType: 'Nutrition',
    reportDate: '2024-09-12',
    status: 'ready',
    score: 74,
    summary: 'Dietary analysis shows adequate protein intake but insufficient fiber and omega-3 fatty acids.',
    filePath: '/reports/nutrition-2024-09-12.pdf',
    createdAt: new Date('2024-09-12'),
    metrics: {
      protein: 'Adequate',
      fiber: 'Low',
      omega3: 'Insufficient',
    },
  },
]

// Mock health assessment data
export const mockHealthAssessment = {
  id: 1,
  userId: 1,
  medicalHistory: {
    primaryCarePhysician: {
      name: 'Dr. Sarah Johnson',
      phone: '(555) 123-4567',
      location: 'Downtown Medical Center',
    },
    currentMedications: 'Multivitamin, Omega-3 supplement',
    allergies: 'None known',
    pastMedicalConditions: ['Seasonal allergies'],
    familyMedicalHistory: ['Heart disease (paternal)', 'Diabetes (maternal)'],
  },
  lifestyle: {
    exerciseFrequency: '3-4 times per week',
    dietType: 'Mediterranean',
    sleepHours: '7-8 hours',
    smokingStatus: 'Never',
    alcoholConsumption: 'Occasional social drinking',
    stressLevel: 'Moderate',
  },
  healthGoals: {
    primaryHealthGoals: ['Maintain current weight', 'Improve cardiovascular health'],
    specificConcerns: 'Family history of heart disease',
    communicationMethod: 'Email',
    interventionLevel: 'Moderate',
    areasOfInterest: ['Nutrition planning', 'Exercise guidance', 'Preventive care'],
  },
  consent: {
    privacyPolicy: true,
    medicalDisclaimer: true,
    termsOfService: true,
    contactConsent: true,
  },
  isCompleted: true,
  createdAt: new Date('2024-12-01'),
}
