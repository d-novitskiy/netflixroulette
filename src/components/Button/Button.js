import React from 'react';


export function Button({
  onClick, children, id, className,
}) {
  return (
    <button id={id} type="button" className={className} onClick={onClick}>{children}</button>
  );
}
