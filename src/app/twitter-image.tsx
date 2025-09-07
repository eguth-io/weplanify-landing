import { ImageResponse } from 'next/og'
 
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #57CFFF, #F6391A)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 20 }}>✈️</div>
        <div style={{ fontSize: 80, fontWeight: 'bold', textAlign: 'center', maxWidth: 1000 }}>
          WePlanify
        </div>
        <div style={{ fontSize: 40, textAlign: 'center', maxWidth: 1000, marginTop: 20 }}>
          Planifiez, partagez, partez
        </div>
        <div style={{ fontSize: 24, textAlign: 'center', maxWidth: 1000, marginTop: 20 }}>
          Une seule appli pour tout gérer
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
