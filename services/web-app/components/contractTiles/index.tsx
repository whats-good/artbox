import {
  ContractTileStyled,
  ContractTileWrapper,
  ContractAddressTile,
} from "./styled/styledContractTile";
import { shortenAddress } from "@usedapp/core";

type ContractTilesProps = {
  con: string[];
  name: string;
  desc: string;
};

type ContractTileProps = {
  con: string;
};

export const ContractTiles = ({ con, name, desc }: ContractTilesProps) => {
  return (
    <ContractTileWrapper>
      {con.map((con) => {
        return <ContractTile con={con} />;
      })}
    </ContractTileWrapper>
  );
};

const ContractTile = ({ con }: ContractTileProps) => {
  return (
    <ContractTileStyled>
      <ContractAddressTile>{shortenAddress(con)}</ContractAddressTile>
    </ContractTileStyled>
  );
};
