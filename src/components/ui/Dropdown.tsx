import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

interface Item {
  id: string
  label: string
  onSelect: () => void
}

interface Props {
  button: React.ReactNode
  items: Item[]
  align?: 'left' | 'right',
  buttonClass?: string
}

export function Dropdown({ button, items, align = 'right', buttonClass }: Props) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        
        className={clsx(buttonClass,"h-11 rounded-xl bg-gray-100 px-4 text-sm font-semibold hover:bg-gray-200 focus-visible:focus-ring")}
      >
        {button}
      </button>
      {open && (
        <div
          role="menu"
          className={clsx(
            'absolute z-20 mt-2 w-56 rounded-xl bg-white p-2 shadow-card',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((i) => (
            <button
              key={i.id}
              role="menuitem"
              onClick={() => {
                i.onSelect()
                setOpen(false)
              }}
              className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-100 focus-visible:focus-ring"
            >
              {i.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}