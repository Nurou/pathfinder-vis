import React from 'react';
import { CheckboxContainer, HiddenCheckbox, StyledCheckbox, Icon } from './styles';
import { displayDistances } from '../Graph/util';
import Node from '../../data_structures/Node';
import { CustomMap } from '../../data_structures/Map';

interface ICheckBoxProps {
  costs: Map<Node, number> | CustomMap<Node, number> | null;
  myRefs: React.MutableRefObject<any>;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  props?: any;
}

export const Checkbox = ({ costs, myRefs, checked, setChecked, ...props }: ICheckBoxProps) => {
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
