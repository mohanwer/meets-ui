import React from 'react'

interface EditButtonProps {
  onClick: ()=>void
}

export const EditButton = (props : EditButtonProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="15" 
    height="15" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="feather feather-edit-3 block cursor-pointer"
    onClick={props.onClick}
    >
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
)