'use server'

import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from '../importMap'

export const serverFunction: ServerFunctionClient = async ({ name, args }) =>
  handleServerFunctions({ name, args, config, importMap })
