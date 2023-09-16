
import type { NextRouter } from 'next/router';

export function isActivePath(router: NextRouter, pathname: string) {
    return router.pathname === pathname
  }
