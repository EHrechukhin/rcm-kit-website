'use client'

import { useRef, useState, useEffect } from 'react'
import { useColorTheme, type ColorTheme, useModeTheme } from './theme-provider'
import { Sun, Moon, Settings } from 'lucide-react'

const THEMES: { id: ColorTheme; label: string; color: string; accent: string }[] = [
  { id: 'default', label: 'Blue',    color: '#3B82F6', accent: '#8B5CF6' },
  { id: 'teal',    label: 'Teal',    color: '#14B8A6', accent: '#0EA5E9' },
  { id: 'indigo',  label: 'Indigo',  color: '#6366F1', accent: '#E879F9' },
  { id: 'emerald', label: 'Emerald', color: '#10B981', accent: '#34D399' },
  { id: 'amber',   label: 'Amber',   color: '#F59E0B', accent: '#FB923C' },
]

export function ThemeSwitcher() {
  const { colorTheme, setColorTheme, mounted } = useColorTheme()
  const { modeTheme, setModeTheme } = useModeTheme()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[300] flex items-center gap-2 select-none"
    >
      {/* Panel */}
      <div
        className={`flex flex-col items-center gap-1.5 px-2.5 py-3 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-2xl shadow-xl transition-all duration-300 ${
          open
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)' }}
      >
        {/* Dark / Light toggle */}
        <button
          onClick={() => setModeTheme(modeTheme === 'dark' ? 'light' : 'dark')}
          title={modeTheme === 'dark' ? 'Light mode' : 'Dark mode'}
          className="relative group flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          {modeTheme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-white" strokeWidth={2} />
          ) : (
            <Moon className="w-3.5 h-3.5 text-slate-700" strokeWidth={2} />
          )}
          <span className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-[11px] font-medium bg-black/90 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {modeTheme === 'dark' ? 'Light mode' : 'Dark mode'}
          </span>
        </button>

        <div className="w-4 h-px bg-white/10" />

        {/* Color swatches */}
        {THEMES.map((t) => {
          const active = colorTheme === t.id
          return (
            <button
              key={t.id}
              onClick={() => setColorTheme(t.id)}
              title={t.label}
              className="relative group flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none"
              style={{
                background: `linear-gradient(135deg, ${t.color}, ${t.accent})`,
                boxShadow: active
                  ? `0 0 0 2px rgba(255,255,255,0.9), 0 0 12px ${t.color}60`
                  : 'none',
                transform: active ? 'scale(1.12)' : undefined,
              }}
            >
              {active && (
                <svg
                  className="w-3.5 h-3.5 text-white drop-shadow"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-[11px] font-medium bg-black/90 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {t.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Gear button */}
      <button
        onClick={() => setOpen((o) => !o)}
        title="Theme settings"
        className={`flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-black/70 backdrop-blur-2xl shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none ${
          open ? 'rotate-45' : 'rotate-0'
        }`}
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)', transition: 'transform 0.3s ease, box-shadow 0.2s' }}
      >
        <Settings className="w-4 h-4 text-white/60" strokeWidth={1.75} />
      </button>
    </div>
  )
}
