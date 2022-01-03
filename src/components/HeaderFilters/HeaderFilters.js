import React, {useState, useEffect, useContext, useRef} from 'react';
import './HeaderFilters.scss';
import {Button} from '../Button';
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Slider} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import useFilters from '../../hooks/useFilters';

export default function HeaderFilters() {
  const {setPriceFilter, setTypesFilter} = useFilters();

  //============================================================
  // Price filter
  //============================================================
  const [priceFilterSave, setpriceFilterSave] = useState(false);

  const originalValues = [0, 100];
  const [valuesSlider, setValuesSlider] = useState(originalValues);

  const minDistance = 10;

  const handleChange = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      setValuesSlider([Math.min(newValue[0], valuesSlider[1] - minDistance), valuesSlider[1]]);
    } else {
      setValuesSlider([valuesSlider[0], Math.max(newValue[1], valuesSlider[0] + minDistance)]);
    }
  };

  const marks = [
    {
      value: valuesSlider[0],
      label: `${valuesSlider[0]} €`
    },
    {
      value: valuesSlider[1],
      label: `+ ${valuesSlider[1]} €`
    }
  ];

  const handlerpriceFilter = (event) => {
    event.preventDefault();
    setPriceFilter(valuesSlider);
    setModalPriceOpen(false);
    setpriceFilterSave(true);
  };

  const handlerpriceFilterClear = () => {
    setValuesSlider(originalValues);
    setpriceFilterSave(false);
    setPriceFilter(originalValues);
  };

  //===========================================================================
  //Type experience filter
  //===========================================================================

  let categoriesData = [
    {_id: 1, name: 'Art and culture'},
    {_id: 2, name: 'Leisure'},
    {_id: 3, name: 'Food and drink'},
    {_id: 4, name: 'Sports'},
    {_id: 5, name: 'Welfare'},
    {_id: 6, name: 'Emblematic places'},
    {_id: 7, name: 'Nature and the great outdoors'}
  ];

  const [categories, setCategories] = useState(categoriesData);

  useEffect(() => {
    setCategories(
      categories.map((categorie) => {
        return {
          _id: categorie._id,
          name: categorie.name,
          checked: false
        };
      })
    );
  }, []);

  const [typeExperienceSFilterSave, setTypeExperienceSaveFilterSave] = useState(false);
  const [checkedList, setChekecList] = useState([]);

  const handlerTypeExperienceSaveFilter = () => {
    setTypeExperienceSaveFilterSave(true);
    setTypesFilter(checkedList);
    setModalTypeOpen(false);
  };

  const handlerTypeExperienceClearFilter = () => {
    setTypeExperienceSaveFilterSave(false);
    setCategories(categoriesData);
    setChekecList([]);
    setTypesFilter([]);
    setModalTypeOpen(false);
  };

  //===========================================================================
  //Config modals
  //===========================================================================
  const refDivPriceModal = useRef();
  const [isModalPriceOpen, setModalPriceOpen] = useState(false);
  useOnClickOutside(refDivPriceModal, () => setModalPriceOpen(false));

  const refDivTypeModal = useRef();
  const [isModalTypeOpen, setModalTypeOpen] = useState(false);
  useOnClickOutside(refDivTypeModal, () => setModalTypeOpen(false));

  // Hook
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  }

  //===========================================================================
  //Render
  //===========================================================================
  return (
    <div className="header-filters">
      {/* ====================================================================================
        Buttons
        ==================================================================================== */}
      <div className="buttons-filter">
        <h3>Filters: </h3>
        <div className={`button-icon ${+priceFilterSave ? 'button-active ' : ' '}`}>
          <button onClick={() => setModalPriceOpen(true)}>Price</button>
          {priceFilterSave ? (
            <CancelIcon className="icon" onClick={handlerpriceFilterClear} />
          ) : null}
        </div>

        <div className={`button-icon ${+typeExperienceSFilterSave ? 'button-active ' : ' '}`}>
          <button onClick={() => setModalTypeOpen(true)}> Type of experience</button>
          {typeExperienceSFilterSave ? (
            <CancelIcon className="icon" onClick={handlerTypeExperienceClearFilter} />
          ) : null}
        </div>
      </div>

      {/* ====================================================================================
        Modal Price
        ==================================================================================== */}
      {isModalPriceOpen && (
        <div ref={refDivPriceModal} className="modal-container">
          <div className="modal-panel-price">
            <div className="modal-panel-inner">
              <div className="header">
                <h3>Price</h3>
              </div>

              <div className="body">
                <Slider
                  value={valuesSlider}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  marks={marks}
                  disableSwap
                />
              </div>
              <div className="footer">
                <Button outline onClick={handlerpriceFilterClear}>
                  Clear
                </Button>
                <Button contained onClick={handlerpriceFilter}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================================
        Modal Type
        ==================================================================================== */}
      {isModalTypeOpen && (
        <div ref={refDivTypeModal} className="modal-container">
          <div className="modal-panel-type">
            <div id="filter-type" className="modal-panel-inner">
              <div className="header">
                <h3>Type</h3>
              </div>
              <ul className="body grid">
                {categories.map((categorie, index) => (
                  <li className="container-item" key={categorie.id}>
                    <input
                      name={categorie.name}
                      value={categorie.name}
                      onChange={(event) => {
                        let checkedState = event.target.checked;
                        if (checkedState == true) {
                          setChekecList([...checkedList, event.target.value]);
                        } else {
                          const res = checkedList.filter(
                            (checkedList) => checkedList !== event.target.value
                          );
                          setChekecList(res);
                        }
                        setCategories(
                          categories.map((data) => {
                            if (categorie._id == data._id) {
                              data.checked = checkedState;
                            }
                            return data;
                          })
                        );
                      }}
                      type="checkbox"
                      checked={categorie.checked}
                    />
                    <label htmlFor={categorie.name}>{categorie.name}</label>
                  </li>
                ))}
              </ul>

              <div className="footer">
                <Button outline onClick={handlerTypeExperienceClearFilter}>
                  Clear
                </Button>
                <Button contained onClick={handlerTypeExperienceSaveFilter}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
