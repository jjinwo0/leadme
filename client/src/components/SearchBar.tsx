import styled from "styled-components";
import React, { ChangeEvent, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

interface SearchBarProps {
  width?: number;
  icon?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  width,
  icon = false,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log(width, icon);
  };

  return (
    <SearchForm $width={width} $icon={icon}>
      <SearchField type="text" value={searchTerm} onChange={handleChange} />
      <SearchButton type="submit">
        {icon ? <IoSearchSharp /> : "search"}
      </SearchButton>
    </SearchForm>
  );
};

interface SearchFormProps {
  $width?: number;
  $icon?: boolean;
}

const SearchForm = styled.form<SearchFormProps>`
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: 43px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #efefef;
  margin: 0 auto;
  padding-right: ${({ $icon }) => ($icon ? "10px" : "30px")};
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
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
