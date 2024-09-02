import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFood } from "../redux/slices/FavouriteFoodSlice";
import ShowAlert from "../components/ShowAlert";

function FoodColumn({
  item,
}: {
  item: { images: string[]; title: string; price: string; _id: string };
}) {
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  function addToCart() {
    dispatch(
      addFood({
        _id: item._id,
        images: item.images,
        title: item.title,
        price: item.price,
      })
    );
    setAlertMessage("Added to cart");
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000); // Hide the alert after 3 seconds
  }

  return (
    <div className="relative border p-4 rounded-lg text-center mx-5 lg:mx-0">
      {alertVisible && (
        <ShowAlert
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
      )}
      <img
        src={item.images[0]}
        alt={item.title}
        className="w-full h-40 object-contain mb-4"
      />
      <h3 className="text-lg font-bold">{item.title}</h3>
      <p className="text-red-600 text-xl font-semibold">₦{item.price}</p>
      <button
        onClick={addToCart}
        className="bg-red-600 text-white px-4 py-2 mt-4 rounded hover:bg-red-500"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default FoodColumn;
