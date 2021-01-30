class ChangeDataTypeForDueDate < ActiveRecord::Migration[6.1]
  def change
    change_column :tasks, :due_date, :string
  end
end
