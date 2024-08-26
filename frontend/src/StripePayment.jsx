import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentForm from "./PaymentForm";
import Loader from "./Loader";
// import "./StripePayment.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function StripePayment({ customerData }) {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customerData),
          }
        );

        if (!response.ok) {
          console.log(response);
          return;
        }
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerData]);

  return (
    <div className="StripePayment" height="100%" width="100%">
      {loading ? (
        <Loader />
      ) : !!clientSecret ? (
        <Elements
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
            },
          }}
          stripe={stripePromise}
        >
          <PaymentForm />
        </Elements>
      ) : null}
    </div>
  );
}
