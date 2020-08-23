import React, { useState } from 'react';
import { CheckboxContainer, HiddenCheckbox, StyledCheckbox, Icon } from './styles';
import { displayDistances } from '../Graph/util';
import Node from '../../data_structures/Node';

interface ICheckBoxProps {
  costs: Map<Node, number> | null;
  myRefs: React.MutableRefObject<any>;
  props?: any;
}

export const Checkbox = ({ costs, myRefs, ...props }: ICheckBoxProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  /**
   * toggle the display of distance values
   * @param event - checkbox toggle
   */
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
    if (costs !== null) {
      displayDistances(costs, myRefs);
    }
  };

  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} onChange={handleCheckChange} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

export default Checkbox;
