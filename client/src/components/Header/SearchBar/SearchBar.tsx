import s from "./SearchBar.module.scss";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { API } from "../../../API/api";
import { Dropdown } from "react-bootstrap";
import { ResponseSearchI } from "../../../interfaces/search";
import Image from "../../common/Image/Image";

export default function SearchBar({ id }: { id: string }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 1000);
  const [searchData, setSearchData] = useState<ResponseSearchI>({
    status: 404,
    data: null,
  });

  useEffect(() => {
    if (value) {
      API.search(value).then((data) => setSearchData(data));
    }
    return () => {
      false;
    };
  }, [value]);

  return (
    <div id={id} className={s.wrapper}>
      <input
        type="text"
        className={s.search}
        value={text}
        onFocus={() => setShow(true)}
        onBlur={() => {
          setTimeout(() => {
            setShow(false);
          }, 200);
        }}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Searching..."
      />
      {show && <SearchResult searchData={searchData} />}
    </div>
  );
}

function SearchResult({ searchData }: { searchData: ResponseSearchI }) {
  return (
    <Dropdown className={s.result}>
      {searchData.status === 404 ? (
        <div>Nothing was found for your search.</div>
      ) : (
        searchData.data &&
        searchData.data.map((item) => (
          <Dropdown.Item
            key={item._id}
            className={s.category_item}
            href={`/product/${item._id}`}
          >
            <div className={s.search_item}>
              <div className={s.search_img}>
                <Image thumbnail={item.thumbnail} />
              </div>
              <div className={s.search_title}>{item.title}</div>
            </div>
          </Dropdown.Item>
        ))
      )}
    </Dropdown>
  );
}
