class Task < ApplicationRecord
  validates :name, presence: true
  validates :date_created, presence: true
  validates :due_date, presence: true
  validates :complete, presence: true
end
