import "./Select.scss";
export const Select = ({ onChange, options, value }) => {
  return (
    <select onChange={onChange} value={value} className="select">
      {options.map((item) => (
        <option value={item.value} key={item.value} className="option">
          {item.value}
        </option>
      ))}
    </select>
  );
};
