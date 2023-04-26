package forum

import (
	"os"
	"time"

	"github.com/RamazanZholdas/KeyboardistSV2/internal/app"
	"github.com/RamazanZholdas/KeyboardistSV2/internal/models"
	"github.com/gofiber/fiber/v2"
)

func InsertPost(c *fiber.Ctx) error {
	var post models.Post

	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Bad Request",
		})
	}

	post.Date = time.Now().Format("2006-01-02 15:04:05")

	insertErr := app.GetMongoInstance().InsertOne(os.Getenv("COLLECTION_POST"), post)
	if insertErr != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.JSON(post)
}
