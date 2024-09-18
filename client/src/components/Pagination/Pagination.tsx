import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { usePathWithoutElem, useQuery } from "../../customHooks/useQuery";

export default function Pagination({
  total,
  limit,
  anchorHandler,
}: {
  total: number;
  limit: number;
  anchorHandler: () => void;
}) {
  const { page } = useQuery();
  const queryPage = page;
  const path = usePathWithoutElem();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const paginationList = getPagination(queryPage, total, limit);

  return (
    <>
      {paginationList.length > 1 && (
        <PaginatorDiv>
          {paginationList.map((page, index) => {
            if (typeof page === "number") {
              return (
                <ItemSpan
                  $isActive={queryPage === page}
                  key={index}
                  onClick={() => {
                    anchorHandler();
                    navigate(`${pathname}?page=${page}&${path}`);
                  }}
                >
                  {page}
                </ItemSpan>
              );
            } else return <DotsSpan key={index}>{page}</DotsSpan>;
          })}
        </PaginatorDiv>
      )}
    </>
  );
}

const PaginatorDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
  user-select: none;
`;

interface Props {
  $isActive: boolean;
}

const ItemSpan = styled.span<Props>`
  padding: 5px 10px;
  /* border: 1px solid #333; */
  border-radius: 7px;
  margin: 0 5px;
  cursor: pointer;
  background-color: var(--light_gray);

  transition: background-color 0.2s linear, transform 0.2s linear;

  &:hover {
    background-color: var(--yellow);
    transform: scale(1.3);
  }

  ${({ $isActive }) =>
    $isActive && {
      backgroundColor: "var(--yellow)",
      transform: "scale(1.3)",
    }}
`;

const DotsSpan = styled.span`
  margin: 0 10px;
`;

const getPagination = (
  queryPage: number,
  totalCount: number,
  pageSize: number
) => {
  const offset = 2;
  const totalPageNumber = Math.ceil(totalCount / pageSize);
  const offsetNumber =
    queryPage <= offset || queryPage > totalPageNumber - offset
      ? offset
      : offset - 1;
  const numbersList: number[] = [];
  const numbersListWithDots: Array<number | string> = [];

  if (totalPageNumber <= 1 || totalPageNumber === undefined) return [1];

  numbersList.push(1);
  for (let i = queryPage - offsetNumber; i <= queryPage + offsetNumber; i++) {
    if (i < totalPageNumber && i > 1) {
      numbersList.push(i);
    }
  }
  numbersList.push(totalPageNumber);

  numbersList.reduce((accumulator, currentValue) => {
    if (accumulator === 1) {
      numbersListWithDots.push(accumulator);
    }
    if (currentValue - accumulator !== 1) {
      numbersListWithDots.push("...");
    }
    numbersListWithDots.push(currentValue);

    return currentValue;
  });

  return numbersListWithDots;
};
