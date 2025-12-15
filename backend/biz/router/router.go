package router

import (
	"backend/biz/handler"

	"github.com/cloudwego/hertz/pkg/app/server"
)

func Register(h *server.Hertz) {
	authHandler := handler.NewAuthHandler()

	api := h.Group("/api")
	{
		auth := api.Group("/auth")
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)

		// Public APIs
		api.GET("/projects", handler.NewProjectHandler().GetProjects)
		api.GET("/projects/:slug", handler.NewProjectHandler().GetProject)
		api.GET("/diaries", handler.NewDiaryHandler().GetDiaries)
		api.GET("/diaries/:slug", handler.NewDiaryHandler().GetDiary)
		api.GET("/skills", handler.NewSkillHandler().GetSkills)
		api.GET("/experiences", handler.NewExperienceHandler().GetExperiences)

		// Protected APIs
		// TODO: Add JWT Middleware here for the following routes
		// For now, we will add them under /api but in real usage they should be protected
		// We will implement JWT middleware check in next step or use manual check

		projects := api.Group("/projects")
		{
			projects.POST("/", handler.NewProjectHandler().CreateProject)
			projects.PUT("/:id", handler.NewProjectHandler().UpdateProject)
			projects.DELETE("/:id", handler.NewProjectHandler().DeleteProject)
		}

		diaries := api.Group("/diaries")
		{
			diaries.POST("/", handler.NewDiaryHandler().CreateDiary)
			diaries.PUT("/:id", handler.NewDiaryHandler().UpdateDiary)
			diaries.DELETE("/:id", handler.NewDiaryHandler().DeleteDiary)
		}

		skills := api.Group("/skills")
		{
			skills.POST("/", handler.NewSkillHandler().CreateSkill)
			skills.PUT("/:id", handler.NewSkillHandler().UpdateSkill)
			skills.DELETE("/:id", handler.NewSkillHandler().DeleteSkill)
		}

		experiences := api.Group("/experiences")
		{
			experiences.POST("/", handler.NewExperienceHandler().CreateExperience)
			experiences.PUT("/:id", handler.NewExperienceHandler().UpdateExperience)
			experiences.DELETE("/:id", handler.NewExperienceHandler().DeleteExperience)
		}
	}

	// Protected routes example
	// api.GET("/users", middleware.JwtMiddleware(), userHandler.List)
}
