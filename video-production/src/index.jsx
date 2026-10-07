import React from "react";
import { Composition, registerRoot } from "remotion";
import { ModevelleAd } from "./ModevelleAd";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ModevelleAd"
        component={ModevelleAd}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{ variant: "feed" }}
      />
      <Composition
        id="ModevelleStoryAd"
        component={ModevelleAd}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ variant: "story" }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
