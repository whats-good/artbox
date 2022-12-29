import styled from 'styled-components';

type ArtistBioModalInsideProps = {
  bio: string;
}

const ArtistBioModalInsideWrapper = styled.div`
display: grid;
grid-template-rows: 12% 80%
`

export const ArtistBioModalInside = ({ bio } : ArtistBioModalInsideProps) => {
  return (
    <ArtistBioModalInsideWrapper>
      <div></div>
      <div>
        <textarea>
          {bio}
        </textarea>
      </div>
    </ArtistBioModalInsideWrapper>
  )
}