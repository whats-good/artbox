import styled from "styled-components"

type GalleryHeaderProps = {
  user: string,
  bio: string,
}

export const GalleryHeader = ({user, bio} : GalleryHeaderProps) => {

  return (
    <div>
      <h1>{user}</h1>
    </div>
  )
}

