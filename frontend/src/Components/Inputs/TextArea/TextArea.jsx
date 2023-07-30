export const TextArea = ({ label, onChange, onBlur, value, style }) => {
  return (
    <div>
      {label && <label className="input-label">{label}</label>}
      <textarea
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        style={style}
      />
    </div>
  );
};
