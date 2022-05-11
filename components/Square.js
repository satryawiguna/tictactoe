const Square = ({ value = null, ...props }) => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {value}
    </button>
  );
};

export default Square;
