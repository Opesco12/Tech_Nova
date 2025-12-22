import type React from "react"
// Removed Next.js-specific imports and types to make this file compatible with Vite React setup
import "./index.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        {/* Analytics removed (Next/Vercel specific) */}
      </body>
    </html>
  )
}