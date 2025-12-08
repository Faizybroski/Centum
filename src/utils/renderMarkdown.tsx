import React from 'react'

export function renderMarkdown(text: string): React.ReactNode[] {
  if (!text) return [<div key="empty">No summary available.</div>]

  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let listItems: React.ReactNode[] = []

  const flushList = () => {
    if (listItems.length) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-5 space-y-1">
          {listItems}
        </ul>,
      )
      listItems = []
    }
  }

  lines.forEach((line, idx) => {
    const trimmed = line.trim()
    if (!trimmed) {
      flushList()
      return
    }

    // Heading ### -> h3
    if (trimmed.startsWith('###')) {
      flushList()
      elements.push(
        <h3 key={idx} className="text-base font-semibold mt-4">
          {trimmed.replace(/^###\s*/, '')}
        </h3>,
      )
      return
    }

    // List item - -> li
    if (trimmed.startsWith('-')) {
      const content = trimmed.replace(/^-+\s*/, '')
      listItems.push(
        <li
          key={idx}
          dangerouslySetInnerHTML={{
            __html: content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          }}
        />,
      )
      return
    }

    // Paragraph
    flushList()
    elements.push(
      <div
        key={idx}
        className="text-sm"
        dangerouslySetInnerHTML={{
          __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
        }}
      />,
    )
  })

  flushList()
  return elements
}
