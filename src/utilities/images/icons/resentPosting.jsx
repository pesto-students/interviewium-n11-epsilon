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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABDlJREFUaIHtmE1IXGcUhp9vJikqtRGMQsVEpaChYZhxEUgbSJ0SUEKNLgq2lIJmpD9QSrtQN6VqQUi0i0LbRWgmtSRt2rQLf0paaalTE0uLKTOjjYlZNP4EF42CIoyCOl8XkzsdzXXuf1x03tUw93znvC/nnHvfeyGDDP7fEE4kzfKcbsRFOwBSdKyNB79wog7YLEAhLhClqf9L5LRTQmwRsJ14QUE+L794CoDL3w1w//4i4IwQywKyvacjUgovQGFhgviJqmNbYn4OjW4RAkRWo8FKq7UBXFYTSCm8QoAQ8FTpQTyHKx6KOVF1jOAnZ3n7zSblL5/VugosCxACpJQ88Xg2v4+Feaetk8vfDqjGbu+MHbBhhAIS4NbVM7R0f833oYiuc6vRoC37Z7kDCkqK9nPlo7f48bMWDjyZb1daTeyxO+HxIxVM/XB2x+s5vmZb69nWgd1CRoCCSwO/acZc7B+1q1wSNgiQUYDX3r/AoZNtqkIu9o9y6GQbr7d/vuWMHbDRSogOASUAB4vyee+NOqSUdJ0bYHZesRLMEJcdaxMXeu2oC46Yuf+EKHCCuAIH7bToAHCKuAK33Qkf8zTVCZeoARKWWoCr0MfmP5Epu2s9SG8NWb7GUuLu54SgHqjXCO+Tkj5cm7+uRXqnrdYGkwL2Pt3oc+9x1Qkh6tnmLD3lxdT6K6n1J9zy4HCYweEwE3fubU8TkVL2bW7E+9cne/UZKBUYFpDtDYS3k36hyketv5LjRyooKdqvem5mfoGRsSkGh8Nqhs/0+4EZARLgldpnqfVXcup59brVzT0ADJ1vUb0+8EuiM18OJp4bZt2paQGxyPm0cYpp0xtnVkDGC+02VNumtqi7BQmhtWjQv9N11Q5IKHOOkmGk5aL6RiYkIQR15zqbeLXO/hdxPfj40k+0ffgNSELp4lQ7EEeGAEZuOPL014VrSm0pTQjYiIcArv1pTsDSSoyjDZ0cbehkaSVmKkeytjtuXMD6ZG9EwvLs/CIz8wuGCi+txKhp7mF8ao7xqTlqmnsMi4jenmV5ZRUJM1qeacfbqHgweyNj+ruQSr6spJiykmJTIpKjqzH/kEaAmT2oDnQnyXe1t9LV3poU0fDup7rz6J1/SCfAyh4I8dBvKaXu43rnHzS8UJY3sCRg362rZ3Z0malYWolRHehm4s49ykoPAHB3eg5PeTFDwVbycnM0c0Rvz/LMSx8k5j8aLNWKT2sljO5BXm4OQ8FWPOXF3J2eM0wejM0/aAgwswepIoySB2PzDxrfRuMb8ZBrr9vwHuTl5vDHlQ5DZxQYmX/QELA+2RtxewPLs/OL+766vkBhgfYeWMHf0/rv/wo07bSyBxM3nbcVE5PG5h90CFD2YPwRCPjrprH5BxBZ3sCwgKqdAqSUCOHI9y/TSH1HcCFlWnYJ8vofQtaho5YG5wweJf4FGbbZ+offSsQAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
)

export default SvgComponent
