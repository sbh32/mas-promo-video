import React from 'react';
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, Img, staticFile, spring, useVideoConfig } from 'remotion';

export const WhatsappPromo: React.FC = () => {
	const { fps } = useVideoConfig();
	const MAS_BLUE = '#0c4f9e';
	const MAS_GREEN = '#5bba47';
	const DARK_BG = '#0a0a0a';
	const textStyle: React.CSSProperties = {
		color: 'white',
		fontWeight: 'bold',
		fontFamily: 'sans-serif',
		textAlign: 'center',
		lineHeight: '1.4',
		textShadow: '0px 4px 20px rgba(0,0,0,0.4)',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	};

	return (
		<AbsoluteFill>
			{/* Scene 1: 0-3s — "You're here." slams in */}
			<Sequence from={0} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();
					const slamSpring = spring({ frame, fps, config: { damping: 8, mass: 1.2 } });
					const scale = interpolate(slamSpring, [0, 1], [2.2, 1]);
					const opacity = interpolate(frame, [0, 5], [0, 1], { extrapolateRight: 'clamp' });
					return (
						<AbsoluteFill style={{ backgroundColor: MAS_BLUE, ...textStyle }}>
							<div style={{ fontSize: '160px', opacity, transform: `scale(${scale})` }}>You're here.</div>
						</AbsoluteFill>
					);
				})()}
			</Sequence>

			{/* Scene 2: 3-6s — "Now stay connected." green bg, slides in */}
			<Sequence from={90} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();
					const slideX = interpolate(frame, [0, 20], [-100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
					return (
						<AbsoluteFill style={{ backgroundColor: MAS_GREEN, ...textStyle }}>
							<div style={{ fontSize: '115px', opacity, transform: `translateX(${slideX}px)`, color: 'white' }}>
								Now stay <span style={{ color: MAS_BLUE }}>connected.</span>
							</div>
						</AbsoluteFill>
					);
				})()}
			</Sequence>

			{/* Scene 3: 6-9s — "Events." "Programs." "Your Community." stagger in */}
			<Sequence from={180} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();
					const makeSlide = (delay: number) => {
						const f = Math.max(0, frame - delay);
						const y = interpolate(f, [0, 15], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
						const opacity = interpolate(f, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
						return { transform: `translateY(${y}px)`, opacity };
					};
					return (
						<AbsoluteFill style={{ backgroundColor: DARK_BG, ...textStyle, gap: '10px' }}>
							<div style={{ fontSize: '110px', ...makeSlide(0) }}>Events.</div>
							<div style={{ fontSize: '110px', ...makeSlide(18) }}>Programs.</div>
							<div style={{ fontSize: '110px', color: MAS_GREEN, ...makeSlide(36) }}>Your Community.</div>
						</AbsoluteFill>
					);
				})()}
			</Sequence>

			{/* Scene 4: 9-12s — "All in one place." then subtitle fades in */}
			<Sequence from={270} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();
					const opacity1 = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
					const opacity2 = interpolate(frame, [25, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					return (
						<AbsoluteFill style={{ backgroundColor: MAS_BLUE, ...textStyle, gap: '30px' }}>
							<div style={{ fontSize: '120px', opacity: opacity1 }}>All in one place.</div>
							<div style={{ fontSize: '58px', opacity: opacity2, fontWeight: 'normal', color: 'rgba(255,255,255,0.85)' }}>
								The MAS Houston WhatsApp Community.
							</div>
						</AbsoluteFill>
					);
				})()}
			</Sequence>

			{/* Scene 5: 12-15s — Split: left CTA + arrow, right green panel with QR */}
			<Sequence from={360} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();
					const leftOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
					const line2Opacity = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const arrowOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const rightSlideX = interpolate(frame, [0, 22], [120, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const rightOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: 'clamp' });
					return (
						<AbsoluteFill style={{ backgroundColor: MAS_BLUE, display: 'flex', flexDirection: 'row' }}>
							{/* Left side */}
							<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '35px', padding: '60px', opacity: leftOpacity }}>
								<div style={{ fontSize: '78px', fontWeight: 'bold', color: 'white', fontFamily: 'sans-serif', textAlign: 'center', textShadow: '0px 4px 20px rgba(0,0,0,0.4)' }}>
									Pull out your phone.
								</div>
								<div style={{ fontSize: '72px', fontWeight: 'bold', color: MAS_GREEN, fontFamily: 'sans-serif', textAlign: 'center', opacity: line2Opacity }}>
									Scan. Join. Stay.
								</div>
								<div style={{ fontSize: '110px', opacity: arrowOpacity, lineHeight: 1 }}>→</div>
							</div>
							{/* Right side — green panel with QR */}
							<div style={{ width: '660px', backgroundColor: MAS_GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: rightOpacity, transform: `translateX(${rightSlideX}px)` }}>
								<div style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0px 10px 40px rgba(0,0,0,0.3)' }}>
									<Img src={staticFile("whatsapp-qr.png")} style={{ width: '360px', height: '360px', objectFit: 'contain' }} />
								</div>
							</div>
						</AbsoluteFill>
					);
				})()}
			</Sequence>
		</AbsoluteFill>
	);
};
