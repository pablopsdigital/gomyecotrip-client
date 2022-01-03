import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${(props) =>
    (props.contained && 'var(--primary)') || (props.outline && 'var(--white)') || 'var(--primary)'};

  border: ${(props) =>
    (props.contained && '2px solid var(--primary)') ||
    (props.outline && '2px solid var(--primary)') ||
    '2px solid var(--primary)'};

  color: ${(props) =>
    (props.contained && 'var(--text-white)') ||
    (props.outline && 'var(--text-primary)') ||
    'var(--text-white)'};

  font-size: ${(props) => (props.small && '0.9rem') || (props.large && '1.5rem') || '1rem'};

  box-shadow: ${(props) =>
    (props.normalShadow &&
      '0 14px 26px -12px rgb(103 28 201 / 42%),0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(103 28 201 / 20%);') ||
    ''};

  width: ${(props) => (props.full && '100%') || 'auto'};

  border-radius: 0.5rem;
  font-weight: 400;
  padding: 0.75rem 1rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: var(--primary-hover);
    color: var(--text-white);
    border: 2px solid var(--primary-hover);
    box-shadow: ${(props) =>
      (props.normalShadow &&
        '0 14px 26px -12px rgb(103 28 201 / 42%),0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(103 28 201 / 20%);') ||
      ''};
  }
`;
