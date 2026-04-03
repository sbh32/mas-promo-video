import React from 'react';
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, Img, staticFile } from 'remotion';

export const WhatsappPromo: React.FC = () => {
	const MAS_BLUE = '#0c4f9e';
	const MAS_GREEN = '#5bba47';
	const textStyle: React.CSSProperties = { color: 'white', fontSize: '80px', fontWeight: 'bold', fontFamily: 'sans-serif', textAlign: 'center', lineHeight: '1.4', textShadow: '0px 4px 20px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' };

	return (
		<AbsoluteFill style={{ backgroundColor: MAS_BLUE }}>
			{/* Persistent Logo */}
			<Img src={staticFile("mas-logo.png")} style={{ position: 'absolute', top: 60, left: 60, width: 350, zIndex: 1000 }} />

			{/* Scene 1: Question */}
			<Sequence from={0} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();
					const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
					const scale = interpolate(frame, [0, 90], [1, 1.05]);
					return <AbsoluteFill style={{ ...textStyle, opacity, transform: `scale(${scale})` }}>
						<div>Having a great time <span style={{ color: MAS_GREEN }}>tonight?</span></div>
					</AbsoluteFill>;
				})()}
			</Sequence>

			{/* Scene 2: QR Code & CTA */}
			<Sequence from={90} durationInFrames={210}>
				{(() => {
					const frame = useCurrentFrame();
					const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
					return <AbsoluteFill style={{ ...textStyle, opacity }}>
						<div style={{ marginBottom: '20px', fontSize: '65px' }}>
							Scan to join our <span style={{ color: MAS_GREEN }}>WhatsApp community!</span>
						</div>
						<div style={{ marginBottom: '15px', fontSize: '50px', color: MAS_GREEN, textTransform: 'uppercase', letterSpacing: '4px' }}>
							Don’t miss out!
						</div>
						<div style={{ marginBottom: '40px', fontSize: '40px', fontWeight: 'normal' }}>
							Stay up to date on all events and programs
						</div>
						<div style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0px 10px 40px rgba(0,0,0,0.5)' }}>
							<Img src={staticFile("whatsapp-qr.png")} style={{ width: '350px', height: '350px', objectFit: 'contain' }} />
						</div>
					</AbsoluteFill>;
				})()}
			</Sequence>
		</AbsoluteFill>
	);
};
