/** @format */

import { FormEvent, ChangeEvent, useState } from "react";
import styled from "styled-components";
import { updateDoc, doc } from "firebase/firestore";
import { dbService } from "@/fbase";
import StraRating from "@components/common/StraRating";

interface EditCardInfo {
  traviObj: any;
  isToggle: () => void;
}

const EditCardInfo = ({ traviObj, isToggle }: EditCardInfo) => {
  const [editText, setEditText] = useState(traviObj.text);
  const [price, setPrice] = useState(traviObj.ratings.pricerating);
  const [taste, setTaste] = useState(traviObj.ratings.tasterating);
  const [visual, setVisual] = useState(traviObj.ratings.visualrating);
  const TraviRef = doc(dbService, "TraviDB", `${traviObj.id}`);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await updateDoc(TraviRef, {
      text: editText,
      ratings: {
        pricerating: price,
        tasterating: taste,
        visualrating: visual,
      },
    });
    isToggle();
  };

  const onChangeText = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditText(event.target.value);
  };

  return (
    <>
      <Container>
        <form onSubmit={onSubmit}>
          <InputText
            value={editText}
            onChange={onChangeText}
            autoComplete="off"
          />
          <StarRatingContainer>
            <StarRatingItem>
              <span>TASTE :</span>
              <StraRating ratingIndex={taste} setRatingIndex={setTaste} />
            </StarRatingItem>
            <StarRatingItem>
              <span>PRICE :</span>
              <StraRating ratingIndex={price} setRatingIndex={setPrice} />
            </StarRatingItem>
            <StarRatingItem>
              <span>VISUAL :</span>
              <StraRating ratingIndex={visual} setRatingIndex={setVisual} />
            </StarRatingItem>
          </StarRatingContainer>
          <Button type="submit">
            <span>Update</span>
          </Button>
        </form>
      </Container>
    </>
  );
};

export default EditCardInfo;

const Container = styled.div`
  background: #fff;
  min-width: 300px;
  max-height: 600px;
  position: absolute;
  left: 100%;
  top: 25%;
  border: 3px solid #e8e8e8;
  border-radius: 20px;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const InputText = styled.textarea`
  min-width: 100%;
  height: 300px;
  resize: none;
  padding: 10px;
  border: 2px solid #e8e8e8;
  border-radius: 20px;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  margin: 5px;
  background: var(--tab-bgcolor);
  border-radius: 10px;
  border: 1px solid #fff;
  span {
    color: white;
    font-size: 15px;
    font-weight: 700;
    vertical-align: middle;
  }
`;

const StarRatingContainer = styled.div`
  min-width: 100%;
  height: 200px;
  border: 2px solid #e8e8e8;
  border-radius: 20px;
  padding: 1em;
  @media screen and (max-width: 400px) {
    width: 100%;
    text-align: center;
  }
`;
const StarRatingItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  span {
    font-size: 15px;
    font-weight: 700;
    vertical-align: middle;
  }
`;
