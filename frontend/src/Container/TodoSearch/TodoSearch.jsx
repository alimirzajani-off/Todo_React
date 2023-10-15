import { Input } from "../../Components/Inputs/Input/Input";
import { IoSearchOutline } from "react-icons/io5";
import "./TodoSearch.scss";

export const TodoSearch = ({ value, onChange }) => {
  return (
    <div className="TodoSearch">
      <Input
        value={value}
        onChange={onChange}
        placeholder="اینجا جستجو کن..."
      />
      <IoSearchOutline />
    </div>
  );
};
