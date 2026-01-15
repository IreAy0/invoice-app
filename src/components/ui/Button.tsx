import React from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  pill?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const base =
  'inline-flex items-center justify-center font-medium  font-neue-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:focus-ring'

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-6 text-base'
}

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-600 active:bg-primary-700',
  secondary:
    'bg-white border-2 border-gray-100 text-text-body hover:bg-gray-200 active:bg-gray-300',
  ghost:
    'bg-transparent text-text hover:bg-gray-100 active:bg-gray-200 border border-gray-200'
}

export function Button({
  variant = 'primary',
  size = 'md',
  pill,
  iconLeft,
  iconRight,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        base,
        sizes[size],
        variants[variant],
        pill ? 'rounded-pill' : 'rounded-xl',
        className
      )}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  )
}