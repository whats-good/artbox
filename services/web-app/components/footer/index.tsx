import styled from "styled-components"
import Link from "next/link"

const FooterWrapper = styled.div`
  width: 100%
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
  height: 25px;
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <p>QR8 Created by <a target="_blank" rel="noopener noreferrer" href='https://twitter.com/logan_larkin'>@logan_larkin</a> | <a target="_blank" rel="noopener noreferrer" href='https://twitter.com/Theskbeats'>@skbeats</a></p>
    </FooterWrapper>
  )
}