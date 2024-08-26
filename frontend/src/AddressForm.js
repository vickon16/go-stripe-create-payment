import TextField from "@mui/material/TextField";
import * as React from "react";

export default function AddressForm({ customerData }) {
  return (
    <>
      <h5 className="text-lg sm:text-2xl">Shipping address</h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First name"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          onChange={(event) => {
            customerData["first_name"] = event.target.value;
          }}
        />
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last name"
          fullWidth
          autoComplete="family-name"
          variant="standard"
          onChange={(event) => {
            customerData["last_name"] = event.target.value;
          }}
        />
        <TextField
          required
          id="address1"
          name="address1"
          label="Address line 1"
          fullWidth
          autoComplete="shipping address-line1"
          variant="standard"
          onChange={(event) => {
            customerData["address_1"] = event.target.value;
          }}
        />
        <TextField
          id="address2"
          name="address2"
          label="Address line 2"
          fullWidth
          autoComplete="shipping address-line2"
          variant="standard"
          onChange={(event) => {
            customerData["address_2"] = event.target.value;
          }}
        />
        <TextField
          required
          id="city"
          name="city"
          label="City"
          fullWidth
          autoComplete="shipping address-level2"
          variant="standard"
          onChange={(event) => {
            customerData["city"] = event.target.value;
          }}
        />
        <TextField
          id="state"
          name="state"
          label="State/Province/Region"
          fullWidth
          variant="standard"
          onChange={(event) => {
            customerData["state"] = event.target.value;
          }}
        />
        <TextField
          required
          id="zip"
          name="zip"
          label="Zip / Postal code"
          fullWidth
          autoComplete="shipping postal-code"
          variant="standard"
          onChange={(event) => {
            customerData["zip"] = Number(event.target.value);
          }}
        />
        <TextField
          required
          id="country"
          name="country"
          label="Country"
          fullWidth
          autoComplete="shipping country"
          variant="standard"
          onChange={(event) => {
            customerData["country"] = event.target.value;
          }}
        />
      </div>
    </>
  );
}
