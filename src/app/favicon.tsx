import { ImageResponse } from 'next/og'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Favicon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#F6391A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        ✈️
      </div>
    ),
    {
      ...size,
    }
  )
}
