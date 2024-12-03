import React from 'react'
import './style/modal.scss'

const Modal = ({setResetModalOpen}) => {
  return (
    <>
      <div className='modal'>

        <div className='modal_text'>
          <p>All progress will be lost!</p>
          <p>Do you want to reset the changes?</p>
        </div>

        <div className='button_container'>
          <div className='cancel' onClick={()=>setResetModalOpen(false)}>Cancel</div>
          <div className='reset'>Reset</div>
        </div>
      </div>
    </>
  )
}

export default Modal
