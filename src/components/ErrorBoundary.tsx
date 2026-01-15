import React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean; message?: string }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center">
          <div className="card w-[420px] p-6 text-center">
            <h2 className="text-lg font-semibold">Something went wrong</h2>
            <p className="mt-2 text-sm text-text-soft">{this.state.message ?? 'Unknown error'}</p>
            <a href="/" className="mt-4 inline-block rounded-xl bg-primary px-4 py-2 font-semibold text-white">Go Home</a>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}