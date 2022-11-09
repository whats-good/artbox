import styled from "styled-components";

export const ContractTileWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100%;
  padding: 20px;
`;

export const ContractTileStyled = styled.div`
  border: 1px solid black;
  height: 25%;
  margin: 5px;
  grid-template-rows: 80px auto;
`;

export const ContractAddressTile = styled.p`
  text-align: center;
`;
