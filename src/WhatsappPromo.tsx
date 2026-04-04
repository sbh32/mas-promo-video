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
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	};

	return (
		<AbsoluteFill>
			{/* Scene 1: 0-3s — "You're here." slams in, shakes, then glows */}
			<Sequence from={0} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();
					const slamSpring = spring({ frame, fps, config: { damping: 6, mass: 1.4 } });
					const scale = interpolate(slamSpring, [0, 1], [3, 1]);
					const opacity = interpolate(frame, [0, 4], [0, 1], { extrapolateRight: 'clamp' });
					// shake after slam settles (~frame 20)
					const shakeAmount = interpolate(frame, [18, 30], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const shakeX = Math.sin(frame * 3.5) * 8 * shakeAmount;
					// glow pulse
					const glowPulse = Math.sin((frame - 30) * 0.18) * 0.5 + 0.5;
					const glowSize = interpolate(glowPulse, [0, 1], [20, 50]);
					// bg zoom
					const bgScale = interpolate(frame, [0, 90], [1, 1.06]);
					return (
						<AbsoluteFill style={{ backgroundColor: MAS_BLUE, overflow: 'hidden', transform: `scale(${bgScale})` }}>
							<AbsoluteFill style={{ ...textStyle }}>
								<div style={{
									fontSize: '160px',
									opacity,
									transform: `scale(${scale}) translateX(${shakeX}px)`,
									textShadow: `0px 0px ${glowSize}px rgba(91,186,71,0.7), 0px 4px 20px rgba(0,0,0,0.5)`,
								}}>
									You're here.
								</div>
							</AbsoluteFill>
						</AbsoluteFill>
					);
				})()}
			</Sequence>

			{/* Scene 2: 3-6s — "Now stay connected." with shimmer sweep */}
			<Sequence from={90} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();
					// bg wipe from left
					const bgWipe = interpolate(frame, [0, 18], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					// text slides in from left
					const slideX = interpolate(frame, [5, 25], [-120, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const opacity = interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' });
					// "connected." springs in separately
					const connSpring = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 10, mass: 0.6 } });
					const connScale = interpolate(connSpring, [0, 1], [0, 1]);
					// shimmer line sweeping across
					const shimmerX = interpolate(frame, [30, 70], [-200, 2200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					return (
						<AbsoluteFill style={{ overflow: 'hidden' }}>
							{/* bg wipe */}
							<div style={{ position: 'absolute', inset: 0, backgroundColor: MAS_GREEN, clipPath: `inset(0 ${100 - bgWipe}% 0 0)` }} />
							<AbsoluteFill style={{ ...textStyle, flexDirection: 'row', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
								<div style={{ fontSize: '115px', color: 'white', opacity, transform: `translateX(${slideX}px)` }}>
									Now stay
								</div>
								<div style={{ fontSize: '115px', color: MAS_BLUE, transform: `scale(${connScale})`, transformOrigin: 'center' }}>
									connected.
								</div>
							</AbsoluteFill>
							{/* shimmer sweep */}
							<div style={{
								position: 'absolute', top: 0, bottom: 0, width: '80px',
								background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
								transform: `translateX(${shimmerX}px)`,
								pointerEvents: 'none',
							}} />
						</AbsoluteFill>
					);
				})()}
			</Sequence>

			{/* Scene 3: 6-9s — Each word slams in from a different direction */}
			<Sequence from={180} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();

					const makeSlam = (delay: number, fromX: number, fromY: number) => {
						const f = Math.max(0, frame - delay);
						const s = spring({ frame: f, fps, config: { damping: 9, mass: 0.8 } });
						const x = interpolate(s, [0, 1], [fromX, 0]);
						const y = interpolate(s, [0, 1], [fromY, 0]);
						const sc = interpolate(s, [0, 1], [1.4, 1]);
						const opacity = interpolate(f, [0, 6], [0, 1], { extrapolateRight: 'clamp' });
						// flash on entry
						const flash = interpolate(f, [0, 8], [2, 1], { extrapolateRight: 'clamp' });
						return { transform: `translate(${x}px, ${y}px) scale(${sc})`, opacity, filter: `brightness(${flash})` };
					};

					// subtle bg pulse
					const bgPulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0, 0.08]);

					return (
						<AbsoluteFill style={{ backgroundColor: DARK_BG, overflow: 'hidden' }}>
							{/* pulsing vignette */}
							<div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, transparent 40%, rgba(91,186,71,${bgPulse}) 100%)`, pointerEvents: 'none' }} />
							<AbsoluteFill style={{ ...textStyle, gap: '10px' }}>
								<div style={{ fontSize: '110px', ...makeSlam(0, -300, 0) }}>Events.</div>
								<div style={{ fontSize: '110px', ...makeSlam(18, 300, 0) }}>Programs.</div>
								<div style={{ fontSize: '110px', color: MAS_GREEN, ...makeSlam(36, 0, 200) }}>Your Community.</div>
							</AbsoluteFill>
						</AbsoluteFill>
					);
				})()}
			</Sequence>

			{/* Scene 4: 9-12s — "All in one place." scales up + subtitle slides up */}
			<Sequence from={270} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();
					const titleSpring = spring({ frame, fps, config: { damping: 14, mass: 0.7 } });
					const titleScale = interpolate(titleSpring, [0, 1], [0.5, 1]);
					const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
					const subY = interpolate(frame, [25, 50], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const subOpacity = interpolate(frame, [25, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					// bg gradient drift
					const gradX = interpolate(frame, [0, 90], [0, 15]);
					return (
						<AbsoluteFill style={{
							background: `radial-gradient(ellipse at ${50 + gradX}% 50%, #1a6bc7, ${MAS_BLUE} 70%)`,
							...textStyle, gap: '30px'
						}}>
							<div style={{ fontSize: '120px', opacity: titleOpacity, transform: `scale(${titleScale})`, textShadow: '0px 6px 30px rgba(0,0,0,0.5)' }}>
								All in one place.
							</div>
							<div style={{ fontSize: '58px', opacity: subOpacity, fontWeight: 'normal', color: 'rgba(255,255,255,0.9)', transform: `translateY(${subY}px)` }}>
								The MAS Houston WhatsApp Community.
							</div>
						</AbsoluteFill>
					);
				})()}
			</Sequence>

			{/* Scene 5: 12-15s — Split: left CTA, right green QR panel. Arrow bounces. */}
			<Sequence from={360} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();

					// left text stagger
					const line1Spring = spring({ frame, fps, config: { damping: 12, mass: 0.6 } });
					const line1Y = interpolate(line1Spring, [0, 1], [60, 0]);
					const line1Opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

					const line2Spring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, mass: 0.6 } });
					const line2Y = interpolate(line2Spring, [0, 1], [60, 0]);
					const line2Opacity = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

					// arrow bounces horizontally after appearing
					const arrowOpacity = interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const arrowBounce = Math.max(0, frame - 45);
					const arrowX = Math.sin(arrowBounce * 0.25) * 14;

					// right panel slides in
					const panelSpring = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 14, mass: 0.9 } });
					const panelX = interpolate(panelSpring, [0, 1], [660, 0]);

					// QR subtle pulse scale
					const qrPulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.97, 1.03]);

					return (
						<AbsoluteFill style={{ backgroundColor: MAS_BLUE, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
							{/* Left side */}
							<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '35px', padding: '60px' }}>
								<div style={{
									fontSize: '78px', fontWeight: 'bold', color: 'white', fontFamily: 'sans-serif',
									textAlign: 'center', textShadow: '0px 4px 20px rgba(0,0,0,0.4)',
									opacity: line1Opacity, transform: `translateY(${line1Y}px)`,
								}}>
									Pull out your phone.
								</div>
								<div style={{
									fontSize: '72px', fontWeight: 'bold', color: MAS_GREEN, fontFamily: 'sans-serif',
									textAlign: 'center', opacity: line2Opacity, transform: `translateY(${line2Y}px)`,
								}}>
									Scan. Join. Stay.
								</div>
								<div style={{ fontSize: '110px', opacity: arrowOpacity, lineHeight: 1, transform: `translateX(${arrowX}px)` }}>
									→
								</div>
							</div>
							{/* Right side — green panel with QR */}
							<div style={{
								width: '660px', backgroundColor: MAS_GREEN,
								display: 'flex', alignItems: 'center', justifyContent: 'center',
								transform: `translateX(${panelX}px)`,
								boxShadow: '-10px 0 40px rgba(0,0,0,0.3)',
							}}>
								<div style={{
									background: 'white', padding: '24px', borderRadius: '20px',
									boxShadow: '0px 10px 40px rgba(0,0,0,0.3)',
									transform: `scale(${qrPulse})`,
								}}>
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
