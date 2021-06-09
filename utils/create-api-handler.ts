/*
*BZ0016            060321     Setup Server  connect MongGoDB
************************************************************************
*/
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// import { PhongVuConfig, getConfig } from '..'

export type PhongVuApiHandler<
  T = any,
  H extends PhongVuHandlers = {},
  Options extends {} = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<PhongVuApiResponse<T>>,
  // config: PhongVuConfig,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void>

// export interface PhongVuApiHandler<
//   T = any,
//   H extends PhongVuHandlers = {},
//   Options extends {} = {}
// > {
//   (
//     req: NextApiRequest,
//     res: NextApiResponse<PhongVuApiResponse<T>>,
//     // config: PhongVuConfig,
//     handlers: H,
//     // Custom configs that may be used by a particular handler
//     options: Options,
//   ): void | Promise<void>
// }

export type PhongVuHandler<T = any, Body = null> = (options: {
  req: NextApiRequest
  res: NextApiResponse<PhongVuApiResponse<T>>
  body: Body
}) => void | Promise<void>

export type PhongVuHandlers<T = any> = {
  [k: string]: PhongVuHandler<T, any>
}

export type PhongVuApiResponse<T> = {
  data: T | null
  errors?: { message: string; code?: string }[]
}

export default function createApiHandler<
  T = any,
  H extends PhongVuHandlers = {},
  Options extends {} = {}
>(
  handler: PhongVuApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    // config,
    operations,
    options,
  }: {
    operations?: Partial<H>
    options?: Options extends {} ? Partial<Options> : never
  } = {}): NextApiHandler {
    const ops = { ...operations, ...handlers }
    const opts = { ...defaultOptions, ...options }

    return function apiHandler(req, res) {
      return handler(req, res, /* getConfig(config), */ ops, opts)
    }
  }
}
