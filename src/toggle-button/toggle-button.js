import React, { useState, useEffect, useCallback } from 'react'
import { negate, assemble } from '../lib/util'
import './toggle-button.scss'

export function ToggleButton ({
  onClick,
  hook = [],
  className = '',
  ...props
}) {
  const [state = false, setState] = hook
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
      type='button'
      {...props}
      className={assemble(className, 'toggle-button')}
      onClick={handleClick}
    />
  )
}
