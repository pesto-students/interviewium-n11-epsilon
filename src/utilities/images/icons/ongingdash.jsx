import * as React from "react"

const SvgComponent = (props) => (
  <svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <path fill="url(#a)" d="M0 0h48v48H0z" />
    <defs>
      <pattern
        id="a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#b" transform="scale(.02083)" />
      </pattern>
      <image
        id="b"
        width={48}
        height={48}
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
)

export default SvgComponent
