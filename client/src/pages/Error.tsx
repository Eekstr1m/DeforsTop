import styled from "styled-components";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function Error() {
  return (
    <>
      <Header />
      <ErrorDiv>
        <div>Error. Your page could not be found.</div>
      </ErrorDiv>
      <Footer />
    </>
  );
}

const ErrorDiv = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  /* margin-top: 150px; */
  margin: 150px 0;
  line-height: 2;
`;
