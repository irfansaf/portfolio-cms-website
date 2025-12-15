package configs

import (
	"log"

	"github.com/spf13/viper"
)

func Init() {
	viper.SetConfigFile(".env")
	viper.AutomaticEnv() // Read from system env as well

	if err := viper.ReadInConfig(); err != nil {
		log.Println("Warning: No .env file found or error reading it, relying on System Environment Variables.")
	} else {
		log.Println("Loaded configuration from .env")
	}
}

func GetDBConfig() string {
	// Construct DSN
	// If you want more granular control, return a struct
	return ""
}
