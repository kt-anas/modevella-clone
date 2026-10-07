import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Video,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const COLORS = {
  ink: "#101010",
  paper: "#eeece6",
  softPaper: "#e4e0d7",
  white: "#f7f6f1",
  muted: "rgba(247, 246, 241, 0.64)",
  darkMuted: "rgba(16, 16, 16, 0.58)",
  line: "rgba(247, 246, 241, 0.28)",
  darkLine: "rgba(16, 16, 16, 0.18)",
};

const FONT_CSS = `
  @font-face {
    font-family: "Satoshi";
    src: url("${staticFile("fonts/Satoshi-Regular.woff2")}") format("woff2");
    font-style: normal;
    font-weight: 400;
    font-display: block;
  }
  @font-face {
    font-family: "Satoshi";
    src: url("${staticFile("fonts/Satoshi-Medium.woff2")}") format("woff2");
    font-style: normal;
    font-weight: 500;
    font-display: block;
  }
  @font-face {
    font-family: "Satoshi";
    src: url("${staticFile("fonts/Satoshi-Bold.woff2")}") format("woff2");
    font-style: normal;
    font-weight: 700;
    font-display: block;
  }
  @font-face {
    font-family: "DM Mono";
    src: url("${staticFile("fonts/dmmono-latin.woff2")}") format("woff2");
    font-style: normal;
    font-weight: 400;
    font-display: block;
  }
`;

const getAssets = () => ({
  logo: staticFile("logo-hero.svg"),
  heroVideo: staticFile("videos/hero-video-6.mp4"),
  leaf: staticFile("icons/Leafs1.svg"),
  arrow: staticFile("icons/north-east-arrow.svg"),
  classic: staticFile("images/products/classic-canvas-rebels-1.jpg"),
  jungle: staticFile("images/products/jungle-queen-1.jpg"),
  nike: staticFile("images/products/nike-urban-echo-force-1.jpg"),
  dresses: staticFile("images/collections/dresses.jpg"),
  sneakers: staticFile("images/collections/sneakers.jpg"),
  jackets: staticFile("images/collections/jackets-sweaters.jpg"),
  sustainable: staticFile("images/sustainable/1.jpg"),
});

const clamp = (value) => Math.max(0, Math.min(1, value));

const sceneOpacity = (frame, start, end, fade = 18) => {
  const fadeIn = interpolate(frame, [start, start + fade], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const fadeOut = interpolate(frame, [end - fade, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return Math.min(fadeIn, fadeOut);
};

const sceneSpring = (frame, start, fps, config = {}) => {
  return spring({
    frame: Math.max(0, frame - start),
    fps,
    config: {
      damping: 18,
      mass: 0.7,
      stiffness: 100,
      ...config,
    },
  });
};

const Kicker = ({ children, color = COLORS.muted }) => (
  <div
    style={{
      color,
      fontFamily: '"DM Mono", monospace',
      fontSize: 15,
      letterSpacing: "0.12em",
      lineHeight: 1.3,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const Arrow = ({ assets, color = COLORS.white, size = 18 }) => (
  <Img
    src={assets.arrow}
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      filter: color === COLORS.white ? "none" : "invert(1)",
    }}
  />
);

const IntroScene = ({ assets, frame, fps, padding, story }) => {
  const start = 0;
  const end = 78;
  const opacity = sceneOpacity(frame, start, end);
  const enter = sceneSpring(frame, start + 3, fps, { stiffness: 72 });
  const logoScale = interpolate(enter, [0, 1], [1.12, 1]);
  const lineWidth = interpolate(frame, [12, 54], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        color: COLORS.white,
        opacity,
        padding,
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Kicker>Modevelle / editorial film</Kicker>
        <Kicker>01 / 04</Kicker>
      </div>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          flex: 1,
          justifyContent: "center",
          transform: `translateY(${(1 - enter) * 18}px)`,
        }}
      >
        <Img
          src={assets.logo}
          style={{
            transform: `scale(${logoScale})`,
            width: "100%",
          }}
        />
      </div>

      <div>
        <div
          style={{
            backgroundColor: COLORS.line,
            height: 1,
            marginBottom: 22,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.white,
              height: "100%",
              transform: `scaleX(${lineWidth / 100})`,
              transformOrigin: "left center",
              width: "100%",
            }}
          />
        </div>
        <div
          style={{
            alignItems: "flex-end",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: story ? 30 : 27,
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              maxWidth: story ? 500 : 560,
            }}
          >
            Where timeless style meets modern grace.
          </div>
          <Kicker>SS / 25</Kicker>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const HeroScene = ({ assets, frame, fps, padding, story }) => {
  const start = 54;
  const end = 174;
  const opacity = sceneOpacity(frame, start, end);
  const enter = sceneSpring(frame, start, fps, { damping: 22 });
  const imageScale = interpolate(frame, [start, end], [1.15, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const titleY = interpolate(enter, [0, 1], [48, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink, opacity }}>
      <Video
        src={assets.heroVideo}
        muted
        loop
        style={{
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          opacity: 0.82,
          transform: `scale(${imageScale})`,
          width: "100%",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0.08) 42%, rgba(5,5,5,0.86) 100%)",
        }}
      />
      <div
        style={{
          color: COLORS.white,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding,
          position: "absolute",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Kicker>01 / the new everyday</Kicker>
          <Kicker>motion / 00:04</Kicker>
        </div>
        <div
          style={{
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div
            style={{
              color: COLORS.white,
              fontFamily: "Satoshi, sans-serif",
              fontSize: story ? 92 : 82,
              fontWeight: 500,
              letterSpacing: "-0.065em",
              lineHeight: 0.92,
              maxWidth: story ? 820 : 760,
            }}
          >
            Timeless style
            <br />
            meets <span style={{ fontStyle: "italic", fontWeight: 400 }}>motion.</span>
          </div>
          <div
            style={{
              color: COLORS.muted,
              fontFamily: "Satoshi, sans-serif",
              fontSize: story ? 25 : 22,
              lineHeight: 1.35,
              marginTop: 30,
              maxWidth: story ? 520 : 500,
            }}
          >
            Pieces designed for every version of your day.
          </div>
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 16,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.white,
              height: 1,
              width: story ? 80 : 70,
            }}
          />
          <Kicker>Scroll into the season</Kicker>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ProductCard = ({ assets, frame, fps, item, index, start, story }) => {
  const enter = sceneSpring(frame, start + index * 5, fps, {
    damping: 16,
    stiffness: 120,
  });
  const imageScale = interpolate(frame, [start + 20, start + 130], [1.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const cardHeight = story ? 900 : 660;

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        opacity: clamp(enter),
        transform: `translateY(${(1 - enter) * 90}px)`,
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.softPaper,
          height: cardHeight,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Img
          src={item.image}
          style={{
            height: "100%",
            objectFit: "cover",
            objectPosition: item.position,
            transform: `scale(${imageScale})`,
            width: "100%",
          }}
        />
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.02) 55%, rgba(0,0,0,0.55) 100%)",
            inset: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            bottom: 18,
            color: COLORS.white,
            display: "flex",
            justifyContent: "space-between",
            left: 18,
            position: "absolute",
            right: 18,
          }}
        >
          <span
            style={{
              border: "1px solid rgba(255,255,255,0.7)",
              borderRadius: 100,
              fontFamily: '"DM Mono", monospace',
              fontSize: 12,
              padding: "7px 10px",
            }}
          >
            {item.size}
          </span>
          <span
            style={{
              alignSelf: "center",
              fontFamily: '"DM Mono", monospace',
              fontSize: 12,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div
        style={{
          color: COLORS.ink,
          display: "flex",
          fontFamily: "Satoshi, sans-serif",
          fontSize: story ? 20 : 18,
          justifyContent: "space-between",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          paddingTop: 17,
        }}
      >
        <span>{item.name}</span>
        <span
          style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: 12,
            marginLeft: 10,
            whiteSpace: "nowrap",
          }}
        >
          {item.price}
        </span>
      </div>
    </div>
  );
};

const ProductScene = ({ assets, frame, fps, padding, story }) => {
  const start = 154;
  const end = 294;
  const opacity = sceneOpacity(frame, start, end);
  const items = [
    {
      image: assets.classic,
      name: "Classic Canvas Rebels",
      position: "center center",
      price: "INR 5400",
      size: "S / M",
    },
    {
      image: assets.jungle,
      name: "Jungle Queen",
      position: "center center",
      price: "INR 2400",
      size: "S / L",
    },
    {
      image: assets.nike,
      name: "Urban Echo Force",
      position: "center center",
      price: "INR 7400",
      size: "S / M / L",
    },
  ];
  const headingEnter = sceneSpring(frame, start, fps, { stiffness: 90 });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.paper,
        color: COLORS.ink,
        opacity,
        padding,
      }}
    >
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          justifyContent: "space-between",
          transform: `translateY(${(1 - headingEnter) * 30}px)`,
        }}
      >
        <div>
          <Kicker color={COLORS.darkMuted}>/02 / bestsellers</Kicker>
          <div
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: story ? 64 : 58,
              fontWeight: 500,
              letterSpacing: "-0.06em",
              lineHeight: 0.95,
              marginTop: 22,
              maxWidth: story ? 680 : 560,
            }}
          >
            The pieces
            <br />
            people keep.
          </div>
        </div>
        <div
          style={{
            color: COLORS.darkMuted,
            fontFamily: "Satoshi, sans-serif",
            fontSize: story ? 22 : 19,
            lineHeight: 1.35,
            maxWidth: 230,
            paddingTop: 38,
            textAlign: "right",
          }}
        >
          Loved for the perfect fit and timeless comfort.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          gap: story ? 20 : 16,
          marginTop: story ? 76 : 58,
        }}
      >
        {items.map((item, index) => (
          <ProductCard
            key={item.name}
            assets={assets}
            frame={frame}
            fps={fps}
            index={index}
            item={item}
            start={start}
            story={story}
          />
        ))}
      </div>

      <div
        style={{
          alignItems: "center",
          borderTop: `1px solid ${COLORS.darkLine}`,
          color: COLORS.darkMuted,
          display: "flex",
          fontFamily: '"DM Mono", monospace',
          fontSize: 12,
          justifyContent: "space-between",
          letterSpacing: "0.08em",
          marginTop: 28,
          paddingTop: 15,
          textTransform: "uppercase",
        }}
      >
        <span>Perfect fit / timeless comfort</span>
        <span>MODE200 / first purchase</span>
      </div>
    </AbsoluteFill>
  );
};

const CollectionScene = ({ assets, frame, fps, padding, story }) => {
  const start = 274;
  const end = 394;
  const opacity = sceneOpacity(frame, start, end);
  const enter = sceneSpring(frame, start, fps, { damping: 20, stiffness: 88 });
  const imageX = interpolate(enter, [0, 1], [70, 0]);
  const secondImageX = interpolate(enter, [0, 1], [110, 0]);
  const imageY = interpolate(enter, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.ink,
        color: COLORS.white,
        opacity,
        padding,
      }}
    >
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Kicker>/03 / collections</Kicker>
          <div
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontSize: story ? 66 : 60,
              fontWeight: 400,
              letterSpacing: "-0.065em",
              lineHeight: 0.94,
              marginTop: 24,
              maxWidth: story ? 670 : 580,
            }}
          >
            Find your
            <br />
            <span style={{ fontStyle: "italic" }}>everyday</span> ritual.
          </div>
        </div>
        <div style={{ paddingTop: 10 }}>
          <Img
            src={assets.leaf}
            style={{
              height: 30,
              opacity: 0.82,
              width: 30,
            }}
          />
        </div>
      </div>

      <div
        style={{
          flex: 1,
          marginTop: story ? 78 : 62,
          minHeight: 0,
          position: "relative",
        }}
      >
        <div
          style={{
            height: story ? "75%" : "74%",
            left: 0,
            overflow: "hidden",
            position: "absolute",
            top: imageY,
            transform: `translateX(${imageX}px) rotate(-3deg)`,
            width: story ? "53%" : "52%",
          }}
        >
          <Img
            src={assets.dresses}
            style={{
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              width: "100%",
            }}
          />
          <div
            style={{
              background: "linear-gradient(180deg, transparent 54%, rgba(0,0,0,0.7))",
              inset: 0,
              position: "absolute",
            }}
          />
          <div
            style={{
              bottom: 24,
              fontFamily: "Satoshi, sans-serif",
              fontSize: story ? 30 : 27,
              left: 24,
              position: "absolute",
            }}
          >
            Dresses
          </div>
        </div>
        <div
          style={{
            bottom: story ? "1%" : "0%",
            height: story ? "66%" : "64%",
            overflow: "hidden",
            position: "absolute",
            right: 0,
            transform: `translateX(${secondImageX}px) rotate(3deg)`,
            width: story ? "53%" : "52%",
          }}
        >
          <Img
            src={assets.sneakers}
            style={{
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              width: "100%",
            }}
          />
          <div
            style={{
              background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.72))",
              inset: 0,
              position: "absolute",
            }}
          />
          <div
            style={{
              bottom: 24,
              fontFamily: "Satoshi, sans-serif",
              fontSize: story ? 30 : 27,
              left: 24,
              position: "absolute",
            }}
          >
            Sneakers
          </div>
        </div>
        <div
          style={{
            backgroundColor: COLORS.white,
            bottom: story ? "38%" : "34%",
            color: COLORS.ink,
            fontFamily: '"DM Mono", monospace',
            fontSize: 12,
            letterSpacing: "0.06em",
            padding: "14px 16px",
            position: "absolute",
            right: story ? "34%" : "32%",
            transform: `rotate(-6deg) translateY(${(1 - enter) * 30}px)`,
          }}
        >
          JACKETS + SWEATERS
        </div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${COLORS.line}`,
          display: "flex",
          fontFamily: '"DM Mono", monospace',
          fontSize: 12,
          justifyContent: "space-between",
          letterSpacing: "0.08em",
          paddingTop: 15,
          textTransform: "uppercase",
        }}
      >
        <span>Made to move with you</span>
        <span>04 / shop all</span>
      </div>
    </AbsoluteFill>
  );
};

const CtaScene = ({ assets, frame, fps, padding, story }) => {
  const start = 370;
  const end = 450;
  const opacity = sceneOpacity(frame, start, end, 20);
  const enter = sceneSpring(frame, start, fps, { damping: 22, stiffness: 84 });
  const scale = interpolate(enter, [0, 1], [1.08, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink, color: COLORS.white, opacity }}>
      <Img
        src={assets.sustainable}
        style={{
          height: "100%",
          objectFit: "cover",
          opacity: 0.68,
          transform: `scale(${scale})`,
          width: "100%",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,8,0.74) 0%, rgba(8,8,8,0.18) 42%, rgba(8,8,8,0.9) 100%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding,
          position: "absolute",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Kicker>/04 / make it yours</Kicker>
          <Kicker>Modevelle</Kicker>
        </div>
        <div
          style={{
            transform: `translateY(${(1 - enter) * 36}px)`,
          }}
        >
          <Img
            src={assets.logo}
            style={{
              marginBottom: 44,
              width: "100%",
            }}
          />
          <div
            style={{
              alignItems: "flex-end",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontSize: story ? 42 : 38,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                Your next favorite
                <br />
                starts here.
              </div>
              <div
                style={{
                  color: COLORS.muted,
                  fontFamily: "Satoshi, sans-serif",
                  fontSize: 20,
                  lineHeight: 1.3,
                  marginTop: 18,
                }}
              >
                Exclusive 10% off your first purchase.
              </div>
            </div>
            <div
              style={{
                alignItems: "center",
                border: `1px solid ${COLORS.white}`,
                display: "flex",
                fontFamily: '"DM Mono", monospace',
                fontSize: 13,
                gap: 14,
                letterSpacing: "0.06em",
                padding: "14px 16px",
                textTransform: "uppercase",
              }}
            >
              Shop all
              <Arrow assets={assets} />
            </div>
          </div>
        </div>
        <div
          style={{
            alignItems: "flex-end",
            borderTop: `1px solid ${COLORS.line}`,
            display: "flex",
            fontFamily: '"DM Mono", monospace',
            fontSize: 12,
            justifyContent: "space-between",
            letterSpacing: "0.08em",
            paddingTop: 16,
            textTransform: "uppercase",
          }}
        >
          <span>Use code: MODE200</span>
          <span>Modevelle / online store</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FontLoader = () => {
  const [handle] = useState(() => delayRender("Loading Modevelle fonts"));

  useEffect(() => {
    Promise.all([
      document.fonts.load('400 16px "Satoshi"'),
      document.fonts.load('500 16px "Satoshi"'),
      document.fonts.load('700 16px "Satoshi"'),
      document.fonts.load('400 16px "DM Mono"'),
    ])
      .catch(() => undefined)
      .finally(() => continueRender(handle));
  }, [handle]);

  return <style>{FONT_CSS}</style>;
};

const AdChrome = ({ frame, durationInFrames, padding }) => {
  const progress = (frame / Math.max(1, durationInFrames - 1)) * 100;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.16)",
          inset: 20,
          position: "absolute",
        }}
      />
      <div
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.34) 0.6px, transparent 0.7px)",
          backgroundSize: "5px 5px",
          inset: 0,
          mixBlendMode: "soft-light",
          opacity: 0.08,
          position: "absolute",
        }}
      />
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.18), transparent 20%, transparent 80%, rgba(0,0,0,0.18))",
          inset: 0,
          position: "absolute",
        }}
      />
      <div
        style={{
          bottom: padding - 4,
          height: 1,
          left: padding,
          overflow: "hidden",
          position: "absolute",
          right: padding,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.75)",
            height: "100%",
            transform: `scaleX(${progress / 100})`,
            transformOrigin: "left center",
            width: "100%",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const ModevelleAd = ({ variant = "feed" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const story = variant === "story";
  const padding = story ? 72 : 64;
  const assets = getAssets();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink, fontFamily: "Satoshi, sans-serif" }}>
      <FontLoader />
      <IntroScene
        assets={assets}
        frame={frame}
        fps={fps}
        padding={padding}
        story={story}
      />
      <HeroScene
        assets={assets}
        frame={frame}
        fps={fps}
        padding={padding}
        story={story}
      />
      <ProductScene
        assets={assets}
        frame={frame}
        fps={fps}
        padding={padding}
        story={story}
      />
      <CollectionScene
        assets={assets}
        frame={frame}
        fps={fps}
        padding={padding}
        story={story}
      />
      <CtaScene
        assets={assets}
        frame={frame}
        fps={fps}
        padding={padding}
        story={story}
      />
      <AdChrome frame={frame} durationInFrames={durationInFrames} padding={padding} />
    </AbsoluteFill>
  );
};
