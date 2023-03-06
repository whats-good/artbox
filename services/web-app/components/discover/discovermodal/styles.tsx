import styled from "styled-components";
import { ButtonInner } from "../../button";

export const InnerDiscoverModalWrapper = styled.div`
  display: grid;
  grid-template-rows: 8% auto 8%;
`;
export const DiscoverModalTopWrapper = styled.div`
  display: grid;
  grid-template-columns: 15% 15% 15% 15% 30%;
  padding: 10px;
  justify-content: space-between;
`;
export const DiscoverModalFilterButton = styled(ButtonInner)`
  padding: 0px;
`;
export const PageButtonsWrapper = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr;
  margin-right: 20px;
  height: max-content;
  justify-content: flex-end;
  padding-top: 5px;
`;
export const UsersListWrapper = styled.div`
  border: 1px solid black;
  background-color: #ebebeb;
  margin-right: 20px;
  margin-left: 20px;
  overflow-y: scroll;
`;
export const UserListItemWrapper = styled.div`
  border-bottom: 1px solid grey;
  margin: 5px;
`;
