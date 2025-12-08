// components/SectionSummary.tsx

type SectionData = {
  findings: string
  interpretation: string
}

type SectionSummaryProps = {
  data: Record<string, SectionData>
}

export default function SectionSummary({ data }: SectionSummaryProps) {
  return (
    <div className="space-y-6">
      {Object.entries(data).map(([key, value]) => {
        const heading = key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())

        return (
          <div key={key} className="border-b pb-4 space-y-4">
            <p className="text-normal font-semibold text-gray-600">{heading}</p>
            <p className="text-sm text-gray-600 ">
              <span className="font-semibold">Findings:</span> {value.findings}
            </p>
            <p className="text-sm text-gray-600 ">
              <span className="font-semibold">Interpretation:</span> {value.interpretation}
            </p>
          </div>
        )
      })}
    </div>
  )
}
