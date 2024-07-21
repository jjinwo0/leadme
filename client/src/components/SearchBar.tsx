import styled from "styled-components";
import React, { ChangeEvent, useState } from "react";

interface SearchBarProps {
  width?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ width }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchForm width={width}>
      <SearchField type="text" value={searchTerm} onChange={handleChange} />
      <SearchButton type="submit">search</SearchButton>
    </SearchForm>
  );
};

interface SearchFormPsops {
  width?: number;
}

const SearchForm = styled.form<SearchFormPsops>`
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  height: 43px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #efefef;
  margin: 0 auto;
  padding-right: 30px;
  background: linear-gradient(
    108deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.2) 100%
  );
  backdrop-filter: blur(10px);
`;

const SearchField = styled.input`
  border: none;
  flex-grow: 1;
  background: transparent;
  font-size: 18px;
  outline: none;
  padding-left: 25px;
`;

const SearchButton = styled.button`
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: #ee5050;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
