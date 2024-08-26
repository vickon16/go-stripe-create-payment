package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/paymentintent"
)

func HandleHealth(w http.ResponseWriter, r *http.Request) {
	response := []byte("Server is up and running")
	_, err := w.Write(response)
	if err != nil {
		fmt.Println(err)
	}
}

func HandleCreatePaymentIntent(w http.ResponseWriter, r *http.Request) {
	stripeSecretKey := os.Getenv("STRIPE_SECRET_KEY")
	if stripeSecretKey == "" {
		log.Fatal("STRIPE_SECRET_KEY environment variable not set")
	}

	stripe.Key = stripeSecretKey

	if r.Method != "POST" {
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		ProductId string `json:"product_id"`
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Address1  string `json:"address_1"`
		Address2  string `json:"address_2"`
		City      string `json:"city"`
		State     string `json:"state"`
		Zip       int    `json:"zip"`
		Country   string `json:"country"`
	}

	// decode the json request body and merge it with the struct
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// send this to stripe to create a payment intent
	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(calculateOrderAmount(req.ProductId)),
		Currency: stripe.String(string(stripe.CurrencyUSD)),
		AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
			Enabled: stripe.Bool(true),
		},
	}

	// send the payment intent to stripe
	paymentIntent, err := paymentintent.New(params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var response struct {
		ClientSecret string `json:"clientSecret"`
	}

	response.ClientSecret = paymentIntent.ClientSecret

	// send the payment intent to the client
	var buffer bytes.Buffer

	err = json.NewEncoder(&buffer).Encode(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	_, err = io.Copy(w, &buffer)
	if err != nil {
		fmt.Println(err)
	}
}

func calculateOrderAmount(productId string) int64 {
	switch productId {
	case "Forever Pants":
		return 26000 // $260
	case "Forever Shirt":
		return 15500 // $155
	case "Forever Shorts":
		return 30000 // $300
	default:
		return 0
	}
}
