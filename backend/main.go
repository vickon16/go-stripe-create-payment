package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"github.com/vickon16/go-stripe-create-payment/backend/handlers"
)

func main() {
	godotenv.Load()
	portString := os.Getenv("PORT")
	if portString == "" {
		log.Fatal("PORT environment variable not set")
	}

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Allow your React app
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},        // Methods you want to allow
		AllowedHeaders:   []string{"Content-Type", "Authorization"}, // Headers you want to allow
	})

	mux := http.NewServeMux()

	mux.HandleFunc("/health", handlers.HandleHealth)
	mux.HandleFunc("/create-payment-intent", handlers.HandleCreatePaymentIntent)

	handler := c.Handler(mux)

	log.Println("Starting server on port " + portString)
	err := http.ListenAndServe(":"+portString, handler)
	if err != nil {
		log.Fatal(err)
	}
}
