import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import * as React from "react";
import AddressForm from "./AddressForm";
import StripePayment from "./StripePayment";

const steps = ["Shipping address", "Payment"];

export default function Checkout({ customerData }) {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <section>
      <h1 className="text-lg sm:text-3xl bg-slate-50 p-4">Company name</h1>
      <div className="w-full max-w-[600px] flex flex-col gap-y-4 text-center mx-auto">
        <h2 className="text-lg sm:text-2xl">Checkout</h2>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 ? (
          <AddressForm customerData={customerData} />
        ) : activeStep === 1 ? (
          <StripePayment customerData={customerData} />
        ) : (
          <p>No step found</p>
        )}

        <div className="flex justify-end gap-2">
          {activeStep >= 1 && (
            <button
              className="bg-slate-400 py-2 rounded-md w-fit text-white px-4"
              onClick={() => setActiveStep((prev) => prev - 1)}
            >
              Back
            </button>
          )}

          {activeStep === steps.length - 1 ? null : (
            <button
              className="bg-emerald-400 text-white px-4 py-2 rounded-md w-fit"
              onClick={() => setActiveStep((prev) => prev + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
