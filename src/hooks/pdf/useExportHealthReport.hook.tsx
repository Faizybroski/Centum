'use client'

import { Biomarker } from '@/dto'
import { UserDashboardDTO } from '@/dto/userDashboard.dto'
import { useReduxSelector } from '@/hooks'
import { useState } from 'react'

export function useExportHealthReport() {
  const { userProfile } = useReduxSelector((state) => state.user)
  const [loading, setLoading] = useState(false)

  const exportReportToPDF = async (reportData: UserDashboardDTO) => {
    setLoading(true)
    const biomarkerTable = (title: string, biomarkers: Record<string, Biomarker>, color: string) => `
      <div class="card ${color}">
        <h2>${title}</h2>
        <table>
          <tr><th>Name</th><th>Value</th><th>Range</th><th>Unit</th></tr>
          ${
            Object.values(biomarkers || {}).length > 0
              ? Object.values(biomarkers || {})
                  .map(
                    (b) => `
                  <tr>
                    <td>${b.name}</td>
                    <td>${b.value}</td>
                    <td>${b.reference_range}</td>
                    <td>${b.unit}</td>
                  </tr>`,
                  )
                  .join('')
              : '<tr><td colspan="4">No record found</td></tr>'
          }
        </table>
      </div>
    `

    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #333;
          }
          h1, h2, h3 {
            margin: 0 0 10px;
            font-weight: 600;
          }
          .card {
            background: #fff;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          }
          .green { background: #e6f9ec; }
          .blue { background: #eaf3ff; }
          .orange { background: #fff3e6; }
          .red { background: #ffe6e6; }
          .gray { background: #f4f4f4; }

          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; font-size: 13px; }
          th { background: #f4f4f4; text-align: left; }

          .flex { display: flex; }
          .justify-between { justify-content: space-between; }
          .align-center { align-items: center; }
          .gap-2 { gap: 0.5rem; }
          .width-100 { width: 100%; }

          .section-card {
            background: #fff;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          }
          .section-card h3 {
            color: #34495e;
            font-size: 16px;
            margin-bottom: 8px;
          }
          .section-card p {
            margin: 6px 0;
            font-size: 13px;
            color: #555;
            line-height: 1.5;
          }
          .capitalize { text-transform: capitalize; }
        </style>
      </head>
      <body>
          <div class="flex gap-2 align-center justify-between">
            <p>Patient Name: <b>${userProfile?.full_name}</b></p>
            <p class="capitalize">Report Title: <b>${reportData?.report_title || 'Health Report'}</b></p>
          </div>

          <div class="flex gap-2 align-center justify-between">
            <div class="card green width-100 flex align-center justify-between">
              <h3>Health Score: </h3> 
              <h3>${reportData?.health_score || 0}</h3>
            </div>
            <div class="card blue width-100 flex align-center justify-between">
              <h3>VO₂ Max: </h3> 
              <h3>${reportData?.vo2_max || 0}</h3>
            </div>
            <div class="card gray width-100 flex align-center justify-between">
              <h3>Biological Age: </h3> 
              <h3>${reportData?.biological_age || 0}</h3>
            </div>
          </div>

          <div class="card gray">
            <p class="capitalize"><b>Clinical Summary</b></p>
            <p>${reportData?.summary || 'No record found'}</p>
          </div>

          <div class="card blue">
            ${
              Object.entries(reportData?.section_summary || {}).length > 0
                ? Object.entries(reportData?.section_summary || {})
                    .map(
                      ([section, data]) => `
                      <div class="section-card">
                        <h3>${section.replace(/_/g, ' ').toUpperCase()}</h3>
                        <p><b>Findings:</b> ${data?.findings || 'No record found'}</p>
                        <p><b>Interpretation:</b> ${data?.interpretation || 'No record found'}</p>
                      </div>
                    `,
                    )
                    .join('')
                : '<div class="section-card"><p>No record found</p></div>'
            }
          </div>

          <div class="card red">
            <b class="capitalize">Critical Concerns</b>
            <ul>${(reportData?.critical_concerns || []).length > 0 ? (reportData?.critical_concerns || []).map((c) => `<li>${c}</li>`).join('') : '<li>No record found</li>'}</ul>
          </div>

          ${biomarkerTable('🟢 Optimal Biomarkers', reportData?.good_biomarkers, 'green')}
          ${biomarkerTable('🟠 Average Biomarkers', reportData?.normal_biomarkers, 'orange')}
          ${biomarkerTable('🔴 Critical Biomarkers', reportData?.critical_biomarkers, 'red')}

          <div class="card gray">
            <h2 class="capitalize">💡 Lifestyle Recommendations</h2>
            <br/>
            ${
              Object.entries(reportData?.lifestyle_recommendations || {}).length > 0
                ? Object.entries(reportData?.lifestyle_recommendations || {})
                    .map(
                      ([section, data]) => `
                      <div>
                        <h3>${section.replace(/_/g, ' ').toUpperCase()}</h3>
                        <p><b>Summary:</b> ${data?.summary || 'No record found'}</p>
                        <p><b>Why it matters:</b> ${data?.why_this_matters_for_you || 'No record found'}</p>
                        
                        <div>
                          <h4>✅ Do</h4>
                          <ul>
                            ${(data?.do || []).length > 0 ? (data?.do || []).map((d) => `<li>${d}</li>`).join('') : '<li>No record found</li>'}
                          </ul>
                        </div>
                        
                        <div>
                          <h4>❌ Don’t</h4>
                          <ul>
                            ${(data?.dont || []).length > 0 ? (data?.dont || []).map((d) => `<li>${d}</li>`).join('') : '<li>No record found</li>'}
                          </ul>
                        </div>
                      </div>
                      <br/>
                    `,
                    )
                    .join('')
                : '<div><p>No record found</p></div>'
            }
          </div>
        </body>
      </html>
    `

    try {
      const res = await fetch('/api/pdf/export-health-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: htmlContent }),
      })

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'health_report.pdf'
      a.click()
      setLoading(false)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  return { exportReportToPDF, loading }
}
