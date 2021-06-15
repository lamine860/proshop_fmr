const Rating = ({ rating, children }) => {
  return (
    <div>
      {rating >= 1 ? (
        <i className="fas fa-star text-yellow-500"></i>
      ) : (
        <i className="far fa-star"></i>
      )}
      {rating >= 2 ? (
        <i className="fas fa-star text-yellow-500"></i>
      ) : (
        <i className="far fa-star"></i>
      )}
      {rating >= 3 ? (
        <i className="fas fa-star text-yellow-500"></i>
      ) : (
        <i className="far fa-star"></i>
      )}
      {rating >= 4 ? (
        <i className="fas fa-star text-yellow-500"></i>
      ) : (
        <i className="far fa-star"></i>
      )}
      {rating >= 5 ? (
        <i className="fas fa-star text-yellow-500"></i>
      ) : (
        <i className="far fa-star"></i>
      )}{" "}
      {children}
    </div>
  );
};

export default Rating;
