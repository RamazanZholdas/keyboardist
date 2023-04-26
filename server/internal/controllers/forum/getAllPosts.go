package forum

import (
	"os"
	"strconv"

	"github.com/RamazanZholdas/KeyboardistSV2/internal/app"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetAllPosts(c *fiber.Ctx) error {
	Order := c.Params("order")
	number, err := strconv.Atoi(Order)
	var posts []primitive.M
	err := app.GetMongoInstance().FindMany(os.Getenv("COLLECTION_POSTS"), bson.M{}, &posts)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	if len(posts) == 0 {
		return c.Status(404).JSON(fiber.Map{
			"message": "No threads found",
		})
	}

	return c.JSON(posts)
}
