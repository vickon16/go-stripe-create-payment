import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Loader from "./Loader";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.value)}
      />
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <button
          disabled={!stripe || !elements}
          id="submit"
          className="mt-6 border-blue-500 border text-blue-500 hover:bg-blue-100 w-full p-3 rounded-md "
        >
          Pay now
        </button>
      )}

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default PaymentForm;
