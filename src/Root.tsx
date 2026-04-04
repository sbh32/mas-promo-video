import { Composition } from "remotion";
import { MasPromo } from "./MasPromo";
import { WhatsappPromo } from "./WhatsappPromo";

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
      <Composition
        id="WhatsappPromo"
        component={WhatsappPromo}
        durationInFrames={420}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
