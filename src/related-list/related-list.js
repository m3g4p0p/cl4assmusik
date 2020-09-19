import React from 'react'

export function RelatedList ({ related }) {
  return related.length ? (
    <div className='related-list'>
      {related}
    </div>
  ) : null
}
