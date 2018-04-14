class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader

  def create_date
    created_at.strftime("%Y年%m月%d日 %H時%M分")
  end
end
