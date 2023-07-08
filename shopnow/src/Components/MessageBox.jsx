import React from 'react';

const MessageBox = (props) => {
  return (
    <div className={'alert alert-' + (props.varient || 'info')}>
      {props.children}
    </div>
  );
};

export default MessageBox;
