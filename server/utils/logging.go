package utils

import (
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"time"
)

var (
	infoLogger    *log.Logger
	warningLogger *log.Logger
	errorLogger   *log.Logger
)

func CreateLogFiles() {
	logPath := "./logs/"
	if _, err := os.Stat(logPath); os.IsNotExist(err) {
		os.Mkdir(logPath, os.ModePerm)
	}

	infoLogFile, err := createLogFile(filepath.Join(logPath, "info.log"))
	if err != nil {
		log.Fatalln("Failed to open info log file:", err)
	}
	infoLogger = log.New(io.MultiWriter(os.Stdout, infoLogFile), "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)

	warningLogFile, err := createLogFile(filepath.Join(logPath, "warning.log"))
	if err != nil {
		log.Fatalln("Failed to open warning log file:", err)
	}
	warningLogger = log.New(io.MultiWriter(os.Stdout, warningLogFile), "WARNING: ", log.Ldate|log.Ltime|log.Lshortfile)

	errorLogFile, err := createLogFile(filepath.Join(logPath, "error.log"))
	if err != nil {
		log.Fatalln("Failed to open error log file:", err)
	}
	errorLogger = log.New(io.MultiWriter(os.Stdout, errorLogFile), "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
}

func LogInfo(v ...interface{}) {
	infoLogger.Println(v...)
}

func LogWarning(v ...interface{}) {
	warningLogger.Println(v...)
}

func LogError(v ...interface{}) {
	errorLogger.Println(v...)
}

func CloseLogFiles() {
	infoLogFile, ok := infoLogger.Writer().(*os.File)
	if ok {
		infoLogFile.Close()
	}

	warningLogFile, ok := warningLogger.Writer().(*os.File)
	if ok {
		warningLogFile.Close()
	}

	errorLogFile, ok := errorLogger.Writer().(*os.File)
	if ok {
		errorLogFile.Close()
	}
}

func createLogFile(filePath string) (*os.File, error) {
	file, err := os.OpenFile(filePath, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		return nil, err
	}

	now := time.Now().Format(time.RFC3339)

	if _, err := file.WriteString(fmt.Sprintf("\nNew session started at: %s\n", now)); err != nil {
		return nil, err
	}

	return file, nil
}

/*
package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

type Log struct {
	Level   string    `json:"level"`
	Message string    `json:"message"`
	Time    time.Time `json:"time"`
}

func Log(level string, v ...interface{}) {
	message := ""
	for _, val := range v {
		message += val.(string)
	}
	log.Println(level, message)

	go func() {
		logData := Log{
			Level:   level,
			Message: message,
			Time:    time.Now(),
		}
		logBytes, _ := json.Marshal(logData)
		body := bytes.NewBuffer(logBytes)

		req, err := http.NewRequest("POST", "http://localhost:8080/log/"+level, body)
		if err != nil {
			log.Println("Error creating request:", err)
			return
		}

		req.Header.Set("Authorization", os.Getenv("AUTH_TOKEN"))
		req.Header.Set("Content-Type", "application/json")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			log.Println("Error sending log to server:", err)
			return
		}

		defer resp.Body.Close()
		io.Copy(os.Stdout, resp.Body)
	}()
}

*/
