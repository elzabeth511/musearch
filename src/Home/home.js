import debounce from "lodash.debounce";
import { Field, Form, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { getSuggestions } from "../Service/api.service";
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const Home = () => {
  const [suggestionList, setSuggestionList] = useState([]);
  const [isSuggestion, setIsSuggestion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  }

  const handleMouseLeave = () => {
    setActiveIndex(null);
  }
  useEffect(() => {
    setIsSuggestion(true);
  }, suggestionList);
  const changeHandler = async (event) => {
      console.log(event.target.value);
      if (event.target.value.length >= 4) {
        getSuggestions(event.target.value).then(response => {
          console.log(response.data.tracks.hits)
          setSuggestionList(response.data.tracks.hits);
      })
      .catch(error => console.error(error));
    }
    setSuggestionList(
      )
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 2000),
    [changeHandler]
  );

  const handleSubmit = (values) => {
    console.log("po");
  };

  return (
    <>
      <div >
        <Formik>
          {(props) => (
            <Form onSubmit={handleSubmit}>
               <div class="search-box">
    <button className="btn-search"> <FontAwesomeIcon icon={faSearch} /></button>
                <Field
                  className="input-search" 
                name="search"
                type="text"
                onChange={debouncedChangeHandler}
              />
                {suggestionList.length>0 && <ul className="suggestion-list">
                  {suggestionList.map((suggestion, index) => (
                    <li
                      key={suggestion.track.key}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className={index === activeIndex ? 'active' : ''}
                    >
                      {suggestion.track.title}
                    </li>
                  ))}
                </ul>}
                </div>
            </Form>
          )}
          
        </Formik>
       
        
      </div>
    </>
  );
};
export default Home;
