package main

import (
	"context"
	"fmt"
	"log"

	"backend/internal/core/config"
	"backend/internal/core/db"
	"backend/internal/core/server"

	// Domains for Migration
	diaryDomain "backend/internal/modules/diary/domain"
	projectDomain "backend/internal/modules/project/domain"
	resumeDomain "backend/internal/modules/resume/domain"
	socialDomain "backend/internal/modules/social/domain"
	systemDomain "backend/internal/modules/system/domain"
	authDomain "backend/internal/modules/user/domain"

	// Handlers
	authHandler "backend/internal/modules/auth/handler"
	diaryHandler "backend/internal/modules/diary/handler"
	projectHandler "backend/internal/modules/project/handler"
	resumeHandler "backend/internal/modules/resume/handler"
	socialHandler "backend/internal/modules/social/handler"
	systemHandler "backend/internal/modules/system/handler"

	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/common/utils"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
)

func main() {
	// 1. Load Env
	config.Init()

	// 2. Init DB
	db.Init()

	// 3. Auto Migrate
	// Note: Ideally move to a separate migration tool/command
	err := db.DB.AutoMigrate(
		&authDomain.User{},
		&projectDomain.Project{},
		&diaryDomain.DiaryEntry{},
		&resumeDomain.Experience{},
		&resumeDomain.Skill{},
		&socialDomain.SocialLinkGorm{},
		&systemDomain.SystemConfig{},
	)
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	// 4. Init Hertz Server
	h := server.NewServer()

	// 5. Initialize Handlers (Dependency injection happens inside New... for now)
	authH := authHandler.NewAuthHandler()
	projectH := projectHandler.NewProjectHandler()
	diaryH := diaryHandler.NewDiaryHandler()
	resumeExpH := resumeHandler.NewExperienceHandler()
	resumeSkillH := resumeHandler.NewSkillHandler()
	socialH := socialHandler.NewSocialLinkHandler()
	systemH := systemHandler.NewSystemHandler()

	// 6. Register Routes
	h.GET("/ping", func(c context.Context, ctx *app.RequestContext) {
		ctx.JSON(consts.StatusOK, utils.H{"message": "pong"})
	})

	api := h.Group("/api")
	{
		// System (No middleware preferred for status/setup, or specific checks)
		sys := api.Group("/system")
		sys.GET("/status", systemH.GetStatus)
		sys.POST("/setup", systemH.Setup)

		// Auth
		auth := api.Group("/auth")
		auth.POST("/register", authH.Register)
		auth.POST("/login", authH.Login)

		// Public APIs
		api.GET("/projects", projectH.GetProjects)
		api.GET("/projects/:slug", projectH.GetProject)
		api.GET("/diaries", diaryH.GetDiaries)
		api.GET("/diaries/:slug", diaryH.GetDiary)
		api.GET("/skills", resumeSkillH.GetSkills)
		api.GET("/experiences", resumeExpH.GetExperiences)
		api.GET("/social-links", socialH.GetSocialLinks)

		// Protected APIs (TODO: Add Middleware)
		projects := api.Group("/projects")
		{
			projects.POST("/", projectH.CreateProject)
			projects.PUT("/:id", projectH.UpdateProject)
			projects.DELETE("/:id", projectH.DeleteProject)
		}

		diaries := api.Group("/diaries")
		{
			diaries.POST("/", diaryH.CreateDiary)
			diaries.PUT("/:id", diaryH.UpdateDiary)
			diaries.DELETE("/:id", diaryH.DeleteDiary)
		}

		skills := api.Group("/skills")
		{
			skills.POST("/", resumeSkillH.CreateSkill)
			skills.PUT("/:id", resumeSkillH.UpdateSkill)
			skills.DELETE("/:id", resumeSkillH.DeleteSkill)
		}

		experiences := api.Group("/experiences")
		{
			experiences.POST("/", resumeExpH.CreateExperience)
			experiences.PUT("/:id", resumeExpH.UpdateExperience)
			experiences.DELETE("/:id", resumeExpH.DeleteExperience)
		}

		socialLinks := api.Group("/social-links")
		{
			socialLinks.POST("/", socialH.CreateSocialLink)
			socialLinks.PUT("/:id", socialH.UpdateSocialLink)
			socialLinks.DELETE("/:id", socialH.DeleteSocialLink)
		}
	}

	// 7. Spin up
	fmt.Println("Server running on http://localhost:8888")
	h.Spin()
}
