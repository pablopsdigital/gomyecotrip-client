import React from 'react';
import styled from 'styled-components';

export default function LayoutCenterFullBackground({ children }) {
  return <Layout>{children}</Layout>;
}

const Layout = styled.div`
  background-color: var(--gray-ternary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
