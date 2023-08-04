export const Button = ({ onClick, className, style, ...rest }) => {
  return (
    <button onClick={onClick} className={`btn ${className}`} style={style}>
      {rest.children}
    </button>
  );
};
