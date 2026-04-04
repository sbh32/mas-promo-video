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
			{/* Scene 1: 0-2s — "You're here." slams in and shakes */}
			<Sequence from={0} durationInFrames={60}>
				{(() => {
					const frame = useCurrentFrame();
					const slamSpring = spring({ frame, fps, config: { damping: 6, mass: 1.4 } });
					const scale = interpolate(slamSpring, [0, 1], [3, 1]);
					const opacity = interpolate(frame, [0, 4], [0, 1], { extrapolateRight: 'clamp' });
					const shakeAmount = interpolate(frame, [18, 30], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const shakeX = Math.sin(frame * 3.5) * 8 * shakeAmount;
					const bgScale = interpolate(frame, [0, 60], [1, 1.04]);
					return (
						<AbsoluteFill style={{ backgroundColor: MAS_BLUE, overflow: 'hidden', transform: `scale(${bgScale})` }}>
							<AbsoluteFill style={{ ...textStyle }}>
								<div style={{
									fontSize: '160px',
									opacity,
									transform: `scale(${scale}) translateX(${shakeX}px)`,
									textShadow: '0px 4px 20px rgba(0,0,0,0.5)',
								}}>
									You're here.
								</div>
							</AbsoluteFill>
						</AbsoluteFill>
					);
				})()}
			</Sequence>

			{/* Scene 2: 2-5s — word-by-word entrance + shimmer sweep */}
			<Sequence from={60} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();

					const bgWipe = interpolate(frame, [0, 18], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

					const makeWordSpring = (delay: number, fromY = 80) => {
						const f = Math.max(0, frame - delay);
						const s = spring({ frame: f, fps, config: { damping: 10, mass: 0.5 } });
						return {
							opacity: interpolate(f, [0, 8], [0, 1], { extrapolateRight: 'clamp' }),
							transform: `translateY(${interpolate(s, [0, 1], [fromY, 0])}px)`,
							display: 'inline-block',
						};
					};

					const shimmerX = interpolate(frame, [25, 70], [-200, 2200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

					return (
						<AbsoluteFill style={{ overflow: 'hidden' }}>
							<div style={{ position: 'absolute', inset: 0, backgroundColor: MAS_GREEN, clipPath: `inset(0 ${100 - bgWipe}% 0 0)` }} />
							<AbsoluteFill style={{ ...textStyle, flexDirection: 'column', gap: '10px' }}>
								<div style={{ fontSize: '115px', color: 'white', display: 'flex', gap: '30px' }}>
									<span style={makeWordSpring(5)}>Now</span>
									<span style={makeWordSpring(18)}>stay</span>
								</div>
								<div style={{ fontSize: '115px', color: MAS_BLUE, ...makeWordSpring(32, -80) }}>
									connected.
								</div>
							</AbsoluteFill>
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

			{/* Scene 3: 5-8s — words slam from different directions, bounce on settle */}
			<Sequence from={150} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();

					const makeSlam = (delay: number, fromX: number, fromY: number) => {
						const f = Math.max(0, frame - delay);
						const s = spring({ frame: f, fps, config: { damping: 9, mass: 0.8 } });
						const x = interpolate(s, [0, 1], [fromX, 0]);
						const y = interpolate(s, [0, 1], [fromY, 0]);
						const sc = interpolate(s, [0, 1], [1.5, 1]);
						const opacity = interpolate(f, [0, 6], [0, 1], { extrapolateRight: 'clamp' });
						const flash = interpolate(f, [0, 8], [2.2, 1], { extrapolateRight: 'clamp' });
						// letter spacing compresses in after slam
						const lsF = Math.max(0, f - 10);
						const ls = spring({ frame: lsF, fps, config: { damping: 14, mass: 0.4 } });
						const letterSpacing = interpolate(ls, [0, 1], [30, 0]);
						return { transform: `translate(${x}px, ${y}px) scale(${sc})`, opacity, filter: `brightness(${flash})`, letterSpacing };
					};

					const bgPulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0, 0.08]);

					return (
						<AbsoluteFill style={{ backgroundColor: DARK_BG, overflow: 'hidden' }}>
							<div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, transparent 40%, rgba(91,186,71,${bgPulse}) 100%)`, pointerEvents: 'none' }} />
							<AbsoluteFill style={{ ...textStyle, gap: '10px' }}>
								<div style={{ fontSize: '110px', ...makeSlam(0, -350, 0) }}>Events.</div>
								<div style={{ fontSize: '110px', ...makeSlam(18, 350, 0) }}>Programs.</div>
								<div style={{ fontSize: '110px', color: MAS_GREEN, ...makeSlam(36, 0, 220) }}>Your Community.</div>
							</AbsoluteFill>
						</AbsoluteFill>
					);
				})()}
			</Sequence>

			{/* Scene 4: 8-11s — title letter-spacing collapses in, subtitle typewriter */}
			<Sequence from={240} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();

					// title: scale up + letter spacing collapses
					const titleSpring = spring({ frame, fps, config: { damping: 14, mass: 0.7 } });
					const titleScale = interpolate(titleSpring, [0, 1], [0.6, 1]);
					const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
					const lsSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
					const titleLetterSpacing = interpolate(lsSpring, [0, 1], [60, 0]);

					// subtitle: typewriter character reveal
					const subStartFrame = 28;
					const subText = 'The MAS Houston WhatsApp Community.';
					const charsVisible = Math.floor(interpolate(frame, [subStartFrame, subStartFrame + 45], [0, subText.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
					const subOpacity = interpolate(frame, [subStartFrame, subStartFrame + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

					const gradX = interpolate(frame, [0, 90], [0, 15]);

					return (
						<AbsoluteFill style={{
							background: `radial-gradient(ellipse at ${50 + gradX}% 50%, #1a6bc7, ${MAS_BLUE} 70%)`,
							...textStyle, gap: '30px'
						}}>
							<div style={{
								fontSize: '120px',
								opacity: titleOpacity,
								transform: `scale(${titleScale})`,
								letterSpacing: `${titleLetterSpacing}px`,
								textShadow: '0px 6px 30px rgba(0,0,0,0.5)',
							}}>
								All in one place.
							</div>
							<div style={{ fontSize: '58px', opacity: subOpacity, fontWeight: 'normal', color: 'rgba(255,255,255,0.9)' }}>
								{subText.slice(0, charsVisible)}
								<span style={{ opacity: Math.sin(frame * 0.5) > 0 ? 1 : 0 }}>|</span>
							</div>
						</AbsoluteFill>
					);
				})()}
			</Sequence>

			{/* Scene 5: 11-14s — each word springs up; "Scan. Join. Stay." word by word; arrow bounces */}
			<Sequence from={330} durationInFrames={90}>
				{(() => {
					const frame = useCurrentFrame();

					// "Pull out your phone." — words stagger up
					const pullWords = ['Pull', 'out', 'your', 'phone.'];
					const makeWordUp = (delay: number) => {
						const f = Math.max(0, frame - delay);
						const s = spring({ frame: f, fps, config: { damping: 12, mass: 0.5 } });
						return {
							display: 'inline-block',
							opacity: interpolate(f, [0, 8], [0, 1], { extrapolateRight: 'clamp' }),
							transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px)`,
						};
					};

					// "Scan. Join. Stay." — each word springs in separately
					const scanWords = ['Scan.', 'Join.', 'Stay.'];
					const makeScanWord = (delay: number) => {
						const f = Math.max(0, frame - delay);
						const s = spring({ frame: f, fps, config: { damping: 9, mass: 0.6 } });
						return {
							display: 'inline-block',
							opacity: interpolate(f, [0, 8], [0, 1], { extrapolateRight: 'clamp' }),
							transform: `scale(${interpolate(s, [0, 1], [1.8, 1])})`,
						};
					};

					// arrow bounces after appearing
					const arrowOpacity = interpolate(frame, [42, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
					const arrowX = Math.sin(Math.max(0, frame - 55) * 0.25) * 16;

					// right panel
					const panelSpring = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 14, mass: 0.9 } });
					const panelX = interpolate(panelSpring, [0, 1], [660, 0]);
					const qrPulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.97, 1.03]);

					return (
						<AbsoluteFill style={{ backgroundColor: MAS_BLUE, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
							{/* Left side */}
							<div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '35px', padding: '60px' }}>
								<div style={{ fontSize: '78px', fontWeight: 'bold', color: 'white', fontFamily: 'sans-serif', textAlign: 'center', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
									{pullWords.map((w, i) => (
										<span key={w} style={makeWordUp(i * 8)}>{w}</span>
									))}
								</div>
								<div style={{ fontSize: '72px', fontWeight: 'bold', color: MAS_GREEN, fontFamily: 'sans-serif', display: 'flex', gap: '24px' }}>
									{scanWords.map((w, i) => (
										<span key={w} style={makeScanWord(28 + i * 12)}>{w}</span>
									))}
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
								<div style={{ background: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0px 10px 40px rgba(0,0,0,0.3)', transform: `scale(${qrPulse})` }}>
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
