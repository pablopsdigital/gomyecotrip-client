import React, {useState, useEffect} from 'react';
import './CheckBoxTypes.scss';

let categoriesData = [
  {_id: 1, name: 'amenitie 1'},
  {_id: 2, name: 'amenitie 2'},
  {_id: 3, name: 'amenitie 3'},
  {_id: 4, name: 'amenitie 4'},
  {_id: 5, name: 'amenitie 5'},
  {_id: 6, name: 'amenitie 6'},
  {_id: 7, name: 'amenitie 7'},
  {_id: 8, name: 'amenitie 8'},
  {_id: 9, name: 'amenitie 9'},
  {_id: 10, name: 'amenitie 10'}
];

export default function Amenities({updateAmenities, props}) {
  //Clear checkbox
  const [checkedState, setCheckedState] = useState(new Array(categoriesData.length).fill(false));

  const [listSelect, setListSelect] = useState([]);

  var list = [];
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce((acumulator, currentState, index) => {
      if (currentState === true) {
        list.push(categoriesData[index].name);
        return (acumulator += categoriesData[index].name);
      }
      return acumulator;
    }, []);

    setListSelect(list);
    updateAmenities(listSelect);
  };

  return (
    <div id="check-list" className="grid-check-list">
      {categoriesData.map(({name}, index) => {
        return (
          <div key={index} className="row">
            <input
              type="checkbox"
              id={`custom-checkbox-${index}`}
              name={name}
              value={name}
              checked={checkedState[index]}
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
          </div>
        );
      })}
    </div>
  );
}
