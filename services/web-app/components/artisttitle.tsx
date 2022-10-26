interface ArtistTitleProps {
  name: String
}

export function ArtistTitle({ name } : ArtistTitleProps) {
  return (
    <h1>{name}</h1>
  )
}