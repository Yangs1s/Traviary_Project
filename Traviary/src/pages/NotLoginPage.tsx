/** @format */

import React from "react";
import styled from "styled-components";
export default function NotLoginPage() {
  return (
    <Container>
      <span>로그인을 먼저 하세요</span>
    </Container>
  );
}

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;
