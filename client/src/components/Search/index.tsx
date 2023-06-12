import React, { useEffect, useState } from "react";
import delay from "delay";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { FiSearch } from "react-icons/fi";
import { RootState } from "@/redux/";
import { getDriverInfo } from "@/utils/queryDriverInfo";
import { useDispatch } from "react-redux";
import { change } from "@/redux/driverSlice";
import "./styles.scss";
import ResultItem from "./ResultItem";
import {IDriverInfo} from '@/constants/interfaces';

type content = {
  onBlur?: () => void,
}


const Search = React.forwardRef<HTMLInputElement, content>(
  (props, ref) => {
    const driverValue = useSelector((state: RootState) => state.driver.value);
    const [text, setText] = useState(driverValue);
    const [value] = useDebounce(text, 500);
    const dispatch = useDispatch();
    const [result, setResult] = useState<IDriverInfo[]>([]);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
      if (!value) {
        setResult([]);
        return;
      }
      const data: IDriverInfo[] = getDriverInfo(value);
      setResult(data);
    }, [value]);

    useEffect(() => {
      setText(driverValue);
    }, [driverValue]);

    return (
      <div className="search">
        <input
          type="text"
          value={text}
          ref={ref}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setShowResult(true)}
          onBlur={async () => {
            await delay(200);
            setShowResult(false);
            if (props?.onBlur) props.onBlur();
          }}
          placeholder="Search driver by name or team..."
        />
        <div className="search_icon">
          <FiSearch />
        </div>
        {value && showResult ? (
          <div className="search_result">
            {result.length ? (
              result.map(({ imgUrl, driverName, team, id }: IDriverInfo) => (
                <ResultItem
                  key={id}
                  imgUrl={imgUrl}
                  title={driverName}
                  subtitle={team}
                  onClick={() => {
                    if(driverName === undefined) return;
                    dispatch(change(driverName));
                  }}
                />
              ))
            ) : (
              <div className="search_result_noData">
                <p>
                  We couldn't find the driver by: <b>"{value}"</b> keyword
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
);

export default Search;
