import * as React from "react";

export default function StickyFooter() {
  return (
    <section className="my-8">
      <div className="mx-auto w-full max-w-[800px] text-center space-y-4">
        <h2 className="text-lg sm:text-4xl font-bold">Payment Successful!</h2>
        <h4 className="text-md sm:text-lg">
          Your payment has been processed successfully
          <br />
          You will receive email confirmation of your order shortly
        </h4>
      </div>
    </section>
  );
}
