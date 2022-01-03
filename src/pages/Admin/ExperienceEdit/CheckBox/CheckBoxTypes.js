import React, {useState} from 'react';
import './CheckBoxTypes.scss';

let categoriesData = [
  {_id: 1, name: 'Art and culture'},
  {_id: 2, name: 'Leisure'},
  {_id: 3, name: 'Food and drink'},
  {_id: 4, name: 'Sports'},
  {_id: 5, name: 'Welfare'},
  {_id: 6, name: 'Emblematic places'},
  {_id: 7, name: 'Nature and the great outdoors'}
];

export default function Types({type, updateTypes, prop}) {
  console.log(type);
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
    updateTypes(listSelect);
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
