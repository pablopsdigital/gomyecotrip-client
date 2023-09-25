import React from 'react';
import Header from '../Navbar';
import Footer from '../Footer/Footer';

import styled from 'styled-components';
import Navbar from '../Navbar';

export default function Layout({ children, ...props }) {
  return (
    <StyledLayout>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </StyledLayout>
  );
}

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 100vw;

  main {
    margin-top: 90px;
  }
`;
