/** @format */

import { useEffect, useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import CardInfo from "./CardInfo";
import { CardTraviObjType } from "@/types/TraviType";

export type ModalBaseProps = {
  traviObj: CardTraviObjType;
  userObj: any;
  isPostOpen: boolean;
  onClose: () => void;
};

const Card = ({ traviObj, isPostOpen, userObj, onClose }: ModalBaseProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const modalRef: any = useRef();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isPostOpen) {
      setOpen(true);
    } else {
      setTimeout(() => setOpen(false), 150);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [isPostOpen]);

  if (!open) {
    return null;
  }

  const handlePostClose = () => {
    setOpen(false);
  };
  return (
    <div className="wrapper">
      <Background
        ref={modalRef}
        visible={isPostOpen}
        onClick={handlePostClose}
        className="back"
      >
        &nbsp;
      </Background>
      <CardInfo
        traviObj={traviObj}
        userObj={userObj}
        isPostOpen={isPostOpen}
        onClose={handlePostClose}
      />
    </div>
  );
};

export default Card;

const slideIn = keyframes`
  0% {
	opacity:0
  }

  100% {
	opacity:1;
  }
`;

const slideOut = keyframes`
0% {
	opacity:1
  }

  100% {
	opacity:0;
  }
`;

const modalSettings = (visible: boolean) => css`
  visibility: ${visible ? "visible" : "visible"};
  z-index: 15;
  animation: ${visible ? slideIn : slideOut} 0.6s ease-out;
  transition: visibility 0.45s ease-out;
`;

const Background = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  ${props => modalSettings(props.visible)}
`;
