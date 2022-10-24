import styled from 'styled-components';

export const ButtonOuter = styled.div`
background-color: #B5B5B5;
height: 24px;
border-right: 1px solid black;
border-bottom: 1px solid black;
cursor: pointer;
`;

export const ButtonInner = styled.button`
cursor: pointer;
width: 100%;
height 100%;
padding: 0px 10px 0px 10px;
background-color: transparent;
border-right: 1px solid #7B7B7B;
border-bottom: 1px solid #7B7B7B;
border-left: 1px solid #D9D9D9;
border-top: 1px solid #D9D9D9;
${ButtonOuter}:hover & {
  background-color: #565656;
}`;

