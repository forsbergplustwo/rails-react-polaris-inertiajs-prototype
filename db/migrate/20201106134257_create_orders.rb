class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.text :name
      t.text :customer_location
      t.text :customer_name
      t.text :customer_email
      t.timestamps
    end
  end
end
