import React from 'react';
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig, Audio, staticFile } from 'remotion';
import QRCode from 'react-qr-code';

const FadeText: React.FC<{ text: React.ReactNode; delay?: number; color?: string }> = ({ text, delay = 0, color }) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	return <div style={{ opacity, color }}>{text}</div>;
};

export const MasPromo: React.FC = () => {
	const { fps } = useVideoConfig();
	const textStyle: React.CSSProperties = { color: 'white', fontSize: '80px', fontWeight: 'bold', fontFamily: 'sans-serif', textAlign: 'center', lineHeight: '1.4', textShadow: '0px 4px 20px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' };

	const MAS_BLUE = '#0c4f9e';
	const MAS_GREEN = '#5bba47';

	return (
		<AbsoluteFill style={{ backgroundColor: MAS_BLUE }}>
			{/* 1. One day… */}
			<Sequence from={0} durationInFrames={46}>
				{(() => {
					const frame = useCurrentFrame();
					const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
					const scale = interpolate(frame, [0, 46], [1, 1.05]);
					return <AbsoluteFill style={{ ...textStyle, opacity, transform: `scale(${scale})` }}>One day…</AbsoluteFill>;
				})()}
			</Sequence>

			{/* 2. we will all stand before Allah. */}
			<Sequence from={48} durationInFrames={64}>
				{(() => {
					const frame = useCurrentFrame();
					const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
					const scale = interpolate(frame, [0, 64], [1, 1.03]);
					return <AbsoluteFill style={{ ...textStyle, opacity, transform: `scale(${scale})`, boxShadow: 'inset 0 0 200px rgba(0,0,0,0.5)' }}>
						<div>we will all stand before <span style={{ color: MAS_GREEN }}>Allah</span>.</div>
					</AbsoluteFill>;
				})()}
			</Sequence>

			{/* 3. What did you do with your Islam? */}
			<Sequence from={135} durationInFrames={106}>
				{(() => {
					const frame = useCurrentFrame();
					const scale = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
					const springScale = interpolate(scale, [0, 1], [0.8, 1]);
					return <AbsoluteFill style={{ ...textStyle, transform: `scale(${springScale})` }}>
						<div>What did you do with your <span style={{ color: MAS_GREEN }}>Islam</span>?</div>
					</AbsoluteFill>;
				})()}
			</Sequence>

			{/* 4. Was it just prayer… then back to life? */}
			<Sequence from={243} durationInFrames={112}>
				{(() => {
					const frame = useCurrentFrame();
					const text = "Was it just prayer…\nthen back to life?";
					const charactersToShow = Math.floor(frame / 2);
					const visibleText = text.slice(0, Math.max(0, charactersToShow));
					return <AbsoluteFill style={{ ...textStyle, whiteSpace: 'pre-line' }}>{visibleText}</AbsoluteFill>;
				})()}
			</Sequence>

			{/* 5. Or did you carry this deen… beyond yourself? */}
			<Sequence from={357} durationInFrames={116}>
				<AbsoluteFill style={textStyle}>
					<FadeText text="Or did you carry this deen…" delay={0} />
					<FadeText text={<>beyond <span style={{ color: MAS_GREEN }}>yourself?</span></>} delay={45} />
				</AbsoluteFill>
			</Sequence>

			{/* 6. This Ummah is struggling. Our youth are searching. */}
			<Sequence from={475} durationInFrames={172}>
				<AbsoluteFill style={textStyle}>
					<Sequence from={0} durationInFrames={86}><AbsoluteFill style={textStyle}>This Ummah is struggling.</AbsoluteFill></Sequence>
					<Sequence from={86} durationInFrames={86}><AbsoluteFill style={textStyle}>Our youth are <span style={{ color: MAS_GREEN }}>searching.</span></AbsoluteFill></Sequence>
				</AbsoluteFill>
			</Sequence>

			{/* 7. Allah chose YOU for this moment. */}
			<Sequence from={649} durationInFrames={84}>
				{(() => {
					const frame = useCurrentFrame();
					const shakeX = Math.sin(frame * 1.5) * 2;
					const shakeY = Math.cos(frame * 1.2) * 2;
					return <AbsoluteFill style={{ ...textStyle, fontSize: '95px', transform: `translate(${shakeX}px, ${shakeY}px)` }}>
						<div>Allah chose <span style={{ color: MAS_GREEN }}>YOU</span> for this moment.</div>
					</AbsoluteFill>;
				})()}
			</Sequence>

			{/* 8. Not to watch. But to act. */}
			<Sequence from={734} durationInFrames={84}>
				<AbsoluteFill style={textStyle}>
					<Sequence from={0} durationInFrames={42}><AbsoluteFill style={textStyle}>Not to watch.</AbsoluteFill></Sequence>
					<Sequence from={42} durationInFrames={42}><AbsoluteFill style={textStyle}>But to <span style={{ color: MAS_GREEN }}>act.</span></AbsoluteFill></Sequence>
				</AbsoluteFill>
			</Sequence>

			{/* 9. Build. Guide. Lead. */}
			<Sequence from={821} durationInFrames={132}>
				<AbsoluteFill style={{...textStyle, flexDirection: 'row', gap: '30px'}}>
					<FadeText text="Build." delay={0} color={MAS_GREEN} />
					<FadeText text="Guide." delay={30} color={MAS_GREEN} />
					<FadeText text="Lead." delay={60} color={MAS_GREEN} />
				</AbsoluteFill>
			</Sequence>

			{/* 10. That’s what MAS is about. */}
			<Sequence from={955} durationInFrames={66}>
				{(() => {
					const frame = useCurrentFrame();
					const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
					return <AbsoluteFill style={{ ...textStyle, opacity }}>
						<div>That’s what <span style={{ color: MAS_GREEN }}>MAS</span> is about.</div>
					</AbsoluteFill>;
				})()}
			</Sequence>

			{/* 11. Raising people who live for something greater. */}
			<Sequence from={1023} durationInFrames={117}>
				{(() => {
					const frame = useCurrentFrame();
					const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
					return <AbsoluteFill style={{ ...textStyle, opacity }}>
						<div>Raising people who live</div>
						<div>for <span style={{ color: MAS_GREEN }}>something greater.</span></div>
					</AbsoluteFill>;
				})()}
			</Sequence>

			{/* 12. نحن مصنع الرجال / A factory of leadership */}
			<Sequence from={1142} durationInFrames={138}>
				<AbsoluteFill style={textStyle}>
					<div style={{ fontSize: '100px', marginBottom: '20px' }}><FadeText text="نحن مصنع الرجال" delay={0} /></div>
					<div style={{ fontSize: '60px', color: 'rgba(255,255,255,0.8)' }}><FadeText text={<>A factory of <span style={{ color: MAS_GREEN }}>leadership</span></>} delay={45} /></div>
				</AbsoluteFill>
			</Sequence>

			{/* 13. Don’t let your Islam stay on the sidelines. */}
			<Sequence from={1285} durationInFrames={85}>
				{(() => {
					const frame = useCurrentFrame();
					const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
					return <AbsoluteFill style={{ ...textStyle, opacity, fontSize: '65px', padding: '0 40px' }}>
						<div>Don’t let your <span style={{ color: MAS_GREEN }}>Islam</span> stay on the sidelines.</div>
					</AbsoluteFill>;
				})()}
			</Sequence>

			{/* 14. Step in. Get involved. Be part of something real. */}
			<Sequence from={1373} durationInFrames={140}>
				<AbsoluteFill style={{ ...textStyle }}>
					<FadeText text="Step in." delay={0} color={MAS_GREEN} />
					<FadeText text="Get involved." delay={15} color={MAS_GREEN} />
					<FadeText text="Be part of something real." delay={30} />
				</AbsoluteFill>
			</Sequence>

			{/* 15. QR Code */}
			<Sequence from={1513} durationInFrames={240}>
				{(() => {
					const frame = useCurrentFrame();
					const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
					return <AbsoluteFill style={{ ...textStyle, opacity }}>
						<div style={{ marginBottom: '40px', fontSize: '60px' }}>Get Involved</div>
						<div style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0px 10px 40px rgba(0,0,0,0.5)' }}>
							<QRCode value="https://secure.muslimamericansociety.org/forms/40?_gl=1*datk8h*_ga*ODc0NTY1OTQxLjE3NTg3NDc4MTY.*_ga_27DX87SLP8*czE3NzUxNDM0MzIkbzE2JGcxJHQxNzc1MTQzNDU1JGo1OSRsMCRoMA..*_ga_9G8QT0MH07*czE3NzUxNDM0MzMkbzEyJGcxJHQxNzc1MTQzNDY1JGozNyRsMCRoMA" size={300} bgColor="#FFFFFF" fgColor={MAS_BLUE} />
						</div>
					</AbsoluteFill>;
				})()}
			</Sequence>
			
			<Audio src={staticFile("Aref Hasan - The Merciful One (Islamic Background Nasheed).mp3")} volume={0.15} />
			<Audio src={staticFile("Voiceover.mp3")} volume={1} />
		</AbsoluteFill>
	);
};
