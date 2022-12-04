import styled from 'styled-components';
import { memo } from 'react';

export const TableGrid = memo(styled.table`
  padding: 2rem;

  display: flex;
  flex-direction: column;

  tr {
    display: flex;
    flex-wrap: nowrap;
  }
`);

export const GridRow = memo(styled.tr``);
