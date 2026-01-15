import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './server'

// MSW for unit/integration tests (node)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())