/** @format */

import React from "react";
import styled from "styled-components";
const Spinner = () => {
  return <Spin></Spin>;
};

export default Spinner;

const Spin = styled.div`
  width: 80px;
  height: 80px;
  margin: 60px auto;
  border: 3px solid #c71967;
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  -webkit-animation: spin 1000ms infinite linear;
  -moz-animation: spin 1000ms infinite linear;
  -ms-animation: spin 1000ms infinite linear;
  animation: spin 1000ms infinite linear;

  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-ms-keyframes spin {
    100% {
      -ms-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  .loading {
    text-align: center;
  }
`;
