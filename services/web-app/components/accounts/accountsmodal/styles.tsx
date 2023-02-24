import styled from "styled-components";

export const AccountWrapper = styled.div`
  background-color: #d8d8d8;
  display: flex;
  flex-direction: row;
  padding: 5px;
  height: 25px;
  align-items: center;
  border-bottom: 1px solid black;
  justify-content: space-between;
`;
export const UsernameText = styled.p`
  padding: 0px;
  margin: 0px;
`;
export const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 35%;
`;
export const AccountsListWrapper = styled.div`
  background-color: #ebebeb;
  overflow-y: scroll;
  border: 1px solid black;
  margin: 0px 10px 10px 10px;
  height: 430px;
  width: 95%;
`;
export const InnerAccountsModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
