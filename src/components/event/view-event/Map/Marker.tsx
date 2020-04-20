import React from 'react'

export const Marker = ({text, onClick}: any) => 
  <div
    style={{
      position: 'absolute',
      top: '50%',
      bottom: '50%',
      width: '18px',
      height: '18px',
      backgroundColor: '#000',
      border: '2px solid #fff',
      borderRadius: '100%',
      userSelect: 'none',
      transform: 'translate(-50%, -50%',
      cursor: 'pointer'
    }}
  >
    {text}
  </div>
