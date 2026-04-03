import { Composition } from "remotion";
import { MasPromo } from "./MasPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MasPromo"
        component={MasPromo}
        durationInFrames={1753}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
