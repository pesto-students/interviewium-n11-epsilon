
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABTdJREFUaIHtmE1sFGUYx3/PO62dJWLWgAdJpD0hIbS7DZ6ghq6RkJDQ1pMXidNuRS7EcDAkxkBJjInhIMYLIN0ugcQjbTkYE2JplJ403QVighdEE7xoUpSwK2Xn8bA7pbudnZl+bCtJ/6fZ9/P/3+d9Pt4X1rGOdTzTkKDOlp3pr7BwAHAZ+ffW8OFVYbUI+ArwiBtomt/uwpPFCokl0tMABSmlyGVnqjqTTjym1oTCTDE/nFoCf0wt8ZZEetZYDBpoEmPYl+piX6oLMQYDTcbwXksiPdvSnj4fbQsVIBlTa4KkE68lDyRRDTwJQZibaCcGHgkSAxBjeHPvbo4ecaoGf3k2y7XJKdR1y9TQQjGf2RC4Q9KJx9RcB0kAuYKUUgBz5NF8QdzuBdaJiKcWUGLe50ubXmTH9m0LBh894jD29Xn2pboA8AQHIpedKYjbDZqnYomVIl/mUEEskVZVZeuWzfz+x1+RFyjkh6OZv9oSrAR5qPEBEeHON59x7lQ/r7y8KXSyqi5yO1H/76WjygIAj3IXIk3ckBwEIlpgvsOWjxJVPrEMK5jwIctEDfmCuN21PlEVnRaJhgvwddgax7bVurLU9RtvAVR8HXa+CJ88EEukp2OJ9LSddNqCVm+qbbg8PsU7PbsDKV0en4pMv5DPJOt25rIzBajTrwKSEDXTzTuc1OzP2ZzfqHkWKDvX4RMZth847kvy8vgU2w8c5/CJTNWcRqAgbjfKGEi8qdmattsHHL9xVaaz2wccjAwJtAJs3bKJj4/0AvDJ2TF+u1/ODwr3cHWoeCuTbZQAD7GO9BmED8ob65nCzcyxugI81ArxsJrEa/mIkZHKz9GClPo9fwqM4Z4QgBUlXhVao0FVESnTVXhYzA9vhIAoZCedNoRWUAVVhNawiBAVMdcaYhHkAZCn/7WiT+aaqwYlnbjtWr0IjkC33zoK11GyRVMaW0oGtXcOdoulEwBPZkud9aJLLa96BaB4i2K57wr0gcQBXng+xsFUJ4d69gBwafwGVyem+fthwZMyozBKyVws3r5wPRL7ckF3FySuqqeKNzNDyyEPIJUb05w5u3Zt41DPHg6+0Ul8Y3WpP/PPI65+N82l8Rv88NMv87tyhfxwZxiXWEd6FKFXVSeLNzO+Fl4MeU+AAnz0/kEO9e6hdcvm0HUB7t3/k0tjN/j03FUgvKjzIonCA6SULOayvy6XfJWAelXo/sHTAHx74UPf/ihVqZ102kTNNEhcXe2PEs2enozge8OCUqIW3/94J2xIOFyTRSSOMhY9FKsAoZeeUAHLhd0xMCQiexUeFE3JtxzwQ2ANNQ8NFdC8w0mKyEkAStLH7eVdH/3QUAFNzaZ8XJQvgkJtJYyXS4WS6Y8cllmFIwSaLxjXP94nnbit5nNBnbmcaumEnRjIFsU9FiVRNlRA0Dl+rj3dZ6mOeIlTVU8BiMhJQZyYmr5Se7r/8a3h0aA9QgV07Vr4PrQSsAxXQFDVSYzrFPPlvGAnnSyuyYrI3vKY4IJzLg/Mx+uvvVo37u8fPO0bWiO/D1Xg7VtvXli/B6Oqk7WNQbHfr89vjdVCU21N4im/FpK/FvuPNwqr8CrRWKxCGA2GnUhPIKV+r7izk04bao2EzfOwZgJKLm8ZQ1agG7Xu2h0DQwCi5SuswgPXJbT0WLMj9PjW8GhRSm2qXAQQkSGRCnnlYlFKbWE5ANb6COWyM0Vw7J2DWSwtlx0lcf5npUQ4KoSX9GDwzEehdQFrjbo+0PP24GryWDIWWCBKXbOWtU8t/gObpnucnxfERgAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
)

export default SvgComponent
