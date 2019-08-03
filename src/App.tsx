import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import ContentEditable from "react-contenteditable";

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
const ProfileContentWrapper = styled.div`
  width: 21vh;
  height: 21vh;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileContent = styled.div`
  width: 20vh;
  height: 20vh;
  background-color: black;
  border-radius: 50%;
  background-image: url(${dp});
  background-size: cover;
`;

const WelcomeMessage = styled.div`
  font-size: 10vh;
  height: 10vh;
  line-height: 10vh;
  display: flex;
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

const App: React.FC = () => {
  const [visitorName, setVisitorName] = useState(
    sessionStorage.getItem("visitorName") || ""
  );
  const onVisitorNameChange = useCallback(e => {
    setVisitorName(e.target.value);
  }, []);
  useEffect(() => {
    sessionStorage.setItem("visitorName", visitorName);
  }, [visitorName]);
  return (
    <AppContainer>
      <ProfileContentWrapper>
        <ProfileContent />
      </ProfileContentWrapper>
      <WelcomeMessage>
        <VisitiorName html={visitorName} onChange={onVisitorNameChange} />
      </WelcomeMessage>
    </AppContainer>
  );
};

export default App;
