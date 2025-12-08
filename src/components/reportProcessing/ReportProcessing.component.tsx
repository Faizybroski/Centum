import Image from 'next/image'

export default function ReportProcessing() {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-xl">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50 via-primary/10 to-warning/10 animate-report-background" />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center p-6">
        <Image src="/assets/icons/monitor.gif" alt="Logo" width={80} height={80} className="mb-4" unoptimized />
        <h1 className="text-xl font-semibold text-center text-primary/90 animate-pulse">Processing your report. This won't take long</h1>
        <div className="flex gap-1 mt-4">
          <span className="w-2 h-2 bg-primary/90 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-primary/90 rounded-full animate-bounce [animation-delay:0.3s]"></span>
          <span className="w-2 h-2 bg-primary/90 rounded-full animate-bounce [animation-delay:0.5s]"></span>
        </div>
      </div>
    </div>
  )
}
