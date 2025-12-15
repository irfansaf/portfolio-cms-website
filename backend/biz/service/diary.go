package service

import (
	"backend/biz/dal/model"
	"backend/biz/dal/pg"
)

type DiaryService struct{}

func NewDiaryService() *DiaryService {
	return &DiaryService{}
}

func (s *DiaryService) CreateDiary(entry *model.DiaryEntry) error {
	return pg.DB.Create(entry).Error
}

func (s *DiaryService) GetAllDiaries(includePrivate bool) ([]model.DiaryEntry, error) {
	var entries []model.DiaryEntry
	query := pg.DB.Order("date desc")
	if !includePrivate {
		query = query.Where("visibility = ?", "public")
	}
	err := query.Find(&entries).Error
	return entries, err
}

func (s *DiaryService) GetDiaryBySlug(slug string) (*model.DiaryEntry, error) {
	var entry model.DiaryEntry
	err := pg.DB.Where("slug = ?", slug).First(&entry).Error
	return &entry, err
}

func (s *DiaryService) UpdateDiary(id uint, input *model.DiaryEntry) error {
	var entry model.DiaryEntry
	if err := pg.DB.First(&entry, id).Error; err != nil {
		return err
	}
	entry.Slug = input.Slug
	entry.Title = input.Title
	entry.Excerpt = input.Excerpt
	entry.Content = input.Content
	entry.Date = input.Date
	entry.Visibility = input.Visibility

	return pg.DB.Save(&entry).Error
}

func (s *DiaryService) DeleteDiary(id uint) error {
	return pg.DB.Delete(&model.DiaryEntry{}, id).Error
}
