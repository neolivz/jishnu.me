import React from "react";
import styled from "styled-components";
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
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <ProfileContentWrapper>
        <ProfileContent />
      </ProfileContentWrapper>
      <WelcomeMessage>Hello Welcome!</WelcomeMessage>
    </AppContainer>
  );
};

export default App;
