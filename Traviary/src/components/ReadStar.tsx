import styled from "styled-components";
import { ImStarFull } from "react-icons/im";

type lengthProp = {
	ratingLength: number;
};

const ReadStar = ({ ratingLength }: lengthProp) => {
	return (
		<>
			{[...Array(ratingLength)].map((star, idx) => (
				<span key={`${star}_${idx}`}>
					<RatingStar />
				</span>
			))}
		</>
	);
};

export default ReadStar;

const RatingStar = styled(ImStarFull)`
	color: #ffe91e;
`;
