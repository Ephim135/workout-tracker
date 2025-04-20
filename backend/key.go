package main

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"os"
)

func main() {
    key := make([]byte, 32) // 256-bit key
    _, err := rand.Read(key)
    if err != nil {
        panic(err)
    }

    hexKey := hex.EncodeToString(key)

    // Prepare .env line
    envLine := fmt.Sprintf("\nSECRET_KEY_REFRESH_TOKEN=\"%s\"", hexKey)

    // Write to .env file
    f, err := os.OpenFile(".env", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
    if err != nil {
        panic(err)
    }
    defer f.Close()

    if _, err := f.WriteString(envLine); err != nil {
        panic(err)
    }

    fmt.Println(".env file written with SECRET_KEY_REFRESH_TOKEN")
}
