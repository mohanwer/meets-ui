import React, {useState} from 'react'

interface CreateCommentTextBoxProps {
  onSubmit: (commentText: string) => Promise<any>
}

export const CreateCommentTextBox = ({onSubmit}: CreateCommentTextBoxProps) => {
  const initialFormValues = {text: "", disableInput: true}
  const [userInput, setUserInput] = useState(initialFormValues)

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput({text: e.target.value, disableInput: e.target.value === "" })
  }

  return (
    <>
      <div className='shadow'>
        <textarea 
          className='w-full inner-spacing'
          onChange={e => onInputChange(e)}
          value={userInput.text}
        />
      </div>
      <button 
        className='btn-gray outer-spacing-top'
        disabled={userInput.disableInput}
        onClick={async() => {
          await onSubmit(userInput.text)
          setUserInput(initialFormValues)
        }}
      >
        Post
      </button>
    </>
  )
}