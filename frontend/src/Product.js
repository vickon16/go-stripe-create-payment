import * as React from "react";
import { useNavigate } from "react-router-dom";

const description = [
  "100% recycled materials",
  "100 year warranty",
  "free repairs",
];

const tiers = [
  {
    title: "Forever Pants",
    price: "260",
    image: "/images/pants.jpg",
    description: description,
  },
  {
    title: "Forever Shirt",
    image: "/images/shirt.jpg",
    price: "155",
    description: description,
  },
  {
    title: "Forever Shorts",
    image: "/images/shorts.jpg",
    price: "300",
    description: description,
  },
];

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

export default function Product({ customerData }) {
  const navigate = useNavigate();

  return (
    <section className="w-full flex flex-col gap-y-4 justify-center items-center text-center">
      <h2 className="text-center text-lg sm:text-3xl font-bold">Products</h2>
      <p className="max-w-prose text-center text-slate-500 text-base w-full">
        Our products are proven to improve effectiveness and last a lifetime.
        Our intention is not to gain lifetime customers, but to sell you a
        product such that you will never need to buy another product from us
        again. This reduces consumer waste and helps to protect our planet.
      </p>
      {/* End hero unit */}
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[1000px]">
        {tiers.map((tier) => (
          // Enterprise card is full width at sm breakpoint
          <div
            key={tier.title}
            className="flex flex-col justify-center items-center gap-4"
          >
            <h2 className="bg-slate-200 p-4 text-center w-full text-2xl">
              {tier.title}
            </h2>
            <div className="p-2 w-full border-slate-200 border">
              <div className="h-[300px] aspect-square relative">
                <img
                  src={tier.image}
                  className="w-full h-full object-cover"
                  alt="tier img"
                  loading="lazy"
                />
              </div>

              <h2 className="text-xl sm:text-3xl font-bold my-3">
                ${tier.price}
                <small>.00</small>
              </h2>
              <ul>
                {tier.description.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
            <button
              className="w-full p-2 border-blue-500 border   shadow-none rounded-md hover:bg-blue-100"
              onClick={() => {
                customerData["product_id"] = tier["title"];
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <section className="border-t border-slate-200 py-4 text-center flex w-full max-w-[800px] justify-evenly flex-wrap gap-4">
        {footers.map((footer) => (
          <div key={footer.title} className="space-y-3">
            <h2 className="text-lg text-slate-700 font-semibold sm:text-xl ">
              {footer.title}
            </h2>
            <ul className="flex flex-col gap-1">
              {footer.description.map((item) => (
                <li key={item}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#" className="text-slate-500 hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      {/* End footer */}
    </section>
  );
}
