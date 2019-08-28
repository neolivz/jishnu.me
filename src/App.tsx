import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import ContentEditable from "react-contenteditable";
import { Flipped, Flipper } from "react-flip-toolkit";

import { primary, fontColorOnPrimary } from "./styleGuide/colors";
import dp from "./me.jpg";

const AppContainer = styled.div`
  background-color: ${primary};
  color: ${fontColorOnPrimary};
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface AnimationDiv {
  animating: boolean;
}

const ProfileContentWrapper = styled.div<AnimationDiv>`
  width: ${({ animating }) => (animating ? "100vw" : "21vh")};
  height: ${({ animating }) => (animating ? "100vh" : "21vh")};
  background-color: white;
  border-radius: ${({ animating }) => (animating ? "0" : "50%")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileContent = styled.div<AnimationDiv>`
  width: 20vh;
  height: 20vh;
  background-color: black;
  border-radius: 20vh;
  background-image: url(${dp});
  background-size: cover;
`;

const WelcomeMessage = styled.div<AnimationDiv>`
  display: ${({ animating }) => (animating ? "none" : "flex")};
  font-size: 10vh;
  height: 10vh;
  line-height: 10vh;
  &:before {
    content: "Hello,";
    padding-right: 1vh;
  }
  &:after {
    content: "!";
    padding-left: 1vh;
  }
`;

const VisitiorName = styled(ContentEditable)`
  height: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${fontColorOnPrimary};
  color: ${fontColorOnPrimary};
  font-size: 10vh;
  min-width: 100px;
  &:focus {
    outline: none;
  }
`;

const staggerConfig = {
  // the "default" config will apply to staggered elements without explicit keys
  default: {
    // default direction is forwards
    reverse: true,
    // default is .1, 0 < n < 1
    speed: 1
  },
  // this will apply to Flipped elements with the prop stagger='namedStagger'
  namedStagger: { speed: 0.2 }
};

const App: React.FC = () => {
  const [visitorName, setVisitorName] = useState(
    sessionStorage.getItem("visitorName") || ""
  );
  const [fullScreen, setFullScreen] = useState(false);

  const onVisitorNameChange = useCallback(e => {
    setVisitorName(e.target.value);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("visitorName", visitorName);
  }, [visitorName]);

  const goNext = useCallback(() => {
    setFullScreen(f => !f);
  }, []);

  return (
    <Flipper
      flipKey={fullScreen}
      staggerConfig={staggerConfig}
      applyTransformOrigin={false}
    >
      <AppContainer>
        <Flipped flipId="profile" transformOrigin="0 0">
          <ProfileContentWrapper animating={fullScreen} onClick={goNext}>
            <Flipped inverseFlipId="profile" scale opacity>
              <ProfileContent animating={fullScreen} />
            </Flipped>
          </ProfileContentWrapper>
        </Flipped>
        <WelcomeMessage animating={fullScreen}>
          <VisitiorName html={visitorName} onChange={onVisitorNameChange} />
        </WelcomeMessage>
      </AppContainer>
    </Flipper>
  );
};

export default App;
