import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from '../importMap'
import { serverFunction } from './actions'

type Args = {
  children: React.ReactNode, 
}

const Layout = ({ children }: Args) =>
  RootLayout({ children, config, importMap, serverFunction })

export default Layout
