import React, { useCallback } from 'react'
import { negate, assemble } from '../lib/util'
import './toggle-button.scss'

export function ToggleButton ({
  onClick,
  active,
  onToggle,
  update = negate,
  className = '',
  ...props
}) {
  const handleClick = useCallback(event => {
    if (onClick) {
      onClick(event)
    }

    onToggle(update)
  }, [onClick, onToggle, update])

  return (
    <button
      type='button'
      {...props}
      className={assemble(
        className,
        'toggle-button',
        active && '-is-active'
      )}
      onClick={handleClick}
    />
  )
}
