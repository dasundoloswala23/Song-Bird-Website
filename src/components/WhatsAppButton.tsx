import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'

export function WhatsAppButton() {
  const url = buildWhatsAppUrl(WHATSAPP_NUMBER, 'Hello Songbird, I would like to enquire about your services.')
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(37,211,102,.45)] animate-pulse-slow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2"
      style={{ animation: 'whatsapp-pulse 2.4s ease-in-out infinite' }}
    >
      <MessageCircle className="w-7 h-7" fill="white" stroke="none" />
    </a>
  )
}
