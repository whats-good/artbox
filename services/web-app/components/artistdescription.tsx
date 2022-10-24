interface ArtistDescriptionProps {
  description: String
}

export function ArtistDescription({ description } : ArtistDescriptionProps) {

  return (
    <p>{description}</p>
  )
}