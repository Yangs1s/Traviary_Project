/** @format */

import React from "react";
import styled from "styled-components";

interface GalleryProp {
  id?: string;
  text?: string;
  createdId?: string;
  fileAttachURL: string;
}

const Gallery = ({
  traviObj,
  onClick,
  isLoading,
}: {
  traviObj: GalleryProp;
  isLoading: boolean;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}) => {
  console.log(isLoading);
  return (
    <>
      {isLoading === true ? (
        <ImgItem>
          <img
            id={traviObj.id}
            src={traviObj.fileAttachURL}
            alt="게시글이미지"
            onClick={onClick}
            className="image"
          />
        </ImgItem>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default Gallery;

const ImgItem = styled.div`
  -webkit-transition: all 350ms ease;
  transition: all 350ms ease;
  cursor: pointer;
  margin-bottom: 12px;
  border-radius: 10px;
  box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.2);
  :hover {
    -webkit-filter: brightness(0.5);
    filter: brightness(0.5);
  }
  .image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;
