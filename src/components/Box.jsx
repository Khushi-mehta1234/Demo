import React from 'react'

const Box = () => {
  return (
    <>
    <h2 style={{color:'orange'}}>Select your Gender</h2>
      <input type='radio' value="male" name='gender' id='male' />
      <label htmlFor='male'>Male</label>
      <input type='radio' value="female" name='gender' id='female'/>
      <label htmlFor='female'>Female</label>
      <input type='radio' value="other" name='gender' id='other'/>
      <label htmlFor='other'>Other</label>
 <hr></hr>
       <h2 style={{color:'green'}}>Checkbox</h2>
       <div>
        <input type='checkbox' value="Mercedes" name='car' id='mercedes'/>
        <label htmlFor='mercedes'>Mercedes</label>
       </div>
       
    </>

   
  )
}

export default Box;
