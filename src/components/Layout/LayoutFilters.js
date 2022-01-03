import styled from 'styled-components';

import React, {useState} from 'react';
import Header from '../Navbar';
import Footer from '../Footer/Footer';
import HeaderFilters from '../HeaderFilters/HeaderFilters';

export default function LayoutFilters({children, ...props}) {
  return (
    <>
      <LayoutStyled>
        <Header />
        <HeaderFilters />
        <main>{children}</main>
      </LayoutStyled>
    </>
  );
}

const LayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    min-height: 100vh;
    margin: 0;
    margin-top: 160px;
    width: 100%;
  }
`;
