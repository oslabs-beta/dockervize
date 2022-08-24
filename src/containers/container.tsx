import React from 'react';

const Container: React.FC = () => (
  <div className='container'>
    <div>
      <span>Container Name</span>
    </div>

    <div className='btns'>
      <div className='ea-btn'>
        <div className='toggleText'>On/Off</div>
        <label className='form-switch'>
          <input type='checkbox'></input>
          <i></i>
        </label>
      </div>
      <div className='ea-btn'>
        <div className='toggleText'>Get Data</div>
        <label className='form-switch'>
          <input type='checkbox'></input>
          <i></i>
        </label>
      </div>
    </div>
  </div>
);

export default Container;