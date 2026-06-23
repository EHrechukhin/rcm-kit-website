'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type ColorTheme = 'default' | 'teal' | 'indigo' | 'emerald' | 'amber'
export type ModeTheme = 'dark' | 'light'

const ThemeContext = createContext<{
   colorTheme: ColorTheme
   setColorTheme: (t: ColorTheme) => void
   modeTheme: ModeTheme
   setModeTheme: (m: ModeTheme) => void
   mounted: boolean
}>({ colorTheme: 'emerald', setColorTheme: () => {}, modeTheme: 'dark', setModeTheme: () => {}, mounted: false })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('emerald')
  const [modeTheme, setModeTheme] = useState<ModeTheme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Disable lint: setMounted(true) after hydration is a standard SSR-safe pattern
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    
    const storedColor = localStorage.getItem('rcm-color-theme') as ColorTheme | null
    const storedMode = localStorage.getItem('rcm-mode') as ModeTheme | null
    if (storedColor) setColorTheme(storedColor)
    if (storedMode) setModeTheme(storedMode)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const html = document.documentElement
    html.classList.remove('theme-teal', 'theme-indigo', 'theme-emerald', 'theme-amber')
    if (colorTheme !== 'default') html.classList.add(`theme-${colorTheme}`)
    html.classList.remove('light')
    if (modeTheme === 'light') html.classList.add('light')
    localStorage.setItem('rcm-color-theme', colorTheme)
    localStorage.setItem('rcm-mode', modeTheme)
  }, [colorTheme, modeTheme, mounted])

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme, modeTheme, setModeTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useColorTheme = () => {
  const ctx = useContext(ThemeContext)
  return { colorTheme: ctx.colorTheme, setColorTheme: ctx.setColorTheme, mounted: ctx.mounted }
}
export const useModeTheme = () => {
  const ctx = useContext(ThemeContext)
  return { modeTheme: ctx.modeTheme, setModeTheme: ctx.setModeTheme, mounted: ctx.mounted }
}
