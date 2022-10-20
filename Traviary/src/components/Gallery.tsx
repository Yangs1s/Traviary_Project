import React, { useEffect, useState } from "react";
import styled from "styled-components";

type GalleryProp = {
  id: number;
  imgsrc: string;
};

const Gallery = ({ imgsrc, id }: GalleryProp) => {



  return (
    <>
      <ImgItem>
        <Image key={id} src={imgsrc} alt="게시글이미지" />
      </ImgItem>
    </>
  );
};

export default Gallery;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const ImgItem = styled.div`
  -webkit-transition: all 350ms ease;
  transition: all 350ms ease;
  cursor: pointer;
  margin-bottom: 12px;

  :hover {
    filter: opacity(0.8);
  }
`;
