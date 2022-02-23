import React from 'react'

const Loader = (props) => {
    return (
    <div>
        <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: "auto",
      background: "0 0",
      display: "block",
      shapeRendering: "auto",
    }}
    width={200}
    height={200}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <path d="M10 50a40 40 0 0 0 80 0 40 42 0 0 1-80 0" fill="#00288a">
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="1s"
        repeatCount="indefinite"
        keyTimes="0;1"
        values="0 50 51;360 50 51"
      />
    </path>
  </svg>
    </div>
    )
}

export default Loader;