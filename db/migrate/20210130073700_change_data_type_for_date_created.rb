class ChangeDataTypeForDateCreated < ActiveRecord::Migration[6.1]
  def change
    change_column :tasks, :date_created, :string
  end
end
