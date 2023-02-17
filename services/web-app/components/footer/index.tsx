import styled from "styled-components"

const FooterWrapper = styled.div`
  width: 100vw;
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 20px;
`;
const FooterText = styled.p`
  padding-left: 5vw;
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <FooterText>QR8 Created by <a target="_blank" rel="noopener noreferrer" href='https://twitter.com/logan_larkin'>@logan_larkin</a> | <a target="_blank" rel="noopener noreferrer" href='https://twitter.com/Theskbeats'>@skbeats</a></FooterText>
    </FooterWrapper>
  )
}