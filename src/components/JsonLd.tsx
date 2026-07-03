/**
 * Renders a schema.org JSON-LD block. Emit one per schema object so search
 * engines (and Google AI Overviews) can parse each entity independently.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
