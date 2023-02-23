import { useState } from "react";
import { ButtonOuter } from "../../button";
import { DiscoverModalTopWrapper, DiscoverModalFilterButton } from "./styles";

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
