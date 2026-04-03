import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, Img, staticFile, spring, useVideoConfig } from 'remotion';

export const WhatsappPromo: React.FC = () => {
	const { fps } = useVideoConfig();
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
					const localFrame = useCurrentFrame();
					const opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
					const bounceScale = spring({ frame: localFrame, fps, config: { damping: 10, mass: 0.5 } });
					const scale = interpolate(bounceScale, [0, 1], [0.8, 1]);

					return <AbsoluteFill style={{ ...textStyle, opacity, transform: `scale(${scale})` }}>
						<div>Having a great time <span style={{ color: MAS_GREEN }}>tonight?</span></div>
					</AbsoluteFill>;
				})()}
			</Sequence>

			{/* Scene 2: QR Code & CTA */}
			<Sequence from={90} durationInFrames={210}>
				{(() => {
					const localFrame = useCurrentFrame();
					
					// Title slides down from the top and fades in
					const titleY = interpolate(localFrame, [0, 20], [-40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const titleOpacity = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

					// "DON'T MISS OUT!" pops into the screen on a spring after 15 frames
					const dmoFrame = Math.max(0, localFrame - 15);
					const dmoSpring = spring({ frame: dmoFrame, fps, config: { damping: 9, mass: 0.7 } });
					const dmoScale = interpolate(dmoSpring, [0, 1], [0, 1]);
					
					// Subtext slides up from the bottom after 25 frames
					const subFrame = Math.max(0, localFrame - 25);
					const subY = interpolate(subFrame, [0, 20], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const subOpacity = interpolate(subFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

					// QR Code bursts organically onto screen after 40 frames
					const qrFrame = Math.max(0, localFrame - 40);
					const qrSpring = spring({ frame: qrFrame, fps, config: { damping: 12, mass: 0.8 } });
					const qrScale = interpolate(qrSpring, [0, 1], [0, 1]);

					return <AbsoluteFill style={{ ...textStyle }}>
						
						<div style={{ marginBottom: '20px', fontSize: '65px', opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
							Scan to join our <span style={{ color: MAS_GREEN }}>WhatsApp community!</span>
						</div>
						
						<div style={{ marginBottom: '15px', fontSize: '50px', color: MAS_GREEN, textTransform: 'uppercase', letterSpacing: '4px', transform: `scale(${dmoScale})` }}>
							Don’t miss out!
						</div>
						
						<div style={{ marginBottom: '40px', fontSize: '40px', fontWeight: 'normal', opacity: subOpacity, transform: `translateY(${subY}px)` }}>
							Stay up to date on all events and programs
						</div>
						
						<div style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0px 10px 40px rgba(0,0,0,0.5)', transform: `scale(${qrScale})` }}>
							<Img src={staticFile("whatsapp-qr.png")} style={{ width: '350px', height: '350px', objectFit: 'contain' }} />
						</div>

					</AbsoluteFill>;
				})()}
			</Sequence>
		</AbsoluteFill>
	);
};
