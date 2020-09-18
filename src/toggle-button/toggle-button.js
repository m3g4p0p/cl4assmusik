import React, { useState, useEffect, useCallback } from 'react'
import { negate, assemble } from '../lib/util'
import './toggle-button.scss'

export function ToggleButton ({
  onClick,
  setState,
  state = false,
  className = '',
  ...props
}) {
  const [active, setActive] = useState(state)

  const handleClick = useCallback(event => {
    if (onClick) {
      onClick(event)
    }

    setActive(negate)
  }, [onClick])

  useEffect(() => {
    if (setState) {
      setState(active)
    }
  }, [setState, active])

  return (
    <button
      {...props}
      className={assemble(className, 'toggle-button')}
      onClick={handleClick}
    />
  )
}
