import * as React from 'react'
import { Box, Divider, IconButton, Menu, MenuItem } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useState } from 'react'
import { isPresent } from '../lib/common/utils/types'
import { ReactMouseEvent } from '../lib/react-common/utils/types'
import useNavigation from '../app/Navigation'

interface Props {
  onOpen?: (e: ReactMouseEvent) => void,
  onClose?: (e: ReactMouseEvent) => void
}

export default function GameMenu({ onOpen, onClose }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const isOpen = isPresent(anchorEl)

  const { navigate } = useNavigation()

  function handleOpen(e: ReactMouseEvent) {
    if (isPresent(onOpen)) {
      onOpen(e)
    }
    setAnchorEl(e.currentTarget)
  }

  function handleClose(e: ReactMouseEvent) {
    if (isPresent(onClose)) {
      onClose(e)
    }
    setAnchorEl(null)
  }

  function handleHome(e: ReactMouseEvent) {
    handleClose(e)
    navigate('home')
  }

  function handleCamera(e: ReactMouseEvent) {
    handleClose(e)
    navigate('camera')
  }

  return (
    <Box>
      <IconButton
        id='demo-positioned-button'
        aria-controls={isOpen ? 'demo-positioned-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleOpen}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleHome}>Home</MenuItem>
        <MenuItem onClick={handleCamera}>Kamera</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Zum Spiel</MenuItem>
      </Menu>
    </Box>
  )
}
