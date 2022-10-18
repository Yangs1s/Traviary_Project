/** @format */

import React, { useState, useEffect } from "react";
import Test from "../mock_data/Img_test.json";
import styled from "styled-components";
import Gallery from "./Gallery";
import AddPost from "./AddPost";

type imgType = {
  id: string;
  img: string;
};

const MainContainerComponents = ({isOpen}:{isOpen:boolean}) => {
  const [images, setImages] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  // const [isOpen, setIsOpen] = useState(props)
  useEffect(() => {
    setImages(Test.imgs);
  }, []);

  return (
    <Container>
      <GridContainer>
        {images.map((image: any) => (
          <Gallery key={image.id} imgsrc={image.imgsrc} />
        ))}
      </GridContainer>



    </Container>
  );
};

export default MainContainerComponents;

const Container = styled.div`
	width:100%;
	height:100%;
`

const GridContainer = styled.div`
  background: #fff;
  border: 2px solid #c71967;
  -webkit-column-count: 5;
  -moz-column-count: 5;
  column-count: 5;
  -webkit-column-width: 20%;
  -moz-column-width: 20%;
  column-width: 20%;
  padding: 20px 20px;
  margin: 10px 30px;
  border-radius: 15px;

  @media screen and (max-width: 901px) {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
	column-width:100%;
  }
  @media screen and (max-width: 501px) {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
  @media screen and (max-widh: 400px) {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
    -webkit-column-width: 100%;
    -moz-column-width: 100%;
    column-width: 100%;
  }
`;

// const ModalContainer = styled.div`
//   width: 1020px;
//   height: 100%;
//   @media screen and (max-width: 900px) {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 500px;
//   }
//   @media screen and (max-width: 530px) {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 95%;
//     height: 500px;
//   }
//   @media screen and (max-width: 400px) {
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 92%;
//     height: 500px;
//   }
// `;

// const ModalContainerHide = styled.div`
//   visibility: hidden;
//   width: 30%;
// `;
