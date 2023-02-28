import { shortenAddress } from "../../helpers/shortenAddress";
import type { TokenInfoQuery } from "../../.utils/zoraTypes/graphql";
import type {
  ImageColumnProps,
  ImageInfoPointProps,
  MetaDataInfoPointProps,
} from "./types";
import {
  ImageColumnWrapper,
  ImageInfoWrapper,
  SingleTokenViewWrapper,
} from "./styles";
import { useState } from "react";
import { parseIpfs } from "../../helpers";
import { EventsList } from "./eventLog";

const ImageColumn = ({ urls }: ImageColumnProps) => {
  const [i, increment] = useState<number>(0);
  const [src, setSrc] = useState<string>(urls[i]);

  return (
    <ImageColumnWrapper>
      <img
        alt="NFT Image QR8"
        style={{ height: "auto", maxWidth: "40vw" }}
        src={src}
        onError={() => {
          if (i !== urls.length - 1) {
            setSrc(urls[i]);
            increment(i + 1);
          }
        }}
      />
    </ImageColumnWrapper>
  );
};

const ImageInfo = ({ token }: TokenInfoQuery) => {
  return (
    <ImageInfoWrapper>
      <ImageInfoPoint
        label="Title"
        info={token?.token.name ? token?.token.name : "N/A"}
      />
      <ImageInfoPoint
        label="Description"
        info={token?.token.description ? token?.token.description : "N/A"}
      />
      <ImageInfoPoint
        label="Collection"
        info={token?.token.collectionName ? token?.token.collectionName : "N/A"}
      />
      <ImageInfoPoint
        label="Current Owner"
        info={token?.token.owner ? shortenAddress(token?.token.owner) : "N/A"}
      />
      <MetaDataInfoPoint label="MetaData" metaData={token?.token.attributes} />
      {token?.events ? <EventsList events={token.events} /> : <></>}
    </ImageInfoWrapper>
  );
};

const ImageInfoPoint = ({ label, info }: ImageInfoPointProps) => {
  return (
    <p>
      <b>{label}</b>: {info}
    </p>
  );
};

const MetaDataInfoPoint = ({ label, metaData }: MetaDataInfoPointProps) => {
  if (metaData) {
    return (
      <>
        <b>{label}:</b>
        <br></br>
        {metaData?.map((data) => {
          return (
            <div key={data.traitType}>
              <p>
                <b>{data.traitType}:</b> {data.value}
              </p>
            </div>
          );
        })}
      </>
    );
  }
  return <></>;
};

export const SingleTokenView = ({ token }: TokenInfoQuery) => {
  const urls = [];

  if (
    token?.token.image?.mediaEncoding?.__typename === "ImageEncodingTypes" &&
    token?.token.image?.mediaEncoding?.large
  ) {
    urls.push(token.token.image.mediaEncoding.large);
  }
  if (
    token?.token.image?.mediaEncoding?.__typename ===
      "UnsupportedEncodingTypes" &&
    token.token.image.url
  ) {
    urls.push(token.token.image.url);
  }
  if (
    token?.token.image?.url &&
    token.token.image.url.slice(0, 7) === "ipfs://"
  ) {
    urls.push(parseIpfs(token.token.image.url));
  }
  urls.push("");

  return (
    <SingleTokenViewWrapper>
      <ImageColumn urls={urls} />
      <ImageInfo token={token} />
    </SingleTokenViewWrapper>
  );
};
