package forum

import (
	"os"
	"time"

	"github.com/RamazanZholdas/KeyboardistSV2/internal/app"
	"github.com/RamazanZholdas/KeyboardistSV2/internal/models"
	"github.com/gofiber/fiber/v2"
)

func InsertThread(c *fiber.Ctx) error {
	var thread models.Thread

	if err := c.BodyParser(&thread); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Bad Request",
		})
	}

	count, err := app.GetMongoInstance().CountDocuments(os.Getenv("COLLECTION_THREAD"))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}
	count++

	thread.Order = int32(count)
	thread.Date = time.Now().Format("2006-01-02 15:04:05")

	insertErr := app.GetMongoInstance().InsertOne(os.Getenv("COLLECTION_THREAD"), thread)
	if insertErr != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.JSON(thread)
}
