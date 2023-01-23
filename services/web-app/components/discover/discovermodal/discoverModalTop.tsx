import styled from "styled-components"
import { useState } from "react";
import { ButtonInner, ButtonOuter } from "../../button"

const DiscoverModalTopWrapper = styled.div`
  display: grid;
  grid-template-columns: 15% 15% 15% 15% 30%;
  padding: 10px;
  justify-content: space-between;
`;

export const DiscoverModalTop = () => {
  return (
    <DiscoverModalTopWrapper>
      <ButtonOuter>
        <ButtonInner>
          Artists
        </ButtonInner>
      </ButtonOuter>
      <ButtonOuter>
        <ButtonInner>
          Random
        </ButtonInner>
      </ButtonOuter>
      <ButtonOuter>
        <ButtonInner>
          Newest
        </ButtonInner>
      </ButtonOuter>
      <ButtonOuter>
        <ButtonInner>
          Genre
        </ButtonInner>
      </ButtonOuter>
      <SearchBar />
    </DiscoverModalTopWrapper>
  )
}

const SearchBar = () => {

  const [search, setSearch] = useState('search');

  return (
    <input value={search} onChange={(e) => {setSearch(e.target.value)}}></input>
  )
}