class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.datetime :date_created, null: false
      t.datetime :due_date, null: false
      t.boolean :complete, null: false

      t.timestamps
    end
  end
end
