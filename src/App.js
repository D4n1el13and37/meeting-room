import { useCallback, useState } from "react";
import "./App.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * options for react-select component
 */
const towerOptions = [
  {
    value: "tower-a",
    label: "Tower A",
  },
  {
    value: "tower-b",
    label: "Tower B",
  },
];

const apartOptions = Array.from({ length: 10 }, (item, index) => ({
  value: index + 1,
  label: index + 1,
}));

const floorOptions = Array.from({ length: 25 }, (item, index) => ({
  value: index + 3,
  label: index + 3,
}));

function App() {
  /**
   * Object with form's data
   */
  const [formState, setFormState] = useState({
    tower: null,
    floor: null,
    aparts: null,
    date: null,
    extraMessage: "",
  });

  //destructuring for usability
  const { tower, floor, aparts, date, extraMessage } = formState;

  /**
   * function to update the state object
   * useCallback -> to memoize and optimize performance
   * field - property
   * selectedOption - value selectedOption?.value or selectedOption, whichever is truthy.
   */
  const handleChange = useCallback(
    (selectedOption, field) => {
      setFormState((prevState) => ({
        ...prevState,
        [field]: selectedOption?.value || selectedOption,
      }));
    },
    [setFormState]
  );

  /**
   * function which prevents the default form submission behavior,
   * serializes the form data into a JSON string
   */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = JSON.stringify(formState);
      console.log(formData);
    },
    [formState]
  );

  /**
   * it just reset our state
   */
  const handleReset = useCallback(() => {
    setFormState({
      tower: null,
      floor: null,
      aparts: null,
      date: null,
      extraText: "",
    });
  }, [setFormState]);

  return (
    <div className="container">
      <header>
        <h1>Choose your appart for meetup</h1>
      </header>
      <form className="app-form" onSubmit={handleSubmit} onReset={handleReset}>
        <Select
          placeholder="Choose tower"
          // function for get the value(and render it) from object with options
          value={towerOptions.find(
            (option) => option.value === formState.tower
          )}
          options={towerOptions}
          onChange={(selectedValue) => handleChange(selectedValue, "tower")}
        />
        {tower && (
          <>
            <Select
              placeholder="Choose floor"
              value={floorOptions.find(
                (option) => option.value === formState.floor
              )}
              options={floorOptions}
              onChange={(selectedValue) => handleChange(selectedValue, "floor")}
            />
            {floor && (
              <>
                <Select
                  placeholder="Choose aparts"
                  value={apartOptions.find(
                    (option) => option.value === formState.aparts
                  )}
                  options={apartOptions}
                  onChange={(selectedValue) =>
                    handleChange(selectedValue, "aparts")
                  }
                />
                {aparts && (
                  <>
                    <DatePicker
                      placeholderText="choose time"
                      className="date"
                      selected={date}
                      onChange={(selectedValue) =>
                        handleChange(selectedValue, "date")
                      }
                      showTimeSelect
                      minDate={new Date()}
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="dd MMMM, yyyy h:mm aa"
                    />
                    <textarea
                      placeholder="optional"
                      value={extraMessage}
                      onChange={(e) =>
                        handleChange(e.target.value, "extraMessage")
                      }
                    />
                    {date && <input type="submit" />}
                  </>
                )}
              </>
            )}
          </>
        )}
        <input type="reset" />
      </form>
    </div>
  );
}

export default App;
