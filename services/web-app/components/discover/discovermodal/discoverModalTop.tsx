import styled from "styled-components";
import { useState } from "react";
import { ButtonInner, ButtonOuter } from "../../button";

const DiscoverModalTopWrapper = styled.div`
  display: grid;
  grid-template-columns: 15% 15% 15% 15% 30%;
  padding: 10px;
  justify-content: space-between;
`;

const DiscoverModalFilterButton = styled(ButtonInner)`
  padding: 0px;
`;

export const DiscoverModalTop = () => {
  return (
    <DiscoverModalTopWrapper>
      <ButtonOuter>
        <DiscoverModalFilterButton>Artists</DiscoverModalFilterButton>
      </ButtonOuter>
      <ButtonOuter>
        <DiscoverModalFilterButton>Random</DiscoverModalFilterButton>
      </ButtonOuter>
      <ButtonOuter>
        <DiscoverModalFilterButton>Newest</DiscoverModalFilterButton>
      </ButtonOuter>
      <ButtonOuter>
        <DiscoverModalFilterButton>Genre</DiscoverModalFilterButton>
      </ButtonOuter>
      <SearchBar />
    </DiscoverModalTopWrapper>
  );
};

const SearchBar = () => {
  const [search, setSearch] = useState("search");

  return (
    <input
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    ></input>
  );
};
