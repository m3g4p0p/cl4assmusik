import React, { useCallback } from 'react'
import { negate, assemble } from '../lib/util'
import './toggle-button.scss'

export function ToggleButton ({
  onClick,
  update,
  reducer = negate,
  className = '',
  ...props
}) {
  const handleClick = useCallback(event => {
    if (onClick) {
      onClick(event)
    }

    update(reducer)
  }, [onClick, update, reducer])

  return (
    <button
      type='button'
      {...props}
      className={assemble(
        className,
        'toggle-button'
      )}
      onClick={handleClick}
    />
  )
}
