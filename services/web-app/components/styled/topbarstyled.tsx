import styled from "styled-components"

export const TopBarWrapper = styled.div`
width: 90vw;
height: 50px;
display: grid;
grid-template-columns: 20% 60% 20%;
`
export const ConnectWalletWrapper = styled.div`
grid-column-start: 3;
display: flex;
justify-content: end;
align-items: center;
`
export const LoganNameWrapper = styled.div`
display: flex;
padding-left: 10%;
align-items: center;
`
export const LoganTitle = styled.h1`
font: 50px;
font-family: roboto;
`