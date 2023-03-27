import { ReactNode } from 'react'
import * as React from 'react'

export interface ChildrenProps {
  children?: ReactNode;
}

export type ReactMouseEvent = React.MouseEvent<HTMLElement>
